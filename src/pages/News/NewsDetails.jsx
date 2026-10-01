
import { Link, useParams } from "react-router-dom";
import "./NewsDetails.css";
import HomeShewekarNews from "../Home/HomeShewekarNews";
import { useEffect, useState } from "react";
const newsItems = [
  {
    id: 1,
    slug: "winning-at-the-international-design-architecture-awards-london-2022",
    title:
      "Winning at The International Design & Architecture Awards - London 2022",
    date: "Oct 23, 2022",
    updated: "May 21, 2024",
    author: "Salma El Nashar",
    image:
      "https://images.pexels.com/photos/8089161/pexels-photo-8089161.jpeg?auto=compress&cs=tinysrgb&w=1600",
    content:
      "Shewekar celebrates an important achievement at The International Design & Architecture Awards in London, highlighting the brand’s passion for creating distinctive furniture and contemporary spaces.",
  },

  {
    id: 2,
    slug: "the-design-show-2022-here-we-come",
    title: "The Design Show 2022 - Here We Come",
    date: "Oct 23, 2022",
    updated: "May 21, 2024",
    author: "Salma El Nashar",
    image:
      "https://images.pexels.com/photos/7534563/pexels-photo-7534563.jpeg?auto=compress&cs=tinysrgb&w=1600",
    content:
      "It was a great pleasure to be part of TDS this year and to exhibit our latest collection Celestial among our fellow designers in Egypt and the Middle East. Special thanks go to our collaborators Sigma Contractors and Arabesque Line.",
  },

  {
    id: 3,
    slug: "venturing-onto-rugs",
    title: "Venturing Onto Rugs",
    date: "Oct 23, 2022",
    updated: "May 21, 2024",
    author: "Salma El Nashar",
    image:
      "https://images.pexels.com/photos/19064708/pexels-photo-19064708.jpeg?auto=compress&cs=tinysrgb&w=1600",
    content:
      "Shewekar explores a new direction in contemporary interiors by introducing rugs that bring texture, character and warmth into carefully designed spaces.",
  },

  {
    id: 4,
    slug: "honorary-award-at-cda-2021",
    title: "Honorary Award at CDA 2021",
    date: "Oct 23, 2022",
    updated: "May 21, 2024",
    author: "Salma El Nashar",
    image:
      "https://images.pexels.com/photos/26886880/pexels-photo-26886880.jpeg?auto=compress&cs=tinysrgb&w=1600",
    content:
      "Receiving an honorary award at CDA 2021 marked another memorable moment for Shewekar and celebrated the creativity and craftsmanship behind its design work.",
  },

  {
    id: 5,
    slug: "londons-top-drawer-2019",
    title: "London’s Top Drawer 2019",
    date: "Jan 10, 2019",
    updated: "May 21, 2024",
    author: "Salma El Nashar",
    image:
      "https://images.pexels.com/photos/7545776/pexels-photo-7545776.jpeg?auto=compress&cs=tinysrgb&w=1600",
    content:
      "Shewekar took part in London’s Top Drawer 2019, presenting its distinctive approach to furniture and design to an international audience.",
  },

  {
    id: 6,
    slug: "shewekar-launch-event-at-alismaelias-kodak-space-2019",
    title: "Shewekar Launch Event at Alismaelia’s Kodak Space 2019",
    date: "Jun 6, 2016",
    updated: "May 21, 2024",
    author: "Salma El Nashar",
    image:
      "https://images.pexels.com/photos/26729545/pexels-photo-26729545.jpeg?auto=compress&cs=tinysrgb&w=1600",
    content:
      "The Shewekar launch event at Alismaelia’s Kodak Space brought together design, culture and craftsmanship in an inspiring setting dedicated to contemporary Egyptian design.",
  },

  {
    id: 7,
    slug: "a-new-perspective-on-modern-furniture",
    title: "A New Perspective on Modern Furniture",
    date: "Sep 12, 2026",
    updated: "Sep 12, 2026",
    author: "Shewekar",
    image:
      "https://images.pexels.com/photos/20035979/pexels-photo-20035979.jpeg?auto=compress&cs=tinysrgb&w=1600",
    content:
      "A new perspective on modern furniture explores how thoughtful forms, natural materials and contemporary details can create pieces that feel both distinctive and timeless.",
  },

  {
    id: 8,
    slug: "contemporary-design-and-timeless-spaces",
    title: "Contemporary Design and Timeless Spaces",
    date: "Sep 20, 2026",
    updated: "Sep 20, 2026",
    author: "Shewekar",
    image:
      "https://images.pexels.com/photos/7045829/pexels-photo-7045829.jpeg?auto=compress&cs=tinysrgb&w=1600",
    content:
      "Contemporary interiors can combine modern design with timeless character, creating spaces that remain elegant while reflecting the personality of the people who use them.",
  },
];

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M18.9 2H22l-6.77 7.74L23.2 22h-6.24l-4.89-6.39L6.48 22H3.37l7.24-8.28L2.8 2h6.4l4.42 5.84L18.9 2Zm-1.09 17.9h1.73L8.25 4h-1.8l11.36 15.9Z"
        fill="currentColor"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path
        d="M16 2.7C8.65 2.7 2.7 8.65 2.7 16c0 6.62 4.83 12.12 11.16 13.17v-9.32h-3.38V16h3.38v-2.94c0-3.34 1.99-5.18 5.04-5.18 1.46 0 2.99.26 2.99.26v3.28h-1.68c-1.66 0-2.17 1.03-2.17 2.08V16h3.7l-.59 3.85h-3.11v9.32C24.47 28.12 29.3 22.62 29.3 16 29.3 8.65 23.35 2.7 16 2.7Z"
        fill="currentColor"
      />
    </svg>
  );
}

function PinterestIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path
        d="M16 2.7C8.67 2.7 2.7 8.67 2.7 16c0 5.63 3.5 10.44 8.44 12.4-.12-1.05-.02-2.37.26-3.48l1.92-8.13s-.48-.97-.48-2.4c0-2.25 1.31-3.93 2.94-3.93 1.39 0 2.06 1.04 2.06 2.29 0 1.39-.89 3.47-1.35 5.4-.39 1.62.81 2.94 2.4 2.94 2.88 0 5.1-3.04 5.1-7.43 0-3.88-2.79-6.6-6.78-6.6-4.62 0-7.33 3.47-7.33 7.06 0 1.4.54 2.91 1.21 3.73.13.16.15.3.11.47l-.45 1.84c-.07.3-.24.36-.55.22-2.05-.95-3.33-3.94-3.33-6.34 0-5.15 3.74-9.88 10.78-9.88 5.66 0 10.06 4.04 10.06 9.44 0 5.63-3.55 10.16-8.48 10.16-1.66 0-3.22-.86-3.76-1.87l-1.02 3.89c-.37 1.42-1.36 3.2-2.03 4.29.91.28 1.86.43 2.84.43 7.33 0 13.3-5.97 13.3-13.3S23.33 2.7 16 2.7Z"
        fill="currentColor"
      />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path
        d="M10 13.5 7 16.5c-2.2 2.2-2.2 5.8 0 8 2.2 2.2 5.8 2.2 8 0l3-3M22 18.5l3-3c2.2-2.2 2.2-5.8 0-8-2.2-2.2-5.8-2.2-8 0l-3 3M11.5 20.5l9-9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function NewsDetails() {
  const { slug } = useParams();
  const [copied, setCopied] = useState(false);

  const news = newsItems.find((item) => item.slug === slug);

  if (!news) {
    return (
      <div className="news-not-found">
        <h1>News Not Found</h1>
        <Link to="/news">Back to News</Link>
      </div>
    );
  }

  const currentUrl = `${window.location.origin}/news/${news.slug}`;

  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    currentUrl
  )}&text=${encodeURIComponent(news.title)}`;

  const facebookUrl = `https://www.facebook.com/sharer.php?u=${encodeURIComponent(
    currentUrl
  )}`;

  const pinterestUrl = `https://pinterest.com/pin/create/bookmarklet/?media=${encodeURIComponent(
    news.image
  )}&url=${encodeURIComponent(currentUrl)}&description=${encodeURIComponent(
    news.title
  )}`;

  const handleCopy = async (e) => {
    e.preventDefault();

    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch (error) {
      console.error("Could not copy link:", error);
    }
  };


  useEffect(() => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "auto",
  });
}, [slug]);
  return (
    <main className="news-details">

      {/* ================= HERO ================= */}
      <section className="news-details-hero">
        <img
          src={news.image}
          alt={news.title}
          className="news-details-hero-image"
        />

        <div className="news-details-hero-overlay">
          <div className="news-details-hero-info">
            <span className="news-details-hero-date">
              {news.date}
            </span>

            <h1>{news.title}</h1>
          </div>
        </div>
      </section>

      {/* ================= ARTICLE CONTENT ================= */}
      <section className="news-details-article">

        <div className="news-details-content-container">

          {/* SHARE COLUMN */}
          <aside className="news-details-share">

            <div className="news-details-share-label">
              Share:
            </div>

            <ul className="news-share-buttons">

              <li>
                <a
                  href={twitterUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Share on X"
                >
                  <TwitterIcon />
                </a>
              </li>

              <li>
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Share on Facebook"
                >
                  <FacebookIcon />
                </a>
              </li>

              <li>
                <a
                  href={pinterestUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Share on Pinterest"
                >
                  <PinterestIcon />
                </a>
              </li>

              <li>
                <a
                  href={currentUrl}
                  onClick={handleCopy}
                  aria-label="Copy article link"
                  className={copied ? "is-copied" : ""}
                >
                  <CopyIcon />
                </a>
              </li>

            </ul>

            {copied && (
              <span className="news-copy-message">
                Link copied
              </span>
            )}

          </aside>

          {/* ARTICLE COLUMN */}
          <article className="news-details-article-main">

            <div className="news-details-text">
              <p>{news.content}</p>
            </div>

            <footer className="news-details-meta">

              <div className="news-details-author">
                <span>by</span>
                <span>{news.author}</span>
              </div>

              <div className="news-details-dates">

                <span>
                  Updated:
                  <time>{news.updated}</time>
                </span>

                <span>
                  Published:
                  <time>{news.date}</time>
                </span>

              </div>

            </footer>

          </article>

        </div>

      </section>

      {/* ================= LATEST ARTICLES ================= */}
      <HomeShewekarNews isDetailsPage />

    </main>
  );
}

export default NewsDetails;