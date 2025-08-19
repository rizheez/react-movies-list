import api from "@/lib/axios";
import { useState, useEffect } from "react";
import MovieSection from "@/components/movie-section";
import type { Movie, MovieAPIResponse, Categories, GenresResponse } from "@/types"; // Adjust the import path as needed
import { useSearchParams } from "react-router-dom";
export default function Movie() {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Categories[]>([]);
  const [moviesByCategory, setMoviesByCategory] = useState<Record<string, Movie[]>>({});
  const [searchParams] = useSearchParams();
  const querySearch = searchParams.get("search");
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        if (querySearch) {
          // 🔍 Mode pencarian
          const { data } = await api.get<{ results: MovieAPIResponse[] }>("/search/movie", {
            params: {
              query: querySearch,
              page: 1,
            },
          });

          setMovies(
            data.results.map((e) => ({
              poster_path: `https://image.tmdb.org/t/p/w500${e.poster_path}`,
              name: e.title,
              id: e.id,
              overview: e.overview,
            }))
          );
          setTopRated([]); // kosongin kalau lagi search
          setGenres([]);
          setMoviesByCategory({});
        } else {
          // 📌 Default: fetch popular, top rated, genres
          const { data } = await api.get<{ results: MovieAPIResponse[] }>("/movie/popular", {
            params: { page: 1 },
          });

          setMovies(
            data.results.map((e) => ({
              poster_path: `https://image.tmdb.org/t/p/w500${e.poster_path}`,
              name: e.title,
              id: e.id,
              overview: e.overview,
            }))
          );

          const top = await api.get<{ results: MovieAPIResponse[] }>("/movie/top_rated", {
            params: { page: 1 },
          });
          setTopRated(
            top.data.results.map((e) => ({
              poster_path: `https://image.tmdb.org/t/p/w500${e.poster_path}`,
              name: e.title,
              id: e.id,
              overview: e.overview,
            }))
          );

          const { data: genresData } = await api.get<GenresResponse>("/genre/movie/list");
          const categories = genresData.genres;
          setGenres(categories);

          const moviesPerCategory: Record<string, Movie[]>[] = await Promise.all(
            categories.map(async (genre) => {
              const { data } = await api.get<{ results: MovieAPIResponse[] }>("/discover/movie", {
                params: {
                  with_genres: genre.id,
                  page: 1,
                },
              });

              return {
                [genre.name]: data.results.map((e) => ({
                  poster_path: `https://image.tmdb.org/t/p/w500${e.poster_path}`,
                  name: e.title,
                  id: e.id,
                  overview: e.overview,
                })),
              };
            })
          );

          setMoviesByCategory(moviesPerCategory.reduce((acc, arr) => ({ ...acc, ...arr }), {}));
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [querySearch]); // 👈 dependensi tambah querySearch

  return (
    <>
      <div className="container mx-auto my-8 py-8">
        <MovieSection
          title={querySearch ? `Search Result for "${querySearch}"` : "Popular Movies"}
          movies={movies}
          isLoading={isLoading}
        />
        {!movies.length && !isLoading && (
          <h1 className="text-center text-2xl font-bold">No movies found.</h1>
        )}
        {!querySearch && (
          <>
            <MovieSection title="Top Rated" movies={topRated} isLoading={isLoading} />
            {genres.map((g) => (
              <MovieSection
                key={g.id}
                title={g.name}
                movies={moviesByCategory[g.name]}
                isLoading={isLoading}
              />
            ))}
          </>
        )}
      </div>
    </>
  );
}
