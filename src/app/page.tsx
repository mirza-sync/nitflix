"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { trendingAll } from "../../api-codegen";
import { Movie } from "@/constants";
import MovieCategories from "@/components/MovieCategories";
import Highlights from "@/components/Highlights";
import { usePreviewStore } from "@/store";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const {
    data: randomMovie,
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
      const trendingMovies = res.data.results;
      if (trendingMovies) {
        const randomNumber = Math.floor(Math.random() * trendingMovies.length);
        console.log("randomMovie", trendingMovies[randomNumber], randomNumber);
        return trendingMovies[randomNumber];
      }
    },
  });

  const preview = usePreviewStore((state) => state.preview);

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>{error.message}</h1>;

  return (
    <div className="h-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={preview?.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="relative flex h-[70%]"
        >
          <Highlights movie={preview ? preview : randomMovie!} />
        </motion.div>
      </AnimatePresence>
      <div className="no-scrollbar scroll-fade-gradient absolute bottom-0 h-[50%] snap-y snap-mandatory overflow-y-auto pt-14">
        <MovieCategories />
      </div>
    </div>
  );
}
