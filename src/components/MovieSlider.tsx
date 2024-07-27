import { Movie, TMDB_IMAGE_BASE_URL } from "@/constants";
import Image from "next/image";

type MovieSliderProps = {
  genreTitle: string;
  movies: Movie[];
};

const getMovieTitle = (movie: Movie) => {
  return (
    movie.title || movie.original_title || movie.name || movie.original_name
  );
};

const MovieSlider = ({ genreTitle, movies }: MovieSliderProps) => {
  return (
    <section className="my-2 py-2">
      <div className="mb-1 text-xl text-white">{genreTitle}</div>
      <div className="no-scrollbar flex h-[200px] w-full overflow-x-auto">
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
                width={300}
                height={200}
                className="w-auto object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
              />
            ),
        )}
      </div>
    </section>
  );
};

export default MovieSlider;
