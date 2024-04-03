import Swiper from 'swiper';
import { EffectFade, Navigation } from 'swiper/modules';

const container = document.querySelector('.b-carousel__swiper');

const swiper = new Swiper({
  modules: [EffectFade, Navigation],
  loop: true,
  effect: "fade",
  navigation: {
    nextEl: '.b-carousel__next',
    prevEl: '.b-carousel__prev',
  },
});

swiper.init(container);
