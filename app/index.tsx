import { Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import { useGlobalContext } from "../context/GlobalProvider";
import CustomButton from "./components/CustomButton";

export default function App() {
	const { loading, isLogged } = useGlobalContext();

	if (!loading && isLogged) return <Redirect href="/home" />;

	return (
		<SafeAreaView className="bg-primary h-full">
			<ScrollView
				contentContainerStyle={{
					height: "100%",
				}}
			>
				<View className="flex w-full min-h-[85vh] justify-center items-center px-4">
					<Image
						source={images.logo}
						className="w-[130px] h-[84px]"
						resizeMode="contain"
					/>
					<Image
						source={images.cards}
						className="max-w-[380px] h-[298px]"
						resizeMode="contain"
					/>
					<View className="relative mt-5">
						<Text className="text-3xl text-white font-bold text-center">
							Discover Endless{"\n"} Possibilities with{" "}
							<Text className="text-secondary-200">Aura</Text>
						</Text>
						<Image
							source={images.path}
							className="w-[134px] h-[15px] absolute -bottom-2 -right-8"
							resizeMode="contain"
						/>
					</View>
					<Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
						Where creativity meets innovation: embark on a journey of limitless
						exploration with Aura
					</Text>
					<CustomButton
						title="Continue with Email"
						handlePress={() => {
							console.log('Hanlde Press');
							router.push("/sign-in");
						}}
						containerStyles="w-full mt-7"
						isLoading={loading}
					/>
				</View>
			</ScrollView>
			<StatusBar backgroundColor="#161622" style="light" />
		</SafeAreaView>
	);
}
