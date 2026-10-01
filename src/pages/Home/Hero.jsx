import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Hero.css";

const slides = [
  {
    src: "/hero/hero-1.jpg",
    eyebrow: "SHEWEKAR Interiors",
    title: "Award-winning Interiors",
    button: "Design Services",
    href: "/projects/beanos-cafe-gem",
  },
  {
    src: "/hero/hero-2.webp",
    eyebrow: "SHEWEKAR Gallery",
    title: "Signature Furniture",
    button: "",
    href: "#",
  },
  {
    src: "/hero/hero-3.webp",
    eyebrow: "",
    title: "",
    button: "Visit Gallery",
    href: "/products/for-the-love-of-flowers-chest",
  },
];

function Panel({ slide, className = "" }) {
  return (
    <article className={`hero__panel ${className}`}>
      {slide.button ? (
        <Link to={slide.href}>
          <img
            className="hero__image"
            src={slide.src}
            alt=""
          />
        </Link>
      ) : (
        <img
          className="hero__image"
          src={slide.src}
          alt=""
        />
      )}

      {(slide.eyebrow || slide.title || slide.button) && (
        <div className="hero__content">
          {slide.eyebrow && (
            <span>{slide.eyebrow}</span>
          )}

          {slide.title && (
            <h1>{slide.title}</h1>
          )}

          {slide.button && (
            <a
              className="hero__button"
              href={slide.href}
            >
              {slide.button}
            </a>
          )}
        </div>
      )}
    </article>
  );
}

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  const [mobileImageStyle, setMobileImageStyle] = useState({
    width: "100%",
    height: "auto",
  });

  /* =====================================================
     CALCULATE MOBILE IMAGE SIZE
  ===================================================== */

  useEffect(() => {
    const calculateImageSize = () => {
      if (window.innerWidth > 767) {
        return;
      }

      const img = new Image();

      img.src = slides[activeSlide].src;

      img.onload = () => {
        const screenWidth = window.innerWidth;
        const maxHeight = 550;

        const imageRatio =
          img.naturalWidth / img.naturalHeight;

        /* 
         * First try:
         * الصورة تاخد عرض الشاشة بالكامل
         */

        let width = screenWidth;
        let height = width / imageRatio;

        /* 
         * لو الطول أكبر من 550px
         * نصغر الصورة بحيث تدخل بالكامل
         */

        if (height > maxHeight) {
          height = maxHeight;
          width = height * imageRatio;
        }

        setMobileImageStyle({
          width: `${width}px`,
          height: `${height}px`,
        });
      };
    };

    calculateImageSize();

    window.addEventListener(
      "resize",
      calculateImageSize
    );

    return () => {
      window.removeEventListener(
        "resize",
        calculateImageSize
      );
    };
  }, [activeSlide]);

  /* =====================================================
     MOBILE AUTO SLIDER
  ===================================================== */

  useEffect(() => {
    const media = window.matchMedia(
      "(max-width: 767px)"
    );

    if (!media.matches) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setActiveSlide(
        (current) =>
          (current + 1) % slides.length
      );
    }, 5000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  return (
    <section
      className="hero"
      aria-label="Shewekar interior design hero"
    >

      {/* =====================================================
          DESKTOP
      ===================================================== */}

      <div className="hero__desktop">

        <Panel
          slide={slides[0]}
          className="hero__panel--large"
        />

        <Panel slide={slides[1]} />

        <Panel slide={slides[2]} />

      </div>


      {/* =====================================================
          TABLET
      ===================================================== */}

      <div className="hero__tablet">

        <Panel
          slide={slides[0]}
          className="hero__panel--large"
        />

        <Panel slide={slides[1]} />

        <Panel slide={slides[2]} />

      </div>


      {/* =====================================================
          MOBILE
      ===================================================== */}

      <div className="hero__mobile">

        <div className="hero__mobile-stage">

          {/* IMAGE */}

          {slides[activeSlide].button ? (
            <Link to={slides[activeSlide].href}>
              <img
                key={slides[activeSlide].src}
                src={slides[activeSlide].src}
                alt=""
                className={`hero__mobile-image ${
                  activeSlide === 0
                    ? "hero__mobile-image--first"
                    : ""
                }`}
                style={mobileImageStyle}
              />
            </Link>
          ) : (
            <img
              key={slides[activeSlide].src}
              src={slides[activeSlide].src}
              alt=""
              className={`hero__mobile-image ${
                activeSlide === 0
                  ? "hero__mobile-image--first"
                  : ""
              }`}
              style={mobileImageStyle}
            />
          )}

          {/* CONTENT */}

          {(slides[activeSlide].eyebrow ||
            slides[activeSlide].title ||
            slides[activeSlide].button) && (

            <div className="hero__mobile-content">

              {slides[activeSlide].eyebrow && (
                <span>
                  {slides[activeSlide].eyebrow}
                </span>
              )}

              {slides[activeSlide].title && (
                <h1>
                  {slides[activeSlide].title}
                </h1>
              )}

              {slides[activeSlide].button && (
                <a
                  className="hero__button"
                  href={slides[activeSlide].href}
                >
                  {slides[activeSlide].button}
                </a>
              )}

            </div>
          )}

        </div>


        {/* DOTS */}

        <div
          className="hero__dots"
          aria-label="Hero slides"
        >

          {slides.map((slide, index) => (

            <button
              key={slide.src}
              type="button"
              className={`hero__dot ${
                activeSlide === index
                  ? "is-active"
                  : ""
              }`}
              aria-label={`Show slide ${index + 1}`}
              aria-current={
                activeSlide === index
                  ? "true"
                  : undefined
              }
              onClick={() =>
                setActiveSlide(index)
              }
            />

          ))}

        </div>

      </div>

    </section>
  );
}