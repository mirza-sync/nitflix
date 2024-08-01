"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { trendingAll } from "../../api-codegen";
import { Movie } from "@/constants";
import MovieCategories from "@/components/MovieCategories";
import Highlights from "@/components/Highlights";

export default function Home() {
  const [randomMovie, setRandomMovie] = useState<Movie | null>(null);

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
      const randomNumber = Math.floor(Math.random() * movie.results.length);
      console.log("randomMovie", movie.results[randomNumber], randomNumber);
      setRandomMovie(movie?.results[randomNumber]);
    }
  }, [movie]);

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>{error.message}</h1>;

  return (
    <div className="h-full">
      <div className="relative flex h-[70%]">
        {randomMovie && <Highlights movie={randomMovie} />}
      </div>
      <div className="no-scrollbar absolute bottom-0 h-[50%] overflow-y-auto bg-gradient-to-t from-black from-70% pt-14">
        <MovieCategories />
      </div>
    </div>
  );
}
