import { useFetchGenreMovies } from "@/hooks/useFetchGenreMovies";
import React from "react";
import MovieSlider from "./MovieSlider";

const MovieCategories = () => {
  const genreMovies = useFetchGenreMovies();

  return genreMovies.map((genreMovie) => {
    if (genreMovie.movies) {
      return (
        <MovieSlider
          key={genreMovie.genreId}
          genreTitle={genreMovie.genreTitle}
          movies={genreMovie.movies}
        />
      );
    }
  });
};

export default MovieCategories;
