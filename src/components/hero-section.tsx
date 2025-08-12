// src/components/Hero.tsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

interface Movies {
  id: number;
  title: string;
  image: string;
}
interface HeroProps {
  movies: Movies[];
}

export default function HeroSection({ movies }: HeroProps) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <section className="w-full relative">
      {/* Custom Navigation Buttons */}
      <button
        ref={prevRef}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10  p-2 rounded-full hover:bg-white/70"
      >
        <ChevronLeft className="text-white" size={40} />
      </button>
      <button
        ref={nextRef}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10  p-2 rounded-full hover:bg-white/70"
      >
        <ChevronRight className="text-white" size={40} />
      </button>

      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          // @tsignore
          swiper.params.navigation.prevEl = prevRef.current;
          // @ts-ignore
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        loop
        className="h-screen"
      >
        {movies.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full h-full bg-cover  bg-center text-white"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Overlay gradient kanan & kiri */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/100 via-transparent to-black/100"></div>

              {/* Konten teks */}
              <div className="absolute md:left-40 md:bottom-50 left-10 bottom-20 bg-black/50 p-6 rounded-lg max-w-lg">
                <h2 className="text-3xl font-bold">{slide.title}</h2>

                {/* <p>{slide.description}</p> */}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
