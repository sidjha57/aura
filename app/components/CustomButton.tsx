import { TouchableOpacity, Text } from "react-native";
import React from "react";

interface CustomButtonProps {
	title: string;
	handlePress: any;
	containerStyles: string;
	isLoading?: boolean;
	textStyles?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
	title,
	handlePress,
	containerStyles,
	isLoading,
	textStyles,
}) => {
	return (
		<TouchableOpacity
			onPress={handlePress}
			activeOpacity={0.7}
			className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${
				isLoading ? "opacity-50" : ""
			}`}
			disabled={isLoading}
		>
			<Text className={`text-primary font-psemibold text-lg ${textStyles}`}>
				{title}
			</Text>
		</TouchableOpacity>
	);
};

export default CustomButton;
