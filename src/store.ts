import { create } from "zustand";
import { Movie } from "./constants";

type PreviewState = {
  preview: Movie;
  setPreview: (movie: Movie) => void;
};

export const usePreviewStore = create<PreviewState>((set) => ({
  preview: {},
  setPreview: (preview) =>
    set((state) => ({ preview: (state.preview = preview) })),
}));
