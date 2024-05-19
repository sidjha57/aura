import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import { useGlobalContext } from "../../context/GlobalProvider";
import { getCurrentUser, signIn, signOut } from "../../lib/appwrite";
import CustomButton from "../components/CustomButton";
import FormField from "../components/FormField";

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
			await signIn(form.email, form.password);
			const result = await getCurrentUser();
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
						placeholder={""}
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
						placeholder={""}
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
