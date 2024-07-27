import { Movie } from "@/constants";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getMovieTitle = (movie: Movie) => {
  return (
    movie.title || movie.original_title || movie.name || movie.original_name
  );
};
