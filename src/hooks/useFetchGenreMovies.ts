import { GENRE, Movie } from "@/constants";
import { useQueries, useQuery } from "@tanstack/react-query";
import { discoverMovie } from "../../api-codegen/services.gen";

type GenreMovies = {
  genreId: number;
  genreTitle: string;
  movies: Movie[];
};

const genreList = [
  GENRE["Action"],
  GENRE["Horror"],
  GENRE["ScienceFiction"],
  GENRE["Comedy"],
  GENRE["War"],
];

export const useFetchGenreMovies = () => {
  const genreMovieQueries = useQueries({
    queries: genreList.map((genre) => {
      return {
        queryKey: ["genre-movie", genre.id],
        queryFn: async () =>
          await discoverMovie({
            query: {
              with_genres: genre.id.toString(),
            },
          }),
      };
    }),
  });

  const genreMovies = genreMovieQueries.map((movies, index) => {
    return {
      genreId: genreList[index].id,
      genreTitle: genreList[index].name,
      movies: movies.data?.data.results,
    } as GenreMovies;
  });

  return genreMovies;
};
