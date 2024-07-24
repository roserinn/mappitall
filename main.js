
gsap.from('.header', {
  delay: 5, y: -50, duration: 1, ease: 'power2.out'
  })
  
  gsap.from('.galssmorfism', {
 delay: 3.5, y: -1000, duration: 1, ease: 'power2.out'
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
  './assets/img/sectonImg/slider/1.png',
  './assets/img/sectonImg/slider/1.png',
  './assets/img/sectonImg/slider/2.png',
  './assets/img/sectonImg/slider/3.png',
  './assets/img/sectonImg/slider/4.png',
  './assets/img/sectonImg/slider/5.png',
  './assets/img/sectonImg/slider/6.png',
  './assets/img/sectonImg/slider/7.png',
  './assets/img/sectonImg/slider/8.png',
  './assets/img/sectonImg/slider/9.png'
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
  const __msTimer = 20000;
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

let hasSwitchedToSmallVideo = false;
let hasSwitchedToLargeVideo = false;

function checkScreenWidth() {
    const video = document.getElementById('myVideo');
    const videoSource = document.getElementById('videoSource');
    const screenWidth = window.innerWidth;

    if (screenWidth <= 1000 && !hasSwitchedToSmallVideo) {
        const currentTime = video.currentTime;
        videoSource.src = './public/assets/videos/skyskraperMobile.mp4';
        video.load();
        video.currentTime = currentTime;
        video.play();
        hasSwitchedToSmallVideo = true;
        hasSwitchedToLargeVideo = false;  // reset the flag for larger video
    } else if (screenWidth > 1000 && !hasSwitchedToLargeVideo) {
        const currentTime = video.currentTime;
        videoSource.src = './public/assets/videos/skyskraper.mp4';
        video.load();
        video.currentTime = currentTime;
        video.play();
        hasSwitchedToLargeVideo = true;
        hasSwitchedToSmallVideo = false;  // reset the flag for smaller video
    }
}

window.addEventListener('resize', checkScreenWidth);
window.addEventListener('load', checkScreenWidth);

document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.header__container__menu');
  const menu = document.querySelector('.menu');
  const body = document.querySelector('body');
  const close = document.querySelector('.menu__container__close')

  burger.addEventListener('click', () => {
    body.style.overflow = 'hidden';
    menu.style.display = 'block';

    setTimeout(() => {
      menu.style.opacity = '1';
      menu.style.top = '0'; // Slide down into view
    }, 50); // Slightly reduced timeout for better effect
  })

  close.addEventListener('click', () => {
    body.style.overflow = 'scroll';
    menu.style.opacity = '0';
    menu.style.top = '-100%'; // Slide up out of view

    setTimeout(() => {
      menu.style.display = 'none';
    }, 500); // Match the CSS transition duration
  })
})
