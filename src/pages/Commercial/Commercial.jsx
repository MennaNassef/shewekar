import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Commercial.css";

const projects = [
  {
    title: "Beano's Cafe - GEM",
    image:
      "https://shewekar.com/cdn/shop/files/Beanos_GEM_01-1-scaled.jpg?v=1716465994&width=2560",
    link: "/projects/beanos-cafe-gem",
  },
  {
    title: "La Poire Bistro, Downtown Mall, 2024",
    image:
      "https://shewekar.com/cdn/shop/files/Shewekar_X_Lapoir_Bistro1617_High_Res.jpg?v=1729520015&width=4000",
    link: "/projects/la-poire-bistro-downtown-mall-2024",
  },
  {
    title: "Beano’s Café – Maadi",
    image:
      "https://shewekar.com/cdn/shop/files/09-1-scaled.jpg?v=1717340377&width=2560",
    link: "/projects/beanos-cafe-maadi",
  },
  {
    title: "Beano’s Café – Zamalek",
    image:
      "https://shewekar.com/cdn/shop/files/10.jpg?v=1717510845&width=2160",
    link: "/projects/beanos-cafe-zamalek",
  },
  {
    title: "Amphoras Beach Resort",
    image:
      "https://shewekar.com/cdn/shop/files/01_922591e2-955f-496a-a7e1-2f793101495f.jpg?v=1717511030&width=2560",
    link: "/projects/amphoras-beach-resort",
  },
  {
    title: "The Design Show 2022",
    image:
      "https://shewekar.com/cdn/shop/files/01_9bfc586a-08ca-4f7b-befb-57024af715cc.jpg?v=1717511232&width=2560",
    link: "/projects/the-design-show-2022",
  },
  {
    title: "The Knowledge Hub",
    image:
      "https://shewekar.com/cdn/shop/files/01_c561f95e-5eb6-4e75-9210-6f1651b9d3f3.jpg?v=1717511394&width=1280",
    link: "/projects/the-knowledge-hub",
  },
  {
    title: "Tamara Restaurant Chain",
    image:
      "https://shewekar.com/cdn/shop/files/01_34e2bf95-5238-4013-b7aa-e170c18c734c.jpg?v=1717512478&width=1800",
    link: "/projects/tamara-restaurant-chain",
  },
  {
    title: "Movenpick Resort Hurghada",
    image:
      "https://shewekar.com/cdn/shop/files/movenpick_hurghada_01.jpg?v=1717513206&width=1800",
    link: "/projects/movenpick-resort-hurghada",
  },
  {
    title: "Emaar Up Town Cairo",
    image:
      "https://shewekar.com/cdn/shop/files/emar_uptown_01.jpg?v=1717513575&width=1280",
    link: "/projects/emaar-up-town-cairo",
  },
];

function ArrowIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 12H19"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <path
        d="M13 6L19 12L13 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Commercial() {
  const sliderRef = useRef(null);
  const animationRef = useRef(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateArrows = () => {
    const slider = sliderRef.current;

    if (!slider) return;

    const maxScrollLeft =
      slider.scrollWidth - slider.clientWidth;

    setCanScrollLeft(slider.scrollLeft > 2);

    setCanScrollRight(
      slider.scrollLeft < maxScrollLeft - 2
    );
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });

    const slider = sliderRef.current;

    if (!slider) return;

    updateArrows();

    const handleScroll = () => {
      updateArrows();
    };

    slider.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", updateArrows);

    return () => {
      slider.removeEventListener(
        "scroll",
        handleScroll
      );

      window.removeEventListener(
        "resize",
        updateArrows
      );

      if (animationRef.current) {
        cancelAnimationFrame(
          animationRef.current
        );
      }
    };
  }, []);

  const scrollSlider = (direction) => {
    const slider = sliderRef.current;

    if (!slider) return;

    if (animationRef.current) {
      cancelAnimationFrame(
        animationRef.current
      );
    }

    const firstCard = slider.querySelector(
      ".commercial-project-card"
    );

    if (!firstCard) return;

    const cardWidth =
      firstCard.getBoundingClientRect().width;

    const computedStyle =
      window.getComputedStyle(slider);

    const gap =
      parseFloat(
        computedStyle.columnGap ||
          computedStyle.gap
      ) || 0;

    const distance = cardWidth + gap;

    const start = slider.scrollLeft;

    const target =
      direction === "right"
        ? start + distance
        : start - distance;

    const maxScroll =
      slider.scrollWidth - slider.clientWidth;

    const finalTarget = Math.max(
      0,
      Math.min(target, maxScroll)
    );

    const duration = 900;

    const startTime = performance.now();

    const easeOutCubic = (t) => {
      return 1 - Math.pow(1 - t, 3);
    };

    const animate = (currentTime) => {
      const elapsed =
        currentTime - startTime;

      const progress = Math.min(
        elapsed / duration,
        1
      );

      const easedProgress =
        easeOutCubic(progress);

      slider.scrollLeft =
        start +
        (finalTarget - start) *
          easedProgress;

      if (progress < 1) {
        animationRef.current =
          requestAnimationFrame(
            animate
          );
      } else {
        animationRef.current = null;

        updateArrows();
      }
    };

    animationRef.current =
      requestAnimationFrame(
        animate
      );
  };

  return (
    <main className="commercial-page">

      {/* =========================
          TITLE
      ========================= */}

      <section className="commercial-title-section">
        <div className="commercial-title-container">
          <h1>Commercial</h1>
        </div>
      </section>


      {/* =========================
          HERO
      ========================= */}

      <section className="commercial-hero">
        <img
          src="https://shewekar.com/cdn/shop/files/Beanos_GEM_26-scaled_b3578da6-f5fa-4273-9951-0bdbd035f594.jpg?v=1716730376&width=1110"
          alt="Commercial Interior Design"
        />
      </section>


      {/* =========================
          DESCRIPTION
      ========================= */}

      <section className="commercial-description">
        <div className="commercial-description-container">
          <p>
            Over the years we have amassed a wealth of
            knowledge in spatial design, ergonomics and
            materials best used in commercial settings.
            Our ability lies in strong design principles,
            which allow us to create with relation to
            context. Whether it is a homegrown restaurant
            in the center of an ancient Egyptian museum,
            or a university knowledge hub that needs
            features to facilitate education. We consider
            the usage but also identify the requirements
            of our clients. With effective cost engineering
            and time management we ensure our client’s
            business plans and financials are respected.
            Our portfolio spans restaurants, hotels,
            educational institutions, offices, and retail
            venues. Diversified and unique we are able to
            cater to different genres and industry needs.
          </p>
        </div>
      </section>


      {/* =========================
          OUR COMMERCIAL PROJECTS
      ========================= */}

      <section className="commercial-projects">

        <div className="commercial-projects-container">

          <div className="commercial-projects-header">
            <h2>Our Commercial Projects</h2>
          </div>


          {/* =========================
              SLIDER
          ========================= */}

          <div className="commercial-slider-area">

            <div
              className="commercial-slider"
              ref={sliderRef}
            >

              {projects.map((project, index) => (
                <Link
                  key={project.title}
                  to={project.link}
                  className="commercial-project-card"
                >

                  <div className="commercial-project-image">

                    <img
                      src={project.image}
                      alt={project.title}
                      loading={
                        index < 5
                          ? "eager"
                          : "lazy"
                      }
                    />

                  </div>

                  <div className="commercial-project-title">
                    <h3>
                      {project.title}
                    </h3>
                  </div>

                </Link>
              ))}

            </div>


            {/* =========================
                ARROWS
            ========================= */}

            <div className="commercial-arrows">

              <button
                type="button"
                className={`commercial-arrow commercial-arrow-left ${
                  !canScrollLeft
                    ? "is-disabled"
                    : ""
                }`}
                onClick={() => {
                  if (canScrollLeft) {
                    scrollSlider("left");
                  }
                }}
                disabled={!canScrollLeft}
                aria-label="Previous commercial projects"
              >
                <ArrowIcon />
              </button>


              <button
                type="button"
                className={`commercial-arrow commercial-arrow-right ${
                  !canScrollRight
                    ? "is-disabled"
                    : ""
                }`}
                onClick={() => {
                  if (canScrollRight) {
                    scrollSlider("right");
                  }
                }}
                disabled={!canScrollRight}
                aria-label="Next commercial projects"
              >
                <ArrowIcon />
              </button>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Commercial;