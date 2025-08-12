import api from "@/lib/axios";
import { useState, useEffect } from "react";
import HeroSection from "@/components/hero-section";
import MovieSection from "@/components/movie-section";
interface Backdrops {
  aspect_ratio: number;
  height: number;
  iso_693_1: string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}
interface MovieAPIResponse {
  id: number;
  title: string;
  poster_path?: string;
  overview: string;
  backdrop_path?: string;
  backdrops?: Backdrops[];
}

interface Movie {
  id: number;
  title: string;
  poster: string;
  overview: string;
}

interface TrendingMovie {
  id: number;
  title: string;
  image: string;
}

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
            poster: `https://image.tmdb.org/t/p/w500${e.poster_path}`,
            title: e.title,
            id: e.id,
            overview: e.overview,
          }))
        );
        const slicedMovies = data.results.slice(0, 10);
        console.log(slicedMovies); // Debugging: Cek data yang diambi
        // Ambil hanya 5 film untuk trending
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
