
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Residential.css";

const projects = [
  {
    title: "Zamalek Duplex",
    image:
      "https://shewekar.com/cdn/shop/files/Zamalek_Penthouse_05.jpg?v=1771319601&width=2116",
    link: "/projects/zamalek-penthouse",
  },

  {
    title: "Boundless Living",
    image:
      "https://shewekar.com/cdn/shop/files/SH1.jpg?v=1770884894&width=1500",
    link: "/projects/boundless-living",
  },

  {
    title: "Lucien On Shore",
    image:
      "https://shewekar.com/cdn/shop/files/Lucien_On-Shore_96.jpg?v=1733135523&width=4000",
    link: "/projects/lucien-on-shore",
  },

  {
    title: "Turquoise Flare",
    image:
      "https://shewekar.com/cdn/shop/files/Turquoise-Flare-scaled.jpg?v=1717414766&width=2560",
    link: "/projects/turquoise-flare",
  },

  {
    title: "Seaside Cabana",
    image:
      "https://shewekar.com/cdn/shop/files/Seaside-Cabana-scaled.jpg?v=1717414833&width=2560",
    link: "/projects/seaside-cabana",
  },

  {
    title: "World Travelers' Summer Home",
    image:
      "https://shewekar.com/cdn/shop/files/wtsh_01.jpg?v=1717925183&width=2560",
    link: "/projects/world-travelers-summer-home",
  },

  {
    title: "Villa Basata",
    image:
      "https://shewekar.com/cdn/shop/files/svb_01.jpg?v=1717925887&width=2560",
    link: "/projects/villa-basata",
  },

  {
    title: "Minimalist Soul",
    image:
      "https://shewekar.com/cdn/shop/files/sms_01.jpg?v=1717927661&width=2560",
    link: "/projects/minimalist-soul",
  },

  {
    title: "Collector's Heaven",
    image:
      "https://shewekar.com/cdn/shop/files/spch_01.jpg?v=1717928123&width=2560",
    link: "/projects/collectors-heaven",
  },

  {
    title: "The Makeover",
    image:
      "https://shewekar.com/cdn/shop/files/sptm_01.jpg?v=1717928549&width=2560",
    link: "/projects/the-makeover",
  },

  {
    title: "Villa Natura",
    image:
      "https://shewekar.com/cdn/shop/files/spvna_01.jpg?v=1717929118&width=2560",
    link: "/projects/villa-natura",
  },

  {
    title: "Zamalek Apartment",
    image:
      "https://shewekar.com/cdn/shop/files/spza_01.jpg?v=1717929645&width=2560",
    link: "/projects/zamalek-apartment",
  },

  {
    title: "Hacienda White Villa",
    image:
      "https://shewekar.com/cdn/shop/files/sphwv_01.jpg?v=1717929961&width=2560",
    link: "/projects/hacienda-white-villa",
  },

  {
    title: "Hacienda Beach House",
    image:
      "https://shewekar.com/cdn/shop/files/sphbh_01.jpg?v=1717930223&width=1800",
    link: "/projects/hacienda-beach-house",
  },

  {
    title: "Hacienda White Beach House",
    image:
      "https://shewekar.com/cdn/shop/files/sphwbh_01.jpg?v=1717930434&width=1626",
    link: "/projects/hacienda-white-beach-house",
  },

  {
    title: "Palm Hills Villa",
    image:
      "https://shewekar.com/cdn/shop/files/spphv_01.jpg?v=1717937576&width=1800",
    link: "/projects/palm-hills-villa",
  },

  {
    title: "Maadi Apartment",
    image:
      "https://shewekar.com/cdn/shop/files/spmap_01.jpg?v=1717937925&width=1800",
    link: "/projects/maadi-apartment",
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

function Residential() {
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
      slider.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateArrows);

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const scrollSlider = (direction) => {
    const slider = sliderRef.current;

    if (!slider) return;

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    const firstCard = slider.querySelector(
      ".residential-project-card"
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
          requestAnimationFrame(animate);
      } else {
        animationRef.current = null;
        updateArrows();
      }
    };

    animationRef.current =
      requestAnimationFrame(animate);
  };

  return (
    <main className="residential-page">

      {/* =========================
          TITLE
      ========================= */}

      <section className="residential-title-section">
        <div className="residential-title-container">
          <h1>Residential</h1>
        </div>
      </section>


      {/* =========================
          HERO
      ========================= */}

      <section className="residential-hero">
        <img
          src="https://shewekar.com/cdn/shop/files/spvna_54.jpg?v=1717929155&width=1110"
          alt="Residential Projects"
        />
      </section>


      {/* =========================
          DESCRIPTION
      ========================= */}

      <section className="residential-description">
        <div className="residential-description-container">
          <p>
            At Shewekar we take a holistic approach to our
            residential projects, originating from artistic
            processes and research but based on the lifestyle
            of our clients. We immerse ourselves in order to
            authentically design spaces that speak of those
            that inhabit them. Enriched by people, we do not
            imitate or replicate, our designs embody those
            that inspire them. A multifaceted methodology
            based on location, natural setting, orientation,
            and function is used in all of our projects. We
            build the narratives around your stories to give
            richness and depth; this in turn makes all our
            residential designs individualistic. We build a
            relationship with all our clients, always there
            to shift things around seasonally, to add pieces
            from our collections or curated from different
            galleries, we are there to elevate your home
            through your evolution.
          </p>
        </div>
      </section>


      {/* =========================
          OUR PROJECTS
      ========================= */}

      <section className="residential-projects">
        <div className="residential-projects-container">

          <div className="residential-projects-header">
            <h2>Our Projects</h2>
          </div>


          <div className="residential-slider-area">

            <div
              className="residential-slider"
              ref={sliderRef}
            >

              {projects.map((project, index) => (
                <Link
                  key={project.title}
                  to={project.link}
                  className="residential-project-card"
                >

                  <div className="residential-project-image">
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

                  <div className="residential-project-title">
                    <h3>{project.title}</h3>
                  </div>

                </Link>
              ))}

            </div>


            {/* =========================
                ARROWS
            ========================= */}

            <div className="residential-arrows">

              <button
                type="button"
                className={`residential-arrow residential-arrow-left ${
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
                aria-label="Previous projects"
              >
                <ArrowIcon />
              </button>


              <button
                type="button"
                className={`residential-arrow residential-arrow-right ${
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
                aria-label="Next projects"
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

export default Residential;

