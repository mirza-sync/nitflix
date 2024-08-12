import { GENRE, Movie } from "@/constants";
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

export const getGenreNameById = (genreId: number) => {
  return Object.values(GENRE).find((genre) => genre.id === genreId)?.name;
};

export const getRandomArr = <T>(array: T[] | undefined) => {
  if (!array) return null;
  return array[Math.floor(Math.random() * array.length)];
};
