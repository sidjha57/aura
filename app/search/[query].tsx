import { useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { searchPosts } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import EmptyState from "../components/EmptyState";
import SearchInput from "../components/SearchInput";
import VideoCard from "../components/VideoCard";
import { StatusBar } from "expo-status-bar";

const Search = () => {
	const { query } = useLocalSearchParams();
	const updatedQuery = typeof query === "string" ? query : query[0];
	const { data: posts, refetch } = useAppwrite(() => searchPosts(updatedQuery));

	useEffect(() => {
		refetch();
	}, [query]);

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
					<View className="my-6 px-4">
						<Text className="font-pmedium text-sm text-gray-100">
							Search results
						</Text>
						<Text className="text-2xl font-psemibold text-white">{query}</Text>
						<View className="mt-6 mb-8">
							<SearchInput initialQuery={updatedQuery} />
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
			<StatusBar backgroundColor="#161622" style="light" />
		</SafeAreaView>
	);
};

export default Search;
