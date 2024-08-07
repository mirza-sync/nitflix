import { Movie, TMDB_IMAGE_BASE_URL } from "@/constants";
import { getMovieTitle } from "@/lib/utils";
import { usePreviewStore } from "@/store";
import Image from "next/image";

type MovieSliderProps = {
  genreTitle: string;
  movies: Movie[];
};

const MovieSlider = ({ genreTitle, movies }: MovieSliderProps) => {
  const setPreview = usePreviewStore((state) => state.setPreview);
  return (
    <section className="my-2 snap-end snap-always py-2">
      <div className="mb-1 text-xl text-white">{genreTitle}</div>
      <div className="no-scrollbar flex h-[200px] snap-x snap-mandatory gap-2 overflow-x-auto">
        {movies.map(
          (movie) =>
            (movie.backdrop_path || movie.poster_path) && (
              <Image
                key={movie.id}
                src={
                  TMDB_IMAGE_BASE_URL +
                  (movie.poster_path || movie.backdrop_path)?.substring(1)
                }
                alt={`Poster for ${getMovieTitle(movie)}`}
                width={1}
                height={2}
                className="h-full w-auto cursor-pointer snap-end object-cover hover:shadow-lg hover:shadow-white"
                sizes="(max-width: 768px) 33vw, 10vw"
                onMouseEnter={() => setPreview(movie)}
              />
            ),
        )}
      </div>
    </section>
  );
};

export default MovieSlider;
