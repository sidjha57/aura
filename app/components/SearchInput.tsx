import { router, usePathname } from "expo-router";
import React, { useState } from "react";
import {
	Alert,
	Image,
	TextInput,
	TouchableOpacity,
	View
} from "react-native";
import { icons } from "../../constants";
interface SearchInputProps {
	initialQuery?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ initialQuery }) => {
	const pathname = usePathname();
	const [query, setQuery] = useState(initialQuery || "");
	// console.log(pathname);

	return (
		<View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row space-x-4">
			<TextInput
				className="flex-1 text-white font-pregular text-base mt-0.5"
				value={query}
				placeholder="Search for a video topic"
				placeholderTextColor={"#CDCDE0"}
				onChangeText={(e: string) => {
					console.log(e);
					setQuery(e);
				}}
			/>

			<TouchableOpacity
				onPress={() => {
					if (!query) {
						return Alert.alert(
							"Missing query",
							"Please input something to search results across database",
						);
					}

					if (pathname.startsWith("/search")) {
						router.setParams({ query });
					} else {
						router.push(`/search/${query}`);
					}
				}}
			>
				<Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
			</TouchableOpacity>
		</View>
	);
};

export default SearchInput;
