import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

export const capturedPictureStore = create<{
  capturedPictures: {
    id: string;
    url: string;
  }[];
  setCapturedPictures: (
    capturedPictures: string[]
  ) => void;
  addCapturedPicture: (
    capturedPicture: string
  ) => void;
}>((set) => ({
  capturedPictures: [],
  setCapturedPictures: (pictureUrls: string[]) =>
    set({
      capturedPictures: pictureUrls.map(
        mapIdOnPictureUrl
      ),
    }),
  addCapturedPicture: (pictureUrl: string) =>
    set((state) => ({
      capturedPictures: [
        ...state.capturedPictures,
        mapIdOnPictureUrl(pictureUrl),
      ],
    })),
}));

export const blobToUrl = (blob: Blob) => {
  return URL.createObjectURL(blob);
};

const mapIdOnPictureUrl = (url: string) => {
  return {
    id: uuidv4(),
    url,
  };
};

export const NUMBER_OF_CAPTURED_PICTURES = 3;
