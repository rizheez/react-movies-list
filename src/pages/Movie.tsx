import api from "@/lib/axios";
import { useState, useEffect } from "react";
import MovieSection from "@/components/movie-section";
import type { Movie, MovieAPIResponse, Categories, GenresResponse } from "@/types"; // Adjust the import path as needed
export default function Movie() {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Categories[]>([]);
  const [moviesByCategory, setMoviesByCategory] = useState<Record<string, Movie[]>>({});

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
              gte: 200,
            },
          },
        });
        setTopRated(
          top.data.results.map((e) => ({
            poster: `https://image.tmdb.org/t/p/w500${e.poster_path}`,
            title: e.title,
            id: e.id,
            overview: e.overview,
          }))
        );

        // Fetch genres and movies by each genre
        const { data: genresData } = await api.get<GenresResponse>("/genre/movie/list");
        const categories = genresData.genres;
        setGenres(categories);

        const moviesPerCategory: [string, Movie[]][] = await Promise.all(
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

            return [String(genre.id), mappedMovies];
          })
        );

        setMoviesByCategory(Object.fromEntries(moviesPerCategory));
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
  );
}
