import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "../lib/appwrite";
import { Models } from "react-native-appwrite";

interface GlobalContextProps {
	isLogged: boolean;
	setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
	user: Models.Document | null;
	setUser: React.Dispatch<React.SetStateAction<Models.Document | null>>;
	loading: boolean;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultValue: GlobalContextProps = {
	isLogged: false,
	setIsLogged: () => {},
	user: null,
	setUser: () => {},
	loading: true,
	setLoading: () => {},
};

const GlobalContext = createContext<GlobalContextProps>(defaultValue);
export const useGlobalContext = () => useContext(GlobalContext);

// export const useGlobalContext = () => {
// 	const context = useContext(GlobalContext);
// 	if (!context) {
// 		throw new Error("useGlobalContext must be used within a GlobalProvider");
// 	}
// 	return context;
// };

const GlobalProvider = ({ children }) => {
	const [isLogged, setIsLogged] = useState(false);
	const [user, setUser] = useState<Models.Document>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// console.log('Get current User Called');

		getCurrentUser()
			.then((res) => {
				if (res) {
					// console.log(res);
					setIsLogged(true);
					setUser(res);
				} else {
					setIsLogged(false);
					setUser(null);
				}
			})
			.catch((err) => {
				console.error(err);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	return (
		<GlobalContext.Provider
			value={{
				isLogged,
				setIsLogged,
				user,
				setUser,
				loading,
				setLoading,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};

export default GlobalProvider;
