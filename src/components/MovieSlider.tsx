import { Movie, TMDB_IMAGE_BASE_URL } from "@/constants";
import { getMovieTitle } from "@/lib/utils";
import { usePreviewStore } from "@/store";
import Image from "next/image";
import { forwardRef } from "react";

type MovieSliderProps = {
  genreTitle: string;
  movies: Movie[];
};

const MovieSlider = forwardRef<HTMLDivElement, MovieSliderProps>(
  ({ genreTitle, movies }, ref) => {
    const setPreview = usePreviewStore((state) => state.setPreview);
    return (
      <section
        className="snap-child focus:border focus:border-white"
        tabIndex={-1}
        ref={ref}
      >
        <div className="mb-1 text-xl text-white">{genreTitle}</div>
        {/* <div className="h-[40px] bg-purple-500"></div> */}
        <div className="no-scrollbar flex h-[200px] gap-2 overflow-x-auto">
          {/* <div className="flex h-[200px]"> */}
          {movies.map(
            (movie) =>
              (movie.backdrop_path || movie.poster_path) && (
                <Image
                  key={movie.id}
                  // tabIndex={0}
                  src={
                    TMDB_IMAGE_BASE_URL +
                    (movie.poster_path || movie.backdrop_path)?.substring(1)
                  }
                  alt={`Poster for ${getMovieTitle(movie)}`}
                  width={1}
                  height={2}
                  className="h-full w-auto cursor-pointer snap-end snap-normal object-cover hover:shadow-lg hover:shadow-white"
                  sizes="(max-width: 768px) 33vw, 10vw"
                  onMouseEnter={() => setPreview(movie)}
                />
                // <div
                //   key={movie.id}
                //   className="h-full w-[100px] bg-red-500"
                // ></div>
              ),
          )}
        </div>
      </section>
    );
  },
);

MovieSlider.displayName = "MovieSlider";
export default MovieSlider;
