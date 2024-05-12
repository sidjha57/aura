import { Stack, Redirect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useGlobalContext } from "../../context/GlobalProvider";

const AuthLayout = () => {
	const { loading, isLogged } = useGlobalContext();

	console.log('Loading=', loading, 'isLogged=', isLogged);

	if (!loading && isLogged) return <Redirect href="/home" />;

	return (
		<>
			<Stack>
				<Stack.Screen
					name="sign-in"
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="sign-up"
					options={{
						headerShown: false,
					}}
				/>
			</Stack>
			<StatusBar backgroundColor="#161622" style="light" />
		</>
	);
};

export default AuthLayout;
