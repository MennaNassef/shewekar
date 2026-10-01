
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./HomeShewekarNews.css";


const newsItems = [
  {
    id: 1,
    slug: "winning-at-the-international-design-architecture-awards-london-2022",
    title:
      "Winning at The International Design & Architecture Awards - London 2022",
    date: "Oct 23, 2022",
    image:
      "https://images.pexels.com/photos/8089161/pexels-photo-8089161.jpeg?auto=compress&cs=tinysrgb&w=1200",
    link: "/news",
  },
  {
    id: 2,
    slug: "the-design-show-2022-here-we-come",
    title: "The Design Show 2022 - Here We Come",
    date: "Oct 23, 2022",
    image:
      "https://images.pexels.com/photos/7534563/pexels-photo-7534563.jpeg?auto=compress&cs=tinysrgb&w=1200",
    link: "/news",
  },
  {
    id: 3,
    slug: "venturing-onto-rugs",
    title: "Venturing Onto Rugs",
    date: "Oct 23, 2022",
    image:
      "https://images.pexels.com/photos/19064708/pexels-photo-19064708.jpeg?auto=compress&cs=tinysrgb&w=1200",
    link: "/news",
  },
  {
    id: 4,
    slug: "honorary-award-at-cda-2021",
    title: "Honorary Award at CDA 2021",
    date: "Oct 23, 2022",
    image:
      "https://images.pexels.com/photos/26886880/pexels-photo-26886880.jpeg?auto=compress&cs=tinysrgb&w=1200",
    link: "/news",
  },
  {
    id: 5,
    slug: "londons-top-drawer-2019",
    title: "London’s Top Drawer 2019",
    date: "Jan 10, 2019",
    image:
      "https://images.pexels.com/photos/7545776/pexels-photo-7545776.jpeg?auto=compress&cs=tinysrgb&w=1200",
    link: "/news",
  },
  {
    id: 6,
    slug: "shewekar-launch-event-at-alismaelias-kodak-space-2019",
    title:
      "Shewekar Launch Event at Alismaelia’s Kodak Space 2019",
    date: "Jun 6, 2016",
    image:
      "https://images.pexels.com/photos/26729545/pexels-photo-26729545.jpeg?auto=compress&cs=tinysrgb&w=1200",
    link: "/news",
  },
  {
    id: 7,
    slug: "a-new-perspective-on-modern-furniture",
    title: "A New Perspective on Modern Furniture",
    date: "Sep 12, 2026",
    image:
      "https://images.pexels.com/photos/20035979/pexels-photo-20035979.jpeg?auto=compress&cs=tinysrgb&w=1200",
    link: "/news",
  },
  {
    id: 8,
    slug: "contemporary-design-and-timeless-spaces",
    title: "Contemporary Design and Timeless Spaces",
    date: "Sep 20, 2026",
    image:
      "https://images.pexels.com/photos/7045829/pexels-photo-7045829.jpeg?auto=compress&cs=tinysrgb&w=1200",
    link: "/news",
  },
];



const HomeShewekarNews = ({ isDetailsPage = false }) =>  {
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
      slider.querySelector(".home-news-card");

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

    const duration = 650;

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
    <section className="home-shewekar-news">

      {/* HEADER */}
      <div className="home-news-header">

        <div className="home-news-title">
          <h2>
            {isDetailsPage ? "Latest Articles" : "News"} 
        </h2>
        </div>

        {/* DESKTOP / TABLET LINK */}
        {!isDetailsPage && (
            <Link
                to="/news"
                className="home-news-link"
            >
                <span>View All</span>

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
        )}

      </div>

      {/* SLIDER */}
      <div className="home-news-slider-area">

        <div
          className="home-news-slider"
          ref={sliderRef}
        >
          {newsItems.map((item) => (
            <Link
              key={item.title}
              to={`/news/${item.slug}`}
              className="home-news-card"
            >

              <div className="home-news-image">

                <img
                  src={item.image}
                  alt={item.title}
                />

              </div>

              <div className="home-news-overlay">

                <span className="home-news-date">
                  {item.date}
                </span>

                <h4>
                  {item.title}
                </h4>

              </div>

            </Link>
          ))}
        </div>

        {/* ARROWS */}
        <div className="home-news-arrows">

          {/* LEFT */}
          <button
            type="button"
            className={`home-news-arrow home-news-arrow-left ${
              !canScrollLeft
                ? "is-disabled"
                : ""
            }`}
            onClick={() =>
              scrollSlider("left")
            }
            disabled={!canScrollLeft}
            aria-label="Previous news"
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
            className={`home-news-arrow home-news-arrow-right ${
              !canScrollRight
                ? "is-disabled"
                : ""
            }`}
            onClick={() =>
              scrollSlider("right")
            }
            disabled={!canScrollRight}
            aria-label="Next news"
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
        {!isDetailsPage && (
            <Link
                to="/news"
                className="home-news-link home-news-link-mobile"
            >
                <span>View All</span>

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
        )}


      </div>
    </section>
  );
};

export default HomeShewekarNews;
