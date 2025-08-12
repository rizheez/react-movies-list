import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface Movie {
  id: number;
  title: string;
  poster: string;
}

interface MovieSectionProps {
  title: string;
  movies?: Movie[];
  isLoading?: boolean;
  perPage?: number;
}

export default function MovieSection({
  title,
  movies = [],
  isLoading,
  perPage = 10,
}: MovieSectionProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(movies.length / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const paginatedMovies = movies.slice(startIndex, startIndex + perPage);

  const skeletonItems = Array.from({ length: perPage });

  return (
    <section className="my-8 container mx-auto">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      {totalPages > 1 && (
        <div className="flex justify-end my-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            <ChevronLeft className="h-4 w-4" size={30} />
          </button>
          {/* {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === i + 1 ? "bg-blue-500 text-white" : ""
              }`}
            >
              {i + 1}
            </button>
          ))} */}
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            <ChevronRight className="h-4 w-4" size={30} />
          </button>
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mx-auto">
        {isLoading
          ? skeletonItems.map((_, i) => (
              <Card
                key={i}
                className="overflow-hidden py-0 hover:transform hover:scale-105 transition-transform"
              >
                <Skeleton className="w-full aspect-[2/3]" />
                <CardContent className="p-2">
                  <Skeleton className="h-4 w-3/4" />
                </CardContent>
              </Card>
            ))
          : paginatedMovies.map((movie) => (
              <Card
                key={movie.id}
                className="overflow-hidden py-0 hover:transform hover:scale-105 transition-transform"
              >
                <div className="aspect-[2/3] w-full">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-2">
                  <p className="text-sm font-medium truncate">{movie.title}</p>
                </CardContent>
              </Card>
            ))}
      </div>

      {/* Pagination Controls */}
    </section>
  );
}
