import {
	View,
	Text,
	FlatList,
	Image,
	RefreshControl,
	Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import SearchInput from "../components/SearchInput";
import Trending from "../components/Trending";
import EmptyState from "../components/EmptyState";
import useAppwrite from "../../lib/useAppwrite";
import { getAllPosts, getLatestPosts } from "../../lib/appwrite";
import VideoCard from "../components/VideoCard";
import { useGlobalContext } from "../../context/GlobalProvider";
import { StatusBar } from "expo-status-bar";

const Home = () => {
	const { user } = useGlobalContext();
	const { data: posts, refetch } = useAppwrite(getAllPosts);
	const { data: latestPosts } = useAppwrite(getLatestPosts);

	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = async () => {
		setRefreshing(true);
		await refetch();
		setRefreshing(false);
	};

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
					<View className="my-6 px-4 space-y-6">
						<View className="justify-between items-start flex-row mb-6">
							<View>
								<Text className="font-pmedium text-sm text-gray-100">
									Welcome Back
								</Text>
								<Text className="text-2xl font-psemibold text-white">
									{user?.username}
								</Text>
							</View>

							<View className="mt-1.5">
								<Image
									source={images.logoSmall}
									className="w-9 h-10"
									resizeMode="contain"
								/>
							</View>
						</View>
						<SearchInput />
						<View className="w-full flex-1 pt-5 pb-8">
							<Text className="font-pregular text-lg text-gray-100 mb-3">
								Latest Videos
							</Text>
							<Trending posts={latestPosts ?? []} />
						</View>
					</View>
				)}
				ListEmptyComponent={() => (
					<EmptyState
						title="No Videos Found"
						subTitle="Be the first to upload video"
					/>
				)}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
			/>
			<StatusBar backgroundColor="#161622" style="light" />
		</SafeAreaView>
	);
};

export default Home;
