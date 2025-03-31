import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

export const capturedPictureStore = create<{
  selectedCardIndex: number;
  setSelectedCardIndex: (index: number) => void;
  increaseSelectedCardIndex: () => void;
  capturedPictures: {
    id: string;
    url: string;
  }[];
  setCapturedPictures: (
    capturedPictures: string[]
  ) => void;
  resetCapturedPictures: () => void;
  addCapturedPicture: (
    capturedPicture: string
  ) => void;
}>((set) => ({
  selectedCardIndex: 0,
  increaseSelectedCardIndex: () => {
    set((state) => ({
      selectedCardIndex: state.selectedCardIndex + 1,
    }));
  },
  setSelectedCardIndex: (index: number) => {
    set({
      selectedCardIndex: index,
    });
  },
  capturedPictures: [],
  resetCapturedPictures: () => {
    set({
      capturedPictures: [],
      selectedCardIndex: 0,
    });
  },
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
