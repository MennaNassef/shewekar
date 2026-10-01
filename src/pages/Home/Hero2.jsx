import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const slides = [
  {
    image: "/hero/hero-1.jpg",
    label: "SHEWEKAR Interiors",
    title: "Award-winning Interiors",
    button: "Design Services",
    link: "/interior-design",
  },
  {
    image: "/hero/hero-2.webp",
    label: "SHEWEKAR Gallery",
    title: "Signature Furniture",
    button: null,
    link: null,
  },
  {
    image: "/hero/hero-3.webp",
    label: null,
    title: null,
    button: "Visit Gallery",
    link: "/gallery",
  },
];

function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5500);

    return () => clearInterval(timer);
  }, []);

  const slide = slides[activeSlide];

  return (
    <section className="hero">
      <div className="hero-desktop">
        <article className="hero-panel hero-panel-large">
          <img src={slides[0].image} alt={slides[0].title} />
          <div className="hero-panel-overlay" />
          <div className="hero-copy hero-copy-large">
            <p>{slides[0].label}</p>
            <h1>{slides[0].title}</h1>
            <Link to={slides[0].link}>{slides[0].button}</Link>
          </div>
        </article>

        <div className="hero-side">
          <article className="hero-panel hero-panel-top">
            <img src={slides[1].image} alt={slides[1].title} />
            <div className="hero-panel-overlay light" />
            <div className="hero-copy hero-copy-top">
              <p>{slides[1].label}</p>
              <h2>{slides[1].title}</h2>
            </div>
          </article>

          <article className="hero-panel hero-panel-bottom">
            <img src={slides[2].image} alt="Shewekar Gallery" />
            <div className="hero-panel-overlay" />
            <div className="hero-copy hero-copy-bottom">
              <Link to={slides[2].link}>{slides[2].button}</Link>
            </div>
          </article>
        </div>
      </div>

      <div className="hero-mobile">
        <div className="mobile-slide" key={slide.image}>
          <img src={slide.image} alt={slide.title || slide.button || "Shewekar"} />
          <div className="hero-panel-overlay" />
          <div className="hero-copy">
            {slide.label && <p>{slide.label}</p>}
            {slide.title && <h1>{slide.title}</h1>}
            {slide.button && slide.link && (
              <Link to={slide.link}>{slide.button}</Link>
            )}
          </div>
        </div>

        <div className="hero-dots" aria-label="Hero slides">
          {slides.map((item, index) => (
            <button
              type="button"
              key={item.image}
              aria-label={`Show slide ${index + 1}`}
              className={index === activeSlide ? "active" : ""}
              onClick={() => setActiveSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
