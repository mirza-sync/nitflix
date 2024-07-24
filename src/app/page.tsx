"use client";

import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { paths } from "../../api-codegen/schema";

type Movie = {
  id: number;
  backdrop_path: string;
  title?: string;
  original_title?: string;
  name?: string;
  overview: string;
  poster_path: string;
  media_type: string;
  adult: boolean;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: number;
  vote_average: number;
  vote_count: number;
};

type endpoint = paths["/3/account/{account_id}"]["parameters"]["query"];

export default function Home() {
  const {
    data: movie,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["get-movie"],
    queryFn: async () => {
      try {
        const res = await axios.get(
          `/trending/all/week?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
        );
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
    if (movie) {
      const randomNumber = Math.floor(Math.random() * movie.results.length - 1);
      setRandomMovie(movie?.results[randomNumber]);
      console.log("selectedMovie", movie.results[randomNumber], randomNumber);
    }
  }, [movie]);

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>{error.message}</h1>;

  return (
    <>
      {randomMovie ? (
        <div className="flex flex-col justify-center align-middle">
          <h1>
            {randomMovie.title ||
              randomMovie.name ||
              randomMovie.original_title}
          </h1>
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
