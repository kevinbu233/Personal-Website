'use strict';


const tabs = document.querySelectorAll('.operations__tab')
const tabsContainer = document.querySelector('.operations__tab-container')
const tabsContent = document.querySelectorAll('.operations__content')

function copyToClipboard() {
    navigator.clipboard.writeText("kevinbu233@berkeley.edu");
    alert("Email copied to clipboard");
  }

tabsContainer.addEventListener('click', function(e) {
    const clicked = e.target.closest('.operations__tab')
    console.log(clicked)
    if (!clicked) return
    tabs.forEach(t => t.classList.remove('operations__tab--active'))
    clicked.classList.add('operations__tab--active')

    tabsContent.forEach(t=> t.classList.remove('operations__content--active'))
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList
    .add('operations__content--active')
})

const nav = document.querySelector('.mainav');
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
  console.log(navHeight)
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight * 1.4}px`,
});

headerObserver.observe(header);

const buttonScroll = document.querySelector(".buttonBig")
const sec = document.querySelector(".operations")

buttonScroll.addEventListener("click", function(e){
    const coord = sec.getBoundingClientRect()
    window.scrollTo({
        left: coord.left + window.pageXOffset,
        top: coord.top + window.pageYOffset - 2.5* navHeight,

        behavior:"smooth",
    })
})






const slider = function() {
    const slides = document.querySelectorAll('.slide')
    const btnLeft = document.querySelector('.slider__btn--left')
    const btnRight = document.querySelector('.slider__btn--right')
    const slider = document.querySelector('.slider')
    const dotsContainer = document.querySelector('.dots')
    let curSlide = 0
    const maxSlide = slides.length

    const createDots = function() {
        slides.forEach(function(s, i) {
            dotsContainer.insertAdjacentHTML('beforeend', 
            `<button class = "dots__dot" data-slide="${i}"></button>`)
        })
    }

    // createDots()

    const activateDot = function(slide) {
        document.querySelectorAll('.dots__dot')
        .forEach(dot => dot.classList.remove
            ('dots__dot--active'))
        document.querySelector(`.dots__dot[data-slide="${slide}"]`)
        .classList.add('dots__dot--active')
    }



    // slider.style.transform = 'scale(0.5)'
    // slider.style.overflow = 'visible'
    const goToSlide = function(slide) {
        slides.forEach((s, i) => s.style.transform = `translateX(${100 * (i-slide)}%)`)
        activateDot(curSlide)
    }

    const nextSlide = function() {
        if (curSlide === maxSlide - 1) {
            curSlide = 0 
        } else {
            curSlide++
        }
        goToSlide(curSlide)   
    }

    const prevSlide = function() {
        if (curSlide === 0) {
            curSlide = maxSlide - 1 
        } else {
            curSlide--
        }

        goToSlide(curSlide)
        activateDot(curSlide)
    }


    const init = function() {
        createDots();
        goToSlide(0);
        
        activateDot(0);
    }
    init()
    btnRight.addEventListener('click', nextSlide)

    btnLeft.addEventListener('click', prevSlide)

    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') prevSlide();
        e.key === 'ArrowRight' && nextSlide();
    });
    dotsContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('dots__dot')) {
            const {slide} = e.target.dataset
            goToSlide(slide)
            activateDot(slide)
        }
    })
}
slider()
