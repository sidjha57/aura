import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";

export default function App() {
	return (
		<View className="flex-1 items-center justify-center bg-white">
			<Text className="text-black text-3xl font-pblack">Aura!</Text>
			<StatusBar style="auto" />
			<Link href="/home" className="text-blue-500">
				Home
			</Link>
		</View>
	);
}
