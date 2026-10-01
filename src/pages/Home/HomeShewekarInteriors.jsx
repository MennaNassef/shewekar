import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./HomeShewekarInteriors.css";

const interiorProjects = [
  {
    title: "Turquoise Flare",
    slug: "turquoise-flare",
    image:
      "https://shewekar.com/cdn/shop/files/H63815-scaled.jpg?v=1716479927&width=2560",
  },
  {
    title: "Beano’s Café – GEM",
    slug: "beanos-cafe-gem",
    image:
      "https://shewekar.com/cdn/shop/files/Beanos_GEM_10-scaled.jpg?v=1716476139&width=2560",
  },
  {
    title: "World Travelers’ Summer Home",
    slug: "world-travelers-summer-home",
    image:
      "https://shewekar.com/cdn/shop/files/034-scaled.jpg?v=1716480243&width=2560",
  },
  {
    title: "Villa Basata",
    slug: "villa-basata",
    image:
      "https://shewekar.com/cdn/shop/files/Villa_Basata.jpg?v=1718210193&width=2560",
  },
  {
    title: "Minimalist Soul",
    slug: "minimalist-soul",
    image:
      "https://shewekar.com/cdn/shop/files/Minimalist_Soul.jpg?v=1718210283&width=2560",
  },
  {
    title: "Seaside Cabana",
    slug: "seaside-cabana",
    image:
      "https://shewekar.com/cdn/shop/files/HW03-scaled.jpg?v=1716480004&width=2560",
  },
];

const HomeShewekarInteriors = () => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const sliderRef = useRef(null);
  const animationRef = useRef(null);

  const updateArrows = () => {
    const slider = sliderRef.current;

    if (!slider) return;

    const maxScrollLeft =
      slider.scrollWidth - slider.clientWidth;

    const isAtStart =
      slider.scrollLeft <= 5;

    const isAtEnd =
      slider.scrollLeft >= maxScrollLeft - 5;

    setCanScrollLeft(!isAtStart);

    setCanScrollRight(
      maxScrollLeft > 5 && !isAtEnd
    );
  };

  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider) return;

    requestAnimationFrame(updateArrows);

    const images = slider.querySelectorAll("img");

    images.forEach((image) => {
      if (!image.complete) {
        image.addEventListener("load", updateArrows);
      }
    });

    const resizeObserver = new ResizeObserver(() => {
      updateArrows();
    });

    resizeObserver.observe(slider);

    slider.addEventListener("scroll", updateArrows);
    window.addEventListener("resize", updateArrows);

    return () => {
      images.forEach((image) => {
        image.removeEventListener("load", updateArrows);
      });

      slider.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);

      resizeObserver.disconnect();

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const scrollSlider = (direction) => {
    const slider = sliderRef.current;

    if (!slider) return;

    const firstCard =
      slider.querySelector(".home-interior-card");

    if (!firstCard) return;

    const cardWidth =
      firstCard.getBoundingClientRect().width;

    const gap =
      window.innerWidth <= 600 ? 10 : 12;

    const distance =
      cardWidth + gap;

    const start =
      slider.scrollLeft;

    const maxScroll =
      slider.scrollWidth - slider.clientWidth;

    const target =
      direction === "right"
        ? Math.min(
            start + distance,
            maxScroll
          )
        : Math.max(
            start - distance,
            0
          );

    const totalDistance =
      target - start;

    if (totalDistance === 0) return;

    if (animationRef.current) {
      cancelAnimationFrame(
        animationRef.current
      );
    }

    const duration = 900;

    let startTime = null;

    const animate = (currentTime) => {
      if (startTime === null) {
        startTime = currentTime;
      }

      const elapsed =
        currentTime - startTime;

      const progress =
        Math.min(
          elapsed / duration,
          1
        );

      const eased =
        1 - Math.pow(
          1 - progress,
          3
        );

      slider.scrollLeft =
        start +
        totalDistance * eased;

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
    <section className="home-shewekar-interiors">

      {/* HEADER */}
      <div className="home-interiors-header">

        <div className="home-interiors-title">
          <h2>SHEWEKAR Interiors</h2>
        </div>

        {/* DESKTOP / TABLET LINK */}
        <Link
          to="/interior-design"
          className="home-interiors-link"
        >
          <span>
            View All Projects
          </span>

          <svg
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 4.5L10 8.5L6 12.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>

      </div>

      {/* SLIDER */}
      <div className="home-interiors-slider-area">

        <div
          className="home-interiors-slider"
          ref={sliderRef}
        >
          {interiorProjects.map(
            (project) => (
              <Link
                key={project.title}
                to={`/projects/${project.slug}`}
                className="home-interior-card"
              >
                <div className="home-interior-image">

                  <img
                    src={project.image}
                    alt={project.title}
                  />

                </div>

                <div className="home-interior-overlay">

                  <h4>
                    {project.title}
                  </h4>

                </div>
              </Link>
            )
          )}
        </div>

        {/* ARROWS */}
        <div className="home-interiors-arrows">

          {/* LEFT */}
          <button
            type="button"
            className={`home-interior-arrow home-interior-arrow-left ${
              !canScrollLeft
                ? "is-disabled"
                : ""
            }`}
            onClick={() =>
              scrollSlider("left")
            }
            disabled={!canScrollLeft}
            aria-label="Previous projects"
          >
            <svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 4.5L10 8.5L6 12.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* RIGHT */}
          <button
            type="button"
            className={`home-interior-arrow home-interior-arrow-right ${
              !canScrollRight
                ? "is-disabled"
                : ""
            }`}
            onClick={() =>
              scrollSlider("right")
            }
            disabled={!canScrollRight}
            aria-label="Next projects"
          >
            <svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 4.5L10 8.5L6 12.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

        </div>

        {/* MOBILE LINK */}
        <Link
          to="/interior-design"
          className="home-interiors-link home-interiors-link-mobile"
        >
          <span>
            View All Projects
          </span>

          <svg
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 4.5L10 8.5L6 12.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>

      </div>
    </section>
  );
};

export default HomeShewekarInteriors;