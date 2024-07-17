
gsap.from('.header', {
  delay: 5, y: -50, duration: 1, ease: 'power2.out'
  })
  
  gsap.from('.galssmorfism', {
 delay: 3.5, y: -700, duration: 1, ease: 'power2.out'
  })

  gsap.from('.hero__container__subtitle', {
  delay: 3.9, duration: 1, ease: 'power', opacity: 0
}) 
gsap.from('.hero__container__title', {
delay: 4.4, x: -500, duration: 1.1, ease: '', opacity: 0
})

gsap.from('.hero__container__text', {
  delay: 4.5, x: -500, duration: 1.2, ease: 'power', opacity: 0
})
gsap.from('.hero__container__button', { 
  delay: 4.7, y: 50, duration: 1.6, ease: 'back', opacity: 0
}) 


const sliderBg = [
  '../../../public/assets/img/sectonImg/slider/1.png',
  '../../../public/assets/img/sectonImg/slider/1.png',
  '../../../public/assets/img/sectonImg/slider/2.png',
  '../../../public/assets/img/sectonImg/slider/3.png',
  '../../../public/assets/img/sectonImg/slider/4.png',
  '../../../public/assets/img/sectonImg/slider/5.png',
  '../../../public/assets/img/sectonImg/slider/6.png',
  '../../../public/assets/img/sectonImg/slider/7.png',
  '../../../public/assets/img/sectonImg/slider/8.png',
  '../../../public/assets/img/sectonImg/slider/9.png'
];

function setBackgroundImages() {
  const slides = document.querySelectorAll('.slide');
  slides.forEach((slide, index) => {
      if (index < sliderBg.length) {
          slide.style.backgroundImage = `url(${sliderBg[index]})`;
      }
  });
}

setBackgroundImages();


document.addEventListener('DOMContentLoaded', () => {

  const __ms = document.querySelector('.forWhat__container__slider');
  const __msSlider = new MicroSlider(__ms, {
    indicators: true,
    indicatorText: ''
  });
  const hammer = new Hammer(__ms);
  const __msTimer = 2000;
  let __msAutoplay = setInterval(() => __msSlider.next(), __msTimer);

  __ms.onmouseenter = function(e) {
    clearInterval(__msAutoplay);
  }

  __ms.onmouseleave = function(e) {
    clearInterval(__msAutoplay);
    __msAutoplay = setInterval(() => __msSlider.next(), __msTimer);
  }

  __ms.onclick = function(e) {
    clearInterval(__msAutoplay);
  }

  hammer.on('tap', function(e) {
    clearInterval(__msAutoplay);
  });

  hammer.on('swipe', function(e) {
    clearInterval(__msAutoplay);
    __msAutoplay = setInterval(() => __msSlider.next(), __msTimer);
  });


  const btnPrev = document.querySelector('.btnPrev');
  const btnNext = document.querySelector('.btnNext');

  btnPrev.addEventListener('click', () => {
    __msSlider.prev();
  });
  btnNext.addEventListener('click', () => {
    __msSlider.next();
  });

});
