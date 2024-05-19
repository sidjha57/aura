import { ImagePickerAsset } from "expo-image-picker";

export interface Form {
	title: string;
	video: ImagePickerAsset;
	thumbnail: ImagePickerAsset;
	prompt: string;
	userId?: string;
}
