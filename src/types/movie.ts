export interface Movie {
  id: number;
  title: string;
  poster: string;
  overview: string;
  backdrop_path?: string;
  genres?: Categories[];
}
export interface Backdrops {
  aspect_ratio: number;
  height: number;
  iso_693_1: string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}
export interface MovieAPIResponse {
  id: number;
  title: string;
  poster_path?: string;
  overview: string;
  backdrop_path?: string;
  genre_ids?: Categories[];
  backdrops?: Backdrops[];
}
export interface Categories {
  id: number;
  name: string;
}

export interface GenresResponse {
  genres: Categories[];
}

export interface TrendingMovie {
  id: number;
  title: string;
  image: string;
}
