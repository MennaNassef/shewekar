
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getCollectionProducts } from "../../api/collectionsApi";
import "./NewArrivals.css";

const productsOrder = [
  "Juzũr Lounge Chair",
  "Sunset Dunes Coffee Table",
  "Intertwined",
  "Hibiscus",
  "Divine Burl",
  "Divine Emerald",
  "Andalucia Buffet",
];

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const sliderRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getCollectionProducts("new-arrivals");
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching New Arrivals:", error);
      }
    };

    fetchProducts();
  }, []);

  const sortedProducts = productsOrder
    .map((title) =>
      products.find((product) => product.title === title)
    )
    .filter(Boolean);

  const updateArrows = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    const maxScrollLeft =
      slider.scrollWidth - slider.clientWidth;

    const isAtStart = slider.scrollLeft <= 5;

    const isAtEnd =
      slider.scrollLeft >= maxScrollLeft - 5;

    setCanScrollLeft(!isAtStart);

    setCanScrollRight(
      maxScrollLeft > 5 && !isAtEnd
    );
  };

  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider || sortedProducts.length === 0) return;

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
    };
  }, [sortedProducts.length]);


const scrollSlider = (direction) => {
  const slider = sliderRef.current;

  if (!slider) return;

  const firstCard =
    slider.querySelector(".new-arrival-card");

  if (!firstCard) return;

  const cardWidth =
    firstCard.getBoundingClientRect().width;

  const gap =
    window.innerWidth <= 600 ? 10 : 12;

  const distance =
    cardWidth + gap;

  const start = slider.scrollLeft;

  const maxScroll =
    slider.scrollWidth - slider.clientWidth;

  const target =
    direction === "right"
      ? Math.min(start + distance, maxScroll)
      : Math.max(start - distance, 0);

  const totalDistance = target - start;

  if (totalDistance === 0) return;

  // إلغاء أي حركة قديمة
  if (animationRef.current) {
    cancelAnimationFrame(animationRef.current);
  }

  const duration = 900;

  let startTime = null;

  const animate = (currentTime) => {
    if (startTime === null) {
      startTime = currentTime;
    }

    const elapsed = currentTime - startTime;

    const progress =
      Math.min(elapsed / duration, 1);

    /*
      حركة شبيهة بـ:
      cubic-bezier(0.22, 1, 0.36, 1)

      البداية سريعة
      وبعدها الحركة تهدى تدريجيًا
    */
    const eased =
      1 - Math.pow(1 - progress, 3);

    slider.scrollLeft =
      start + totalDistance * eased;

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
    <section className="new-arrivals">

      {/* HEADER */}
      <div className="new-arrivals-header">

        <div className="new-arrivals-title">
          <p>Summer'25</p>
          <h2>New Arrivals</h2>
        </div>

        <Link
          to="/collections/new-arrivals"
          className="new-arrivals-shop"
        >
          <span>Shop Now</span>

          <svg
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shop-now-arrow"
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
      <div className="new-arrivals-slider-area">

        <div
          className="new-arrivals-slider"
          ref={sliderRef}
        >
          {sortedProducts.map((product) => (
            <Link
              to={`/products/${product.handle}`}
              state={{ product }}
              className="new-arrival-card"
              key={product.id}
            >
              <div className="new-arrival-image">
                <img
                  src={product.image}
                  alt={product.title}
                />
              </div>

              <div className="new-arrival-overlay">
                <h4>{product.title}</h4>
              </div>
            </Link>
          ))}
        </div>

        {/* ARROWS */}
        <div className="new-arrivals-arrows">

          <button
            type="button"
            className={`new-arrivals-arrow new-arrivals-arrow-left ${
              !canScrollLeft ? "is-disabled" : ""
            }`}
            onClick={() => scrollSlider("left")}
            disabled={!canScrollLeft}
            aria-label="Previous products"
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

          <button
            type="button"
            className={`new-arrivals-arrow new-arrivals-arrow-right ${
              !canScrollRight ? "is-disabled" : ""
            }`}
            onClick={() => scrollSlider("right")}
            disabled={!canScrollRight}
            aria-label="Next products"
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
      </div>
    </section>
  );
};

export default NewArrivals;

