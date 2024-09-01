//communication button
document.addEventListener('DOMContentLoaded', function () {
  const pulseButtonContainer = document.querySelector('.pulseButton');
  const firstSection = document.querySelector('.hero');

  function toggleButtonVisibility() {
    const rect = firstSection.getBoundingClientRect();
    if (rect.bottom <= 0) {
      pulseButtonContainer.style.display = 'flex';
    } else {
      pulseButtonContainer.style.display = 'none';
    }
  }

  window.addEventListener('scroll', toggleButtonVisibility);
  toggleButtonVisibility();
});

//main video
let hasSwitchedToSmallVideo = false;
let hasSwitchedToLargeVideo = false;

function checkScreenWidth(resize = false) {
  const video = document.getElementById('myVideo');
  const videoSource = document.getElementById('videoSource');
  const screenWidth = window.innerWidth;

  if (screenWidth <= 1000 && !hasSwitchedToSmallVideo) {
    const currentTime = video.currentTime;
    videoSource.src = './assets/videos/skyskraperMobile.mp4';
    video.poster = './assets/videos/poster/skyskraperMobile.jpg'; // Set poster for small screen
    video.load();
    if (resize) {
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
    video.poster = './assets/videos/poster/skyskraper.jpg'; // Set poster for large screen
    video.load();
    if (resize) {
      video.currentTime = currentTime;
    }
    video.play().catch(error => {
      console.log("Error playing video:", error);
    });
    hasSwitchedToLargeVideo = true;
    hasSwitchedToSmallVideo = false;
  }
}

// pulse button 
document.addEventListener('DOMContentLoaded', function () {
  const pulseButtonContainer = document.querySelector('.pulseButton');
  const sections = document.querySelector('.hero');

  function checkSection() {
    let found = true;
    const rect = sections.getBoundingClientRect();
    if (rect.top <= 0 && rect.bottom >= 0) {
      found = false;
    }
    pulseButtonContainer.style.display = found ? 'flex' : 'none';
  }

  window.addEventListener('scroll', checkSection);
  checkSection();
});


document.addEventListener('DOMContentLoaded', (event) => {
  checkScreenWidth();
  window.addEventListener('resize', () => checkScreenWidth(true));
});



//landing animation
let tl = gsap.timeline();

tl.from('.galssmorfism', {
  y: -1200, duration: 1, ease: 'power2.out'
}, 2);
tl.from('.hero__container__subtitle', {
  duration: 1, ease: 'power', opacity: 0
}, 2.2);
tl.from('.hero__container__title', {
  x: -500, duration: 1.1, ease: '', opacity: 0
}, 2.4);
tl.from('.hero__container__text', {
  x: -500, duration: 1.2, ease: 'power', opacity: 0
}, 2.7);
tl.from('.hero__container__button', {
  y: 50, duration: 1.6, ease: 'back', opacity: 0
}, 3);

function animateSection(sectionSelector, animationProps, delay = 0) {
  gsap.from(sectionSelector, {
    scrollTrigger: {
      trigger: sectionSelector,
      start: 'top 60%',
    },
    ...animationProps,
    delay,
  });
}

animateSection('.forWhat__container__header', { y: 10, opacity: 0, duration: 0.5 });
animateSection('.forWhat__container__slider', { y: 10, opacity: 0, duration: 1.5 });

animateSection('.first .callToAction__container div', { y: 10, opacity: 0, stagger: 0.2, duration: 0.5 });

animateSection('.benefits__container__header', { y: 10, opacity: 0, duration: 0.5 });
animateSection('.benefits__container__cards', { y: 10, opacity: 0, duration: 1.5 });

animateSection('.process__container__header', { y: 10, opacity: 0, duration: 0.5 });

animateSection('.second .callToAction__container div', { y: 10, opacity: 0, stagger: 0.2, duration: 0.5 });

animateSection('.reviews__container__header', { y: 10, opacity: 0, duration: 0.5 });
animateSection('.reviews__container__slider', { y: 10, opacity: 0, duration: 1 });

animateSection('.contacts__container h2', { y: 10, opacity: 0, stagger: 0.2, duration: 0.5 });
animateSection('.contacts__container div', { y: 10, opacity: 0, stagger: 0.2, duration: 1 });


//slides background images
const sliderBg = [
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


//for what section slider
document.addEventListener('DOMContentLoaded', () => {

  function initializeSlider() {
    const __ms = document.querySelector('.forWhat__container__slider');
    const __msSlider = new MicroSlider(__ms, {
      indicators: true,
      indicatorText: ''
    });
    const forWhatHammer = new Hammer(__ms);
    const __msTimer = 10000;
    let __msAutoplay = setInterval(() => __msSlider.next(), __msTimer);

    __ms.onmouseenter = function (e) {
      clearInterval(__msAutoplay);
    }

    __ms.onmouseleave = function (e) {
      clearInterval(__msAutoplay);
      __msAutoplay = setInterval(() => __msSlider.next(), __msTimer);
    }

    __ms.onclick = function (e) {
      clearInterval(__msAutoplay);
    }

    forWhatHammer.on('tap', function (e) {
      clearInterval(__msAutoplay);
    });

    forWhatHammer.on('swipeleft', () => {
      clearInterval(__msAutoplay);
      __msSlider.next();
    });

    forWhatHammer.on('swiperight', () => {
      clearInterval(__msAutoplay);
      __msSlider.prev();
    });

    const btnPrev = document.querySelector('.btnPrev');
    const btnNext = document.querySelector('.btnNext');

    btnPrev.addEventListener('click', () => {
      __msSlider.prev();
    });
    btnNext.addEventListener('click', () => {
      __msSlider.next();
    });
    window.addEventListener('resize', () => {
      handleResize(__msSlider);
    });
  
    handleResize(__msSlider);
  }

  function handleResize(slider) {
    const width = window.innerWidth;
    let itemWidth, itemHeight;
  
    if (width > 1000) {
      itemWidth = 800;
      itemHeight = 450;
    } else if (width > 500) {
      itemWidth = 500;
      itemHeight = 350;
    } else {
      itemWidth = 350;
      itemHeight = 250;
    }
  
    slider.toggleFullWidth(false, itemWidth, itemHeight);
  }

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
  }

  window.addEventListener('scroll', onScrollHandler);
});


//reviews slider
document.addEventListener('DOMContentLoaded', function () {
  const container = document.querySelector('.container');
  const cards = document.querySelectorAll('.card');
  const totalCards = cards.length;
  const pointsContainer = document.querySelector('.reviews .points');
  const reviewsHammer = new Hammer(container);
  let currentIndex = 0;

  for (let i = 0; i < totalCards; i++) {
    const point = document.createElement('div');
    point.classList.add('points__item');
    if (i === 0) point.classList.add('active');
    pointsContainer.appendChild(point);
  }

  const points = pointsContainer.querySelectorAll('.points__item');

  function updateSlider() {
    const cardWidth = cards[0].offsetWidth;
    const gap = parseFloat(window.getComputedStyle(container).gap);
    container.style.transform = `translateX(-${(cardWidth + gap) * currentIndex}px)`;

    points.forEach(point => point.classList.remove('active'));
    points[currentIndex].classList.add('active');
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalCards;
    updateSlider();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalCards) % totalCards;
    updateSlider();
  }

  function goToSlide(index) {
    currentIndex = index;
    updateSlider();
  }

  document.querySelector('.reviews .btnNext').addEventListener('click', nextSlide);
  document.querySelector('.reviews .btnPrev').addEventListener('click', prevSlide);
  reviewsHammer.on('swipeleft', () => {
    nextSlide();
  });

  reviewsHammer.on('swiperight', () => {
    prevSlide();
  });
  points.forEach((point, index) => {
    point.addEventListener('click', () => goToSlide(index));
  });

  window.addEventListener('resize', updateSlider);
  updateSlider();
});


//benefits slider
document.addEventListener('DOMContentLoaded', function () {
  const cardsContainer = document.querySelector('.benefits__container__cards');
  const cards = document.querySelectorAll('.benefits__container__cards__card');
  const btnPrev = document.querySelector('.benefits__container__header__sliderBtn .btnPrev');
  const btnNext = document.querySelector('.benefits__container__header__sliderBtn .btnNext');
  const benefitsHammer = new Hammer(cardsContainer);

  let currentIndex = 0;

  function showCard(index) {
    cards.forEach((card, i) => {
      card.classList.remove('active');
      card.style.display = i === index ? 'block' : 'none';
    });
    setTimeout(() => {
      cards[index].classList.add('active');
    }, 10);
    updateDots(index);
  }

  function createPaginationDots() {
    const paginationContainer = document.createElement('div');
    paginationContainer.classList.add('pagination');

    cards.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', function () {
        currentIndex = i;
        showCard(currentIndex);
      });
      paginationContainer.appendChild(dot);
    });

    cardsContainer.appendChild(paginationContainer);
  }

  function updateDots(index) {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  btnPrev.addEventListener('click', function () {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : cards.length - 1;
    showCard(currentIndex);
  });

  btnNext.addEventListener('click', function () {
    currentIndex = (currentIndex < cards.length - 1) ? currentIndex + 1 : 0;
    showCard(currentIndex);
  });

  benefitsHammer.on('swipeleft', () => {
    currentIndex = (currentIndex < cards.length - 1) ? currentIndex + 1 : 0;
    showCard(currentIndex);
  });

  benefitsHammer.on('swiperight', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : cards.length - 1;
    showCard(currentIndex);
  });

  function handleResize() {
    if (cardsContainer.clientWidth < 500) {
      showCard(currentIndex);
      if (!cardsContainer.contains(cardsContainer.querySelector('.pagination'))) {
        createPaginationDots();
      }
    } else {
      const pagination = document.querySelector('.pagination');
      if (pagination) pagination.remove();

      cards.forEach(card => {
        card.style.display = 'block';
        card.classList.remove('active');
      });
    }
  }

  let scrennWidth = window.screen.width;
  window.addEventListener('resize', () => {
    if(window.innerWidth !== scrennWidth) {
      scrennWidth = window.innerWidth;
      handleResize();
    }
  });
  handleResize();
});

//cases slider
const casesContainer = document.querySelector('.cases__container__slider');
const slides = document.querySelectorAll('.casesSlide');
const nextBtn = document.querySelectorAll('.next-slide');
const prevBtn = document.querySelectorAll('.prev-slide');
const points = document.querySelectorAll('.points__item');
const casesHammer = new Hammer(casesContainer);

let currentSlide = 0;

function animateIn(slide) {
  const video = slide.querySelector('video');
  const content = slide.querySelector('.slide__content');
  const slideInfo = document.querySelectorAll('.slideInfo');
  const points = document.querySelectorAll('.points');

  gsap.fromTo(video, { opacity: 0 }, { opacity: 1, duration: 1 });
  gsap.fromTo(content, { x: '100%', opacity: 0 }, { x: '0%', opacity: 1, duration: 1, delay: 1.3 });
  gsap.fromTo(slideInfo, { opacity: 0 }, { opacity: 1, delay: 1.7, duration: 1, stagger: .2 });
  gsap.fromTo(points, { opacity: 0 }, { opacity: 1, duration: .7, delay: 3.5 });
}

function animateOut(slide, callback) {
  const video = slide.querySelector('video');
  const content = slide.querySelector('.slide__content');
  const slideInfo = document.querySelectorAll('.slideInfo');
  const points = document.querySelectorAll('.points');


  gsap.to(video, { opacity: 0, duration: 1, onComplete: callback });
  gsap.to(content, { x: '100%', opacity: 0, duration: 1 });
  gsap.to(slideInfo, { opacity: 1, duration: 1, onComplete: callback });
  gsap.to(points, { opacity: 1, duration: 1, onComplete: callback });
}

function showSlide(index) {
  if (index >= slides.length) {
    index = 0;
  } else if (index < 0) {
    index = slides.length - 1;
  }

  const newSlide = slides[index];
  const oldSlide = slides[currentSlide];

  if (newSlide !== oldSlide) {
    animateOut(oldSlide, () => {
      oldSlide.style.display = 'none';
      newSlide.style.display = 'block';
      animateIn(newSlide);
      currentSlide = index;
      updatePoints(index);
    });
  }
}

function updatePoints(index) {
  points.forEach(point => point.classList.remove('active'));
  points.forEach((point, idx) => {
    if(+point.dataset.index === index) {
      points[idx].classList.add('active');
    }
  });
}

nextBtn.forEach(button => {
  button.addEventListener('click', () => {
    showSlide(currentSlide + 1);
  });
});

prevBtn.forEach(button => {
  button.addEventListener('click', () => {
    showSlide(currentSlide - 1);
  });
});

points.forEach(point => {
  point.addEventListener('click', () => {
    const index = parseInt(point.getAttribute('data-index'));
    showSlide(index);
  });
});
casesHammer.on('swipeleft', () => {
  showSlide(currentSlide + 1);
});

casesHammer.on('swiperight', () => {
    showSlide(currentSlide - 1);
});
slides.forEach((slide, index) => {
  if (index !== currentSlide) {
    slide.style.display = 'none';
  }
});

animateIn(slides[currentSlide]);
updatePoints(currentSlide); 
