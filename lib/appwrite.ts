import {
	Client,
	Account,
	ID,
	Avatars,
	Databases,
	Query,
	Storage,
	ImageGravity,
} from "react-native-appwrite";
import { ImagePickerAsset } from "expo-image-picker";
import { Form } from "../app/types/global";

export const config = {
	endpoint: process.env.EXPO_PUBLIC_API_URL,
	platform: process.env.EXPO_PUBLIC_API_PLATFORM,
	projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
	databaseId: process.env.EXPO_PUBLIC_DATABASE_ID,
	usersCollectionId: process.env.EXPO_PUBLIC_USERS_COLLECTION_ID,
	videosCollectionId: process.env.EXPO_PUBLIC_VIDEOS_COLLECTION_ID,
	storageId: process.env.EXPO_PUBLIC_STORAGE_ID,
};

const {
	endpoint,
	platform,
	projectId,
	databaseId,
	usersCollectionId,
	videosCollectionId,
	storageId,
} = config;

// Init your React Native SDK
const client = new Client();

client
	.setEndpoint(config.endpoint)
	.setProject(config.projectId)
	.setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

// Register user
export const createUser = async (
	email: string,
	password: string,
	username: string,
) => {
	try {
		const newAccount = await account.create(
			ID.unique(),
			email,
			password,
			username,
		);

		if (!newAccount) throw Error;

		const avatarUrl = avatars.getInitials(username);

		await signIn(email, password);

		const newUser = await databases.createDocument(
			databaseId,
			usersCollectionId,
			ID.unique(),
			{
				accountId: newAccount.$id,
				email: email,
				username: username,
				avatar: avatarUrl,
			},
		);

		return newUser;
	} catch (error) {
		throw new Error(error);
	}
};

// Sign In
export const signIn = async (email, password) => {
	try {
		const session = await account.createEmailPasswordSession(email, password);
		return session;
	} catch (error) {
		throw new Error(error);
	}
};

// Get Account
export const getAccount = async () => {
	try {
		const currentAccount = await account.get();
		return currentAccount;
	} catch (error) {
		throw new Error(error);
	}
};

// Get Current User
export const getCurrentUser = async () => {
	try {
		const currentAccount = await getAccount();
		if (!currentAccount) throw Error;

		const currentUser = await databases.listDocuments(
			databaseId,
			usersCollectionId,
			[Query.equal("accountId", currentAccount.$id)],
		);

		if (!currentUser) throw Error;

		return currentUser.documents[0];
	} catch (error) {
		console.error(error);
		return null;
	}
};

// Sign Out
export const signOut = async () => {
	try {
		const session = await account.deleteSession("current");
		return session;
	} catch (error) {
		throw new Error(error);
	}
};

// Get All Posts
export const getAllPosts = async () => {
	try {
		const posts = await databases.listDocuments(
			databaseId,
			videosCollectionId,
			[Query.orderDesc("$createdAt")],
		);
		return posts.documents;
	} catch (error) {
		throw new Error(error);
	}
};

// Get Latest Posts
export const getLatestPosts = async () => {
	try {
		const posts = await databases.listDocuments(
			databaseId,
			videosCollectionId,
			[Query.orderDesc("$createdAt"), Query.limit(7)],
		);
		return posts.documents;
	} catch (error) {
		throw new Error(error);
	}
};

// Get Search Posts
export const searchPosts = async (query: string) => {
	try {
		const posts = await databases.listDocuments(
			databaseId,
			videosCollectionId,
			[Query.search("title", query)],
		);
		return posts.documents;
	} catch (error) {
		throw new Error(error);
	}
};

// Get User posts
export const getUserPosts = async (userId: string) => {
	try {
		const posts = await databases.listDocuments(
			databaseId,
			videosCollectionId,
			[Query.equal("creator", userId)],
		);
		return posts.documents;
	} catch (error) {
		throw new Error(error);
	}
};

export const getFilePreview = async (
	fileId: string,
	type: "video" | "image",
) => {
	let fileUrl;

	try {
		if (type === "video") {
			fileUrl = storage.getFileView(storageId, fileId);
		} else if (type === "image") {
			fileUrl = storage.getFilePreview(
				storageId,
				fileId,
				2000,
				2000,
				ImageGravity.Top,
				100,
			);
		} else {
			throw new Error("Invalid file type");
		}

		if (!fileUrl) throw Error;

		return fileUrl;
	} catch (error) {
		throw new Error(error);
	}
};

export const uploadFile = async (file: ImagePickerAsset) => {
	if (!file) return;

	const asset = {
		type: file.mimeType,
		name: file.fileName,
		size: file.fileSize,
		uri: file.uri,
	};

	try {
		const uploadedFile = await storage.createFile(
			storageId,
			ID.unique(),
			asset,
		);

		const fileUrl = await getFilePreview(uploadedFile.$id, file.type);

		return fileUrl;
	} catch (error) {
		throw new Error(error);
	}
};

export const createVideo = async (form: Form) => {
	try {
		const [thumbnailUrl, videoUrl] = await Promise.all([
			uploadFile(form.thumbnail),
			uploadFile(form.video),
		]);

		const newPost = await databases.createDocument(
			databaseId,
			videosCollectionId,
			ID.unique(),
			{
				title: form.title,
				thumbnail: thumbnailUrl,
				video: videoUrl,
				prompt: form.prompt,
				creator: form.userId,
			},
		);

		return newPost;
	} catch (error) {
		throw new Error(error);
	}
};
