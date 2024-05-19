import { useFonts } from "expo-font";
import { SplashScreen, Stack, useNavigationContainerRef } from "expo-router";
import React, { useEffect } from "react";
import GlobalProvider from "../context/GlobalProvider";
import * as Sentry from "@sentry/react-native";
import { isRunningInExpoGo } from "expo";

// Construct a new instrumentation instance. This is needed to communicate between the integration and React
const routingInstrumentation = new Sentry.ReactNavigationInstrumentation();

Sentry.init({
	dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
	environment: process.env.NODE_ENV,
	debug: process.env.NODE_ENV !== "development" ? false : true,
	integrations: [
		new Sentry.ReactNativeTracing({
			// Pass instrumentation to be used as `routingInstrumentation`
			routingInstrumentation,
			enableNativeFramesTracking: !isRunningInExpoGo(),
			// ...
		}),
	],
	// tracesSampleRate: 1.0,
	// _experiments: {
	// 	// profilesSampleRate is relative to tracesSampleRate.
	// 	// Here, we'll capture profiles for 100% of transactions.
	// 	profilesSampleRate: 1.0,
	// },
});

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
	const ref = useNavigationContainerRef();

	React.useEffect(() => {
		if (ref) {
			routingInstrumentation.registerNavigationContainer(ref);
		}
	}, [ref]);

	const [fontsLoaded, error] = useFonts({
		"Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
		"Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
		"Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
		"Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
		"Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
		"Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
		"Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
		"Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
		"Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
	});

	useEffect(() => {
		if (error) throw error;

		if (fontsLoaded) {
			SplashScreen.hideAsync();
		}
	}, [fontsLoaded, error]);

	if (!fontsLoaded) {
		return null;
	}

	if (!fontsLoaded && !error) {
		return null;
	}

	return (
		<GlobalProvider>
			<Stack>
				<Stack.Screen name="index" options={{ headerShown: false }} />
				<Stack.Screen name="(auth)" options={{ headerShown: false }} />
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				<Stack.Screen name="search/[query]" options={{ headerShown: false }} />
			</Stack>
		</GlobalProvider>
	);
};

export default Sentry.wrap(RootLayout);
