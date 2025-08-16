import { useState, useEffect } from "react";
import type { Categories, Tv, APITvResponse } from "@/types";
import MovieSection from "@/components/movie-section";
import api from "@/lib/axios";

export default function Tv() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tv, setTv] = useState<Tv[]>([]);
  const [genres, setGenres] = useState<Categories[]>([]);
  const [tvByCategory, setTvByCategory] = useState<Record<string, Tv[]>>({});
  const [topRated, setTopRated] = useState<Tv[]>([]);

  useEffect(() => {
    const fetchTv = async () => {
      try {
        const { data } = await api.get<{ results: APITvResponse[] }>("/tv/popular", {
          params: {
            sort_by: "popularity.desc",
            page: 1,
          },
        });

        setTv(
          data.results.map((e) => ({
            poster_path: `https://image.tmdb.org/t/p/w500${e.poster_path}`,
            name: e.name,
            id: e.id,
            overview: e.overview,
            backdrop_path: `https://image.tmdb.org/t/p/w500${e.backdrop_path}`,
          }))
        );
        const top = await api.get<{ results: APITvResponse[] }>("/tv/top_rated", {
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
            poster_path: `https://image.tmdb.org/t/p/w500${e.poster_path}`,
            name: e.name,
            id: e.id,
            overview: e.overview,
            backdrop_path: `https://image.tmdb.org/t/p/w500${e.backdrop_path}`,
          }))
        );
        const genres = await api.get<{ genres: Categories[] }>("/genre/tv/list");
        setGenres(genres.data.genres);
        const tvPerCategory: Record<string, Tv[]>[] = await Promise.all(
          genres.data.genres.map(async (g) => {
            const { data } = await api.get<{ results: APITvResponse[] }>("/discover/tv", {
              params: {
                with_genres: g.id,
                sort_by: "popularity.desc",
                page: 1,
              },
            });
            return {
              [g.name]: data.results.map((e) => ({
                poster_path: `https://image.tmdb.org/t/p/w500${e.poster_path}`,
                name: e.name,
                id: e.id,
                overview: e.overview,
                backdrop_path: `https://image.tmdb.org/t/p/w500${e.backdrop_path}`,
              })),
            };
          })
        );
        setTvByCategory(tvPerCategory.reduce((acc, curr) => ({ ...acc, ...curr }), {}));
      } catch (error) {
        console.error("Error fetching tv:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTv();
  }, []);
  return (
    <>
      <div className="container mx-auto my-8 py-8">
        <MovieSection title="Trending" movies={tv} isLoading={isLoading} />
        <MovieSection title="Top Rated" movies={topRated} isLoading={isLoading} />
        {genres.map((g) => (
          <MovieSection
            key={g.id}
            title={g.name}
            movies={tvByCategory[g.name]}
            isLoading={isLoading}
          />
        ))}
      </div>
    </>
  );
}
