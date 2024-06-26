import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import { useGlobalContext } from "../../context/GlobalProvider";
import { createUser } from "../../lib/appwrite";
import CustomButton from "../components/CustomButton";
import FormField from "../components/FormField";
import { StatusBar } from "expo-status-bar";

const SignUp = () => {
	const [form, setForm] = useState({
		username: "",
		email: "",
		password: "",
	});

	const [isSubmitting, setIsSubmitting] = useState(false);
	const { setUser, setIsLogged } = useGlobalContext();

	const submit = async () => {
		if (form.username === "" || form.email === "" || form.password === "") {
			Alert.alert("Error", "Please fill in all fields");
		}

		setIsSubmitting(true);
		try {
			const result = await createUser(form.email, form.password, form.username);
			// console.log(result);
			setUser(result);
			setIsLogged(true);

			router.replace("/home");
		} catch (error) {
			Alert.alert("Error", error.message);
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
						Sign up to Aura
					</Text>

					<FormField
						title="Username"
						value={form.username}
						handleChangeText={(e) =>
							setForm({
								...form,
								username: e,
							})
						}
						otherStyles="mt-7"
						placeholder={""}
					/>

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
							Have an account already?
						</Text>
						<Link
							href="/sign-in"
							className="text-lg font-psemibold text-secondary"
						>
							Sign In
						</Link>
					</View>
				</View>
			</ScrollView>
			<StatusBar backgroundColor="#161622" style="light" />
		</SafeAreaView>
	);
};

export default SignUp;
