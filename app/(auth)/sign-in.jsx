import { View, Text, ScrollView, Image, Alert } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../components/FormField";
import { useState } from "react";
import CustomButton from "../components/CustomButton";
import { Link, router } from "expo-router";
import { getCurrentUser, signIn, signOut } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignIn = () => {
	const [form, setForm] = useState({
		email: "",
		password: "",
	});

	const [isSubmitting, setIsSubmitting] = useState(false);
	const { setUser, setIsLogged } = useGlobalContext();

	const submit = async () => {
		if (!form.password || !form.email) {
			Alert.alert("Error", "Please fill in all the fields");
		}

		setForm({
			password: form.password.toLowerCase(),
			email: form.email.toLowerCase(),
		});

		
		setIsSubmitting(true);
		try {
			// await signOut();
			await signIn(form.email, form.password);
			const result = getCurrentUser();
			setUser(result);
			setIsLogged(true);

			Alert.alert("Success", "User signed in successfully!");
			router.replace("/home");
		} catch (error) {
			Alert.alert("Error", error.message);
			await signOut();
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<SafeAreaView className="bg-primary h-full">
			<ScrollView>
				<View className="w-full justify-center px-4 my-6 min-h-[85vh]">
					<Image
						source={images.logo}
						resizeMode="contain"
						className="w-[115px] h-[35px]"
					/>
					<Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
						Log in to Aura
					</Text>

					<FormField
						title="Email"
						value={form.email}
						handleChangeText={(e) =>
							setForm({
								...form,
								email: e,
							})
						}
						otherStyles="mt-7"
						keyboardType="email-address"
					/>

					<FormField
						title="Password"
						value={form.password}
						handleChangeText={(e) =>
							setForm({
								...form,
								password: e,
							})
						}
						otherStyles="mt-7"
						keyboardType="password"
					/>

					<CustomButton
						title={"Sign In"}
						handlePress={submit}
						containerStyles="mt-7"
						isLoading={isSubmitting}
					/>

					<View className="justify-center items-center pt-5 flex-row gap-2">
						<Text className="text-gray-100 text-lg font-pregular">
							{" "}
							Don't have an account?
						</Text>
						<Link
							href="/sign-up"
							className="text-lg font-psemibold text-secondary"
						>
							Sign Up
						</Link>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default SignIn;
