// components/Slider.tsx
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";

interface SliderProps {
  images: string[];
}

export default function Slider({ images }: SliderProps) {
  return (
    <Swiper
      modules={[Autoplay, Navigation]}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      navigation={true}
      loop
      className="relative w-full h-[400px]"
    >
      {images.map((src, idx) => (
        <SwiperSlide key={idx}>
          <img src={src} alt={`Slide ${idx + 1}`} className="w-full h-full object-cover" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
