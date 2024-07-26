export const TMDB_IMAGE_BASE_URL = "http://image.tmdb.org/t/p/original";

// Retrieved from genreMovieList endpoint
export const GENRE = {
  Action: { id: 28, name: "Action" },
  Adventure: { id: 12, name: "Adventure" },
  Animation: { id: 16, name: "Animation" },
  Comedy: { id: 35, name: "Comedy" },
  Crime: { id: 80, name: "Crime" },
  Documentary: { id: 99, name: "Documentary" },
  Drama: { id: 18, name: "Drama" },
  Family: { id: 10751, name: "Family" },
  Fantasy: { id: 14, name: "Fantasy" },
  History: { id: 36, name: "History" },
  Horror: { id: 27, name: "Horror" },
  Music: { id: 10402, name: "Music" },
  Mystery: { id: 9648, name: "Mystery" },
  Romance: { id: 10749, name: "Romance" },
  ScienceFiction: { id: 878, name: "Sci-Fi" },
  TVMovie: { id: 10770, name: "TV Movie" },
  Thriller: { id: 53, name: "Thriller" },
  War: { id: 10752, name: "War" },
  Western: { id: 37, name: "Western" },
};

export type Movie = {
  adult?: boolean;
  backdrop_path?: string;
  id?: number;
  title?: string;
  original_language?: string;
  original_title?: string;
  overview?: string;
  poster_path?: string;
  media_type?: string;
  genre_ids?: Array<number>;
  popularity?: number;
  release_date?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
  name?: string;
  original_name?: string;
};
