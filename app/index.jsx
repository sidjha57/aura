import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";

export default function App() {
	return (
		<View className="flex-1 items-center justify-center bg-black">
			<Text className="text-white text-3xl font-pblack">Aura!</Text>
			<StatusBar style="auto" />
			<Link href="/profile" className="text-blue-500">
				Go to profile
			</Link>
		</View>
	);
}
