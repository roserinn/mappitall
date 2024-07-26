window.addEventListener('load', () => {
  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    preloader.classList.add('hidden');
    setTimeout(() => {
      const preloader = document.getElementById('preloader');
      preloader.classList.add('hidden');
      document.body.classList.remove('no-scroll');
      startAnimations()
      checkScreenWidth();
    }, 10); // Задержка в 1 секунду
  }, 1000); 
});


let hasSwitchedToSmallVideo = false;
let hasSwitchedToLargeVideo = false;

function checkScreenWidth(resize = false) {
    const video = document.getElementById('myVideo');
    const videoSource = document.getElementById('videoSource');
    const screenWidth = window.innerWidth;

    if (screenWidth <= 1000 && !hasSwitchedToSmallVideo) {
        const currentTime = video.currentTime;
        videoSource.src = './assets/videos/skyskraperMobile.mp4';
        video.load();
        if(resize) {
          video.currentTime = currentTime;
        }
        video.play().catch(error => {
            console.log("Error playing video:", error);
        });
        hasSwitchedToSmallVideo = true;
        hasSwitchedToLargeVideo = false;  
    } else if (screenWidth > 1000 && !hasSwitchedToLargeVideo) {
        const currentTime = video.currentTime;
        videoSource.src = './assets/videos/skyskraper.mp4';
        video.load();
        if(resize) {
          video.currentTime = currentTime;
        }
        video.play().catch(error => {
            console.log("Error playing video:", error);
        });
        hasSwitchedToLargeVideo = true;
        hasSwitchedToSmallVideo = false;  
    }
}

window.addEventListener('resize', () => {
  checkScreenWidth(true);
});
// window.addEventListener('load', checkScreenWidth);

function startAnimations() {
  gsap.from('.header', {
    delay: 4.7, y: -100, duration: 1, ease: 'power2.out', opacity: 0
  });

  gsap.from('.galssmorfism', {
    delay: 3.5, y: -1200, duration: 1, ease: 'power2.out'
  });

  gsap.from('.hero__container__subtitle', {
    delay: 3.6, duration: 1, ease: 'power', opacity: 0
  });

  gsap.from('.hero__container__title', {
    delay: 4, x: -500, duration: 1.1, ease: '', opacity: 0
  });

  gsap.from('.hero__container__text', {
    delay: 4.1, x: -500, duration: 1.2, ease: 'power', opacity: 0
  });

  gsap.from('.hero__container__button', {
    delay: 4.5, y: 50, duration: 1.6, ease: 'back', opacity: 0
  });
}

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
      
  // Инициализация слайдера
  function initializeSlider() {
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
  }

  // Функция для запуска видео
  function playVideosInView() {
    const videos = document.querySelectorAll('.callToAction video');
    videos.forEach(video => {
      const videoPosition = video.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (videoPosition < windowHeight && videoPosition >= 0) {
        if (video.paused) {
          video.play();
        }
      } else {
        if (!video.paused) {
          video.pause();
        }
      }
    });
  }

  // Отслеживание, достиг ли пользователь определенного контейнера
  function onScrollHandler() {
    const targetContainer = document.querySelector('.forWhat__container__slider');
    if (targetContainer) {
      const targetPosition = targetContainer.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (targetPosition < windowHeight && targetPosition >= 0) {
        initializeSlider();
        window.removeEventListener('scroll', onScrollHandler);
      }
    }

    playVideosInView(); // Проверка и запуск видео
  }

  window.addEventListener('scroll', onScrollHandler);
  window.addEventListener('resize', playVideosInView);
  window.addEventListener('load', playVideosInView);
  playVideosInView(); // Первоначальная проверка на загрузке страницы
});


document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.header__container__menu');
  const menu = document.querySelector('.menu');
  const body = document.querySelector('body');
  const close = document.querySelector('.menu__container__close');

  burger.addEventListener('click', () => {
    body.style.overflow = 'hidden';
    menu.style.display = 'block';

    setTimeout(() => {
      menu.style.opacity = '1';
      menu.style.top = '0'; 
    }, 50);
  });

  close.addEventListener('click', () => {
    body.style.overflow = 'scroll';
    menu.style.opacity = '0';
    menu.style.top = '-100%'; 

    setTimeout(() => {
      menu.style.display = 'none';
    }, 500); 
  });
});
