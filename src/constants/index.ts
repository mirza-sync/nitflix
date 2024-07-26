// Retrieved from genreMovieList endpoint
export enum GENRE {
  Action = 28,
  Adventure = 12,
  Animation = 16,
  Comedy = 35,
  Crime = 80,
  Documentary = 99,
  Drama = 18,
  Family = 10751,
  Fantasy = 14,
  History = 36,
  Horror = 27,
  Music = 10402,
  Mystery = 9648,
  Romance = 10749,
  ScienceFiction = 878,
  TVMovie = 10770,
  Thriller = 53,
  War = 10752,
  Western = 37,
}

export const TMDB_IMAGE_BASE_URL = "http://image.tmdb.org/t/p/original";

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
