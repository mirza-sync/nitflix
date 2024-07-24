"use client";

import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { TrendingAllResponse, trendingAll } from "../../api-codegen";
import { axiosClient } from "@/lib/axios";

type Movie = NonNullable<TrendingAllResponse["results"]>[number];

export default function Home() {
  const {
    data: movie,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["trending-all", "day"],
    queryFn: async () => {
      try {
        const res = await trendingAll({
          client: axiosClient,
          path: {
            time_window: "day",
          },
        });
        return res.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          throw new Error(error.message);
        } else {
          throw new Error("Server error");
        }
      }
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
        <div className="flex flex-col justify-center align-middle">
          <h1>{randomMovie.title || randomMovie.original_title}</h1>
          <Image
            src={`http://image.tmdb.org/t/p/original/${randomMovie.backdrop_path}`}
            alt={""}
            width={800}
            height={600}
          />
        </div>
      ) : (
        <p>Movie not found!</p>
      )}
    </>
  );
}
