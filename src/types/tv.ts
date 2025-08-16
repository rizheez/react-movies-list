import type { Categories } from "./movie";
export interface Tv {
    id: number;
    name: string;
    poster_path?: string;
    overview: string;
    backdrop_path?: string;
    genres_ids?: Categories[];
}

export interface APITvResponse {
    id: number;
    name: string;
    poster_path?: string;
    overview: string;
    backdrop_path?: string;
    genre_ids?: number[];
}



