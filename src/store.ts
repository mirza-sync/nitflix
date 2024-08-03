import { create } from "zustand";
import { Movie } from "./constants";

type PreviewState = {
  preview: Movie | null;
  setPreview: (movie: Movie) => void;
};

export const usePreviewStore = create<PreviewState>((set) => ({
  preview: null,
  setPreview: (preview) =>
    set((state) => ({ preview: (state.preview = preview) })),
}));
