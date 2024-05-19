import React from "react";
import { FlatList, Image, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../../constants";
import { useGlobalContext } from "../../context/GlobalProvider";
import { getUserPosts } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import EmptyState from "../components/EmptyState";
import VideoCard from "../components/VideoCard";

const Profile = () => {
	const { user, setUser, setIsLogged } = useGlobalContext();

  // console.log('User', user.avatar);
	const { data: posts } = useAppwrite(() => getUserPosts(user.$id));

  console.log("posts",posts);

	const logout = () => {};

	return (
		<SafeAreaView className="bg-primary h-full">
			<FlatList
				data={posts}
				// data={[]}
				keyExtractor={(item) => item.$id}
				renderItem={({ item }) => (
					<VideoCard
						title={item.title}
						thumbnail={item.thumbnail}
						video={item.video}
						creator={item.creator.username}
						avatar={item.creator.avatar}
					/>
				)}
				ListHeaderComponent={() => (
					<View className="w-full justify-center items-center mt-6 mb-12 px-4">
						<TouchableOpacity
							className="w-full items-end mb-10"
							onPress={logout}
						>
							<Image source={icons.logout} className="w-6 h-6 " />
						</TouchableOpacity>
						<View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
							<Image
								source={{ uri: user?.avatar }}
								className="w-[90%] h-[90%] rounded-lg"
								resizeMode="cover"
							/>
						</View>
					</View>
				)}
				ListEmptyComponent={() => (
					<EmptyState
						title="No Videos Found"
						subTitle="No videos found for this search query"
					/>
				)}
			/>
		</SafeAreaView>
	);
};

export default Profile;
