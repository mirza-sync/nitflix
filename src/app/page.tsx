"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  TrendingAllResponse,
  discoverMovie,
  trendingAll,
} from "../../api-codegen";
import { GENRE, Movie, TMDB_IMAGE_BASE_URL } from "@/constants";
import MovieSlider from "@/components/MovieSlider";
import { getMovieTitle } from "@/lib/utils";

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

export default function Home() {
  const [randomMovie, setRandomMovie] = useState<Movie | null>(null);
  const [genreMovies, setGenreMovies] = useState<GenreMovies[]>([]);
  const {
    data: movie,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["trending-all", "day"],
    queryFn: async () => {
      const res = await trendingAll({
        path: {
          time_window: "day",
        },
      });
      return res.data;
    },
  });

  useEffect(() => {
    if (movie?.results) {
      const randomNumber = Math.floor(
        Math.random() * movie.results!.length - 1,
      );
      console.log("randomMovie", movie.results[randomNumber]);
      setRandomMovie(movie?.results[randomNumber]);
    }

    const fetchMovies = async () => {
      const moviesByGenrePromises = genreList.map(async (genre) => {
        return discoverMovie({
          query: {
            with_genres: genre.id.toString(),
          },
        });
      });

      const moviesByGenre = await Promise.allSettled(moviesByGenrePromises);
      console.log("moviesByGenre", moviesByGenre);

      const genreMovies = moviesByGenre.map((movies, index) => {
        return {
          genreId: genreList[index].id,
          genreTitle: genreList[index].name,
          movies: (movies as any).value.data.results,
        } as GenreMovies;
      });

      setGenreMovies(genreMovies);
    };

    fetchMovies();
  }, [movie]);

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>{error.message}</h1>;

  return (
    <>
      {randomMovie ? (
        <div className="relative h-[80vh]">
          <Image
            src={TMDB_IMAGE_BASE_URL + randomMovie.backdrop_path}
            alt={"Large movie backdrop"}
            priority
            fill
            className="object-cover"
          />
          <div className="absolute bottom-0 left-0 flex w-1/2 flex-col p-12 text-white">
            <h1 className="text-4xl font-bold text-white">
              {getMovieTitle(randomMovie)}
            </h1>
            <p>{randomMovie.overview}</p>
          </div>
        </div>
      ) : (
        <p>Movie not found!</p>
      )}

      {genreMovies.length > 0 &&
        genreMovies.map((genreMovie) => {
          return (
            <MovieSlider
              key={genreMovie.genreId}
              genreTitle={genreMovie.genreTitle}
              movies={genreMovie.movies}
            />
          );
        })}
    </>
  );
}
