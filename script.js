window.addEventListener("DOMContentLoaded", () => {
  const resizableSwiper = (
    breakpoint,
    swiperClass,
    swiperSettings,
    callback
  ) => {
    let swiper;

    breakpoint = window.matchMedia(breakpoint);

    const enableSwiper = function (className, settings) {
      swiper = new Swiper(className, settings);

      if (callback) {
        callback(swiper);
      }
    };

    const checker = function () {
      if (breakpoint.matches) {
        return enableSwiper(swiperClass, swiperSettings);
      } else {
        if (swiper !== undefined) swiper.destroy(true, true);
        return;
      }
    };

    breakpoint.addEventListener("change", checker);
    checker();
  };

  const someFunc = (instance) => {
    if (instance) {
      instance.on("slideChange", function (e) {
        console.log("*** mySwiper.activeIndex", instance.activeIndex);
      });
    }
  };

  resizableSwiper("(max-width: 450px)", ".swiper", {
    loop: true,
    spaceBetween: -60,
    slidesPerView: 1,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
});

let slides = document.querySelectorAll(".page__swiper-slide");

const tabletMediaQuery = window.matchMedia("(768px <= width < 1120px)");
const pcMediaQuery = window.matchMedia("(width >= 1120px)");

if (tabletMediaQuery.matches) {
  for (let i = 6; i < slides.length; i++) {
    let slide = slides[i];
    slide.classList.add("page__swiper-slide--hidden");
  }
}
if (pcMediaQuery.matches) {
  for (let i = 8; i < slides.length; i++) {
    let slide = slides[i];
    slide.classList.add("page__swiper-slide--hidden");
  }
}

let button = document.querySelector(".page__show-more-button");
button.addEventListener("click", function () {
  const isOpen = button.classList.contains("page__show-more-button--open");

  if (!isOpen) {
    for (let i = 0; i < slides.length; i++) {
      let slide = slides[i];
      slide.classList.remove("page__swiper-slide--hidden");
    }

    button.textContent = "Скрыть";
    button.classList.add("page__show-more-button--open");
  } else {
    if (tabletMediaQuery.matches) {
      for (let i = 6; i < slides.length; i++) {
        let slide = slides[i];
        slide.classList.add("page__swiper-slide--hidden");
      }
    }
    if (pcMediaQuery.matches) {
      for (let i = 8; i < slides.length; i++) {
        let slide = slides[i];
        slide.classList.add("page__swiper-slide--hidden");
      }
    }

    button.textContent = "Показать всё";
    button.classList.remove("page__show-more-button--open");
  }
});
