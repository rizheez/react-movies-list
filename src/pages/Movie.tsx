import api from "@/lib/axios";
import { useState, useEffect } from "react";
import MovieSection from "@/components/movie-section";

export default function Movie() {

    type Movie = {
        id: number;
        title: string;
        poster: string;
        overview: string;
        backdrop_path?: string;
        genres?: Categories[]
    }
    type Backdrops = {
        aspect_ratio: number;
        height: number;
        iso_693_1: string;
        file_path: string;
        vote_average: number;
        vote_count: number;
        width: number;
    }
    type MovieAPIResponse = {
        id: number;
        title: string;
        poster_path?: string;
        overview: string;
        backdrop_path?: string;
        genre_ids?: Categories[]
        backdrops?: Backdrops[]
    }
    type Categories = {
        id: number;
        name: string;
    }

    type GenresResponse = {
        genres: Categories[]    
    }


    const [isLoading, setIsLoading] = useState(true);
    const [movies, setMovies] = useState<Movie[]>([]);
    const [topRated, setTopRated] = useState<Movie[]>([]);
    const [genres, setGenres] = useState<Categories[]>([]);
    const [moviesByCategory, setMoviesByCategory] = useState<{ [key: string]: Movie[] }>({});

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const { data } = await api.get<{ results: MovieAPIResponse[] }>("/movie/popular", {
                    params: {
                        sort_by: "popularity.desc",
                        page: 1,
                    },
                });

                setMovies(
                    data.results.map((e) => ({
                        poster: `https://image.tmdb.org/t/p/w500${e.poster_path}`,
                        title: e.title,
                        id: e.id,
                        overview: e.overview,
                    }))
                );

                const top = await api.get<{ results: MovieAPIResponse[] }>("/movie/top_rated", {
                    params: {
                        page: 1,
                        sort_by: "vote_average.desc",
                        vote_count: {
                            gte: 200
                        }
                    }
                })
                setTopRated(
                    top.data.results.map((e) => ({
                        poster: `https://image.tmdb.org/t/p/w500${e.poster_path}`,
                        title: e.title,
                        id: e.id,
                        overview: e.overview,
                    }))
                )

                // Fetch genres and movies by each genre
                const { data: genresData } = await api.get<GenresResponse>("/genre/movie/list");
                const categories = genresData.genres;
                setGenres(categories);

                const moviesPerCategory = await Promise.all(
                    categories.map(async (genre) => {
                        const byGenre = await api.get<{ results: MovieAPIResponse[] }>("/discover/movie", {
                            params: {
                                with_genres: genre.id,
                                sort_by: "popularity.desc",
                                page: 1,
                            },
                        });

                        const mappedMovies: Movie[] = byGenre.data.results.map((e) => ({
                            poster: `https://image.tmdb.org/t/p/w500${e.poster_path}`,
                            title: e.title,
                            id: e.id,
                            overview: e.overview,
                        }));

                        return [String(genre.id), mappedMovies] as const;
                    })
                );

                setMoviesByCategory(Object.fromEntries(moviesPerCategory) as { [key: string]: Movie[] });
            
            } catch (error) {
                console.error("Error fetching movies:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMovies();
    }, []);

    return (
        <>
        <div className="container mx-auto my-8 py-8">
            <MovieSection title="Trending" movies={movies} isLoading={isLoading} />
            <MovieSection title="Top Rated" movies={topRated} isLoading={isLoading} />
            {genres.map((g) => (
                <MovieSection
                    key={g.id}
                    title={g.name}
                    movies={moviesByCategory[String(g.id)] || []}
                    isLoading={isLoading}
                />
            ))}
            
            
        </div>

        </>
    )

}