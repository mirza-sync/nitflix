import { Movie, TMDB_IMAGE_BASE_URL } from "@/constants";
import { getMovieTitle } from "@/lib/utils";
import Image from "next/image";
import ReactPlayer from "react-player/youtube";
import { movieVideos } from "../../api-codegen";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useIsClientMobile } from "@/hooks/useIsClientMobile";

type MovieProps = {
  movie: Movie;
};

const Highlights = ({ movie }: MovieProps) => {
  const isMobile = useIsClientMobile();
  const [isPlay, setIsPlay] = useState(false);
  const { data: trailer, isLoading } = useQuery({
    queryKey: ["movie-video", movie.id],
    queryFn: async () => {
      const res = await movieVideos({
        path: { movie_id: movie.id! },
      });
      const videos = res.data;
      if (!videos) {
        throw new Error("No video found");
      }
      const foundTrailer = videos.results?.find(
        (video) => video.type?.toUpperCase() == "TRAILER",
      );
      if (foundTrailer) {
        console.log("trailer", foundTrailer);
        return foundTrailer;
      } else {
        return null;
      }
    },
  });

  useEffect(() => {
    setIsPlay(false);
    if (trailer) {
      console.log("Play");
      setTimeout(() => {
        setIsPlay(true);
      }, 3000);
    }
  }, [movie, trailer]);

  return (
    <>
      <div className={`relative ${isMobile ? "w-full" : "ml-auto w-2/3"}`}>
        {isPlay ? (
          trailer && (
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${trailer?.key}`}
              playing
              height="100%"
              width="auto"
              onEnded={() => setIsPlay(false)}
            />
          )
        ) : (
          <Image
            src={TMDB_IMAGE_BASE_URL + movie.backdrop_path}
            alt={"Large movie backdrop"}
            priority
            fill
            className={`"animate-in object-cover`}
          />
        )}
      </div>
      <div
        className={`absolute top-0 flex h-full flex-col text-white ${isMobile ? "w-full justify-end px-4 pb-20" : "w-1/2 justify-center bg-gradient-to-r from-black from-70% p-12"} `}
      >
        <h1 className={`text-4xl font-bold text-white`}>
          {getMovieTitle(movie)}
        </h1>
        <p className={`${isMobile ? "line-clamp-3" : ""}`}>{movie.overview}</p>
      </div>
    </>
  );
};

export default Highlights;
