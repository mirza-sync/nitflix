import { Movie, MovieVideo, TMDB_IMAGE_BASE_URL } from "@/constants";
import { getMovieTitle } from "@/lib/utils";
import Image from "next/image";
import ReactPlayer from "react-player/youtube";
import { movieVideos } from "../../api-codegen";
import { useQuery } from "@tanstack/react-query";

type MovieProps = {
  movie: Movie;
};

const Highlights = ({ movie }: MovieProps) => {
  const { data: trailer, isLoading } = useQuery({
    queryKey: ["movie-video", movie.id],
    queryFn: async () => {
      const res = await movieVideos({
        path: { movie_id: movie.id! },
      });
      const videos = res.data;
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

  return (
    <>
      {isLoading ? (
        <Image
          src={TMDB_IMAGE_BASE_URL + movie.backdrop_path}
          alt={"Large movie backdrop"}
          priority
          fill
          className="object-cover"
        />
      ) : (
        trailer && (
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer?.key}`}
            playing
            muted
            height="100%"
            width="auto"
          />
        )
      )}
      <div className="absolute bottom-0 left-0 flex w-1/2 flex-col p-12 text-white">
        <h1 className="text-4xl font-bold text-white">
          {getMovieTitle(movie)}
        </h1>
        <p>{movie.overview}</p>
      </div>
    </>
  );
};

export default Highlights;
