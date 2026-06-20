import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import useQueryDisplayTime from '../query/useQueryDisplayTime.ts';
import NoData from './NoData.tsx';
import { Images } from '../feature/common/types.ts';

interface Props {
  slides: Images[];
}
export const Slider = ({ slides = [] }: Props) => {
  const { data: delay, isLoading } = useQueryDisplayTime();

  if (isLoading) return <div>로딩 중...</div>;
  if (!slides || slides.length === 0) return <NoData />;

  return (
    <Swiper
      modules={[Autoplay, EffectFade]}
      spaceBetween={0}
      slidesPerView={1}
      effect={'fade'}
      autoplay={{
        delay: delay.count * 1000 || 5000,
        disableOnInteraction: false,
      }}
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id} className='slide'>
          <img
            src={slide.path}
            alt={slide.filename}
            className='h-screen w-screen object-cover'
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
