"use client";

import { useQuery } from "@tanstack/react-query";
import MovieCategories from "@/components/MovieCategories";
import Highlights from "@/components/Highlights";
import { usePreviewStore } from "@/store";
import { AnimatePresence, motion } from "framer-motion";
import { trendingAll } from "../../../api-codegen";
import { getRandomArr } from "@/lib/utils";

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
        return getRandomArr(trendingMovies);
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
