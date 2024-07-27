"use client";

import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { TrendingAllResponse, trendingAll } from "../../api-codegen";
import { TMDB_IMAGE_BASE_URL } from "@/constants";

type Movie = NonNullable<TrendingAllResponse["results"]>[number] & {
  name?: string;
  original_name?: string;
};

export default function Home() {
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
  const [randomMovie, setRandomMovie] = useState<Movie | null>(null);

  useEffect(() => {
    if (movie?.results) {
      const randomNumber = Math.floor(
        Math.random() * movie.results!.length - 1,
      );
      console.log("randomMovie", movie.results[randomNumber]);
      setRandomMovie(movie?.results[randomNumber]);
    }
  }, [movie]);

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>{error.message}</h1>;

  return (
    <>
      {randomMovie ? (
        <div className="relative h-full">
          <Image
            src={TMDB_IMAGE_BASE_URL + randomMovie.backdrop_path}
            alt={"Large movie backdrop"}
            priority
            fill
            style={{ objectFit: "cover" }}
          />
          <div className="absolute bottom-0 left-0 flex w-1/2 flex-col p-12 text-white">
            <h1 className="text-4xl font-bold text-white">
              {randomMovie.title ||
                randomMovie.original_title ||
                randomMovie.name ||
                randomMovie.original_name}
            </h1>
            <p>{randomMovie.overview}</p>
          </div>
        </div>
      ) : (
        <p>Movie not found!</p>
      )}
    </>
  );
}
