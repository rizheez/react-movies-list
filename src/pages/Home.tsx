import api from "@/lib/axios";
import { useState, useEffect } from "react";
import HeroSection from "@/components/hero-section";
import MovieSection from "@/components/movie-section";
import type { Movie, MovieAPIResponse, TrendingMovie } from "@/types";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [trending, setTrending] = useState<TrendingMovie[]>([]);

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
            poster_path: `https://image.tmdb.org/t/p/w500${e.poster_path}`,
            name: e.title,
            id: e.id,
            overview: e.overview,
          }))
        );
        const slicedMovies = data.results.slice(0, 10);
        const trendingWithImage: TrendingMovie[] = await Promise.all(
          slicedMovies.map(async (item) => {
            const detailRes = await api.get<MovieAPIResponse>(`/movie/${item.id}/images`);
            const bestImage = detailRes.data.backdrops
              ? `https://image.tmdb.org/t/p/original${detailRes.data.backdrops[0].file_path}`
              : `https://image.tmdb.org/t/p/w500${item.poster_path}`;

            return {
              id: item.id,
              title: item.title,
              image: bestImage,
            };
          })
        );

        setTrending(trendingWithImage);
      } catch (error) {
        console.error(error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    };

    fetchMovies();
  }, []);

  return (
    <>
      <HeroSection movies={trending} />
      <MovieSection title="Popular Movies" movies={movies} isLoading={isLoading} />
    </>
  );
}
