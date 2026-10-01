import React from 'react'
import { useState } from "react";
import { Link } from "react-router-dom";
import "./HomeCollection.css";
const collections = [
  {
    id: "layers",
    title: "Layers of Life",
    description: "Unfolding infinite layers",
    image:
      "https://shewekar.com/cdn/shop/files/08-scaled_0031c02d-86fa-4094-b257-300398f754e8.jpg?v=1716365760&width=2084",
    link: "/collections/layers-of-life",
  },
  {
    id: "celestial-collection",
    title: "Celestial Collection",
    description:
      "We need to strive for more refined standards and elevate our senses to loftier heights",
    image:
      "https://shewekar.com/cdn/shop/files/07-scaled_4fd68593-622a-493c-a7a5-2fe59964b2d1.jpg?v=1716467593&width=2560",
    link: "/collections/celestial-collection",
  },
  {
    id: "celebration",
    title: "Celebration of Life",
    description: "Values once hidden now came to the forefront",
    image:
      "https://shewekar.com/cdn/shop/files/Take-Tu-Tu-Tango-Coffee-Table-Top-scaled_b3c56b4f-c29a-42a4-960a-da20412c5f53.jpg?v=1716471398&width=2560",
    link: "/collections/celebration-of-life",
  },
];

export default function CollectionsSection() {
  // Middle image is active initially
    const [activeCollection, setActiveCollection] = useState(1);
  
    const handleActivate = (index) => {
      setActiveCollection(index);
    };
  
  
    return (
    <>
    {/* =========================
          INTRO
      ========================= */}
      <section className="home-intro">
        <div className="home-intro-content">
          <p className="section-label"></p>

          <p className="home-intro-text">
            We built our design philosophy at Shewekar on a rooted and intrinsic appreciation for our heritage. For twenty years our Cairo based studio has connected and found the synergy between contemporary aesthetics, forward thinking functionality and the revival of Egyptian artisanship.
          </p>

          <p className="home-intro-text">
            Our award-winning studio is focused on both interiors and furniture
            design; we interweave origin and purpose to build narrative spaces,
            to be visual storytellers. Egyptian craft is what inspires us but
            also what we seek to share with the world, it is our love letter
            transcribed in design.
          </p>
        </div>
      </section>

      {/* =========================
          COLLECTIONS
      ========================= */}
      <section className="home-collections">
        <div className="collections-track">
          {collections.map((collection, index) => {
            const isActive = activeCollection === index;

            return (
              <article
                key={collection.id}
                className={`home-collection-card ${isActive ? "is-active" : ""
                  }`}
                onMouseEnter={() => handleActivate(index)}
              >
                <Link
                  to={collection.link}
                  className="collection-card-link"
                  aria-label={`View ${collection.title}`}
                >
                  <img
                    src={collection.image}
                    alt={collection.title}
                    className="collection-image"
                  />

                  <div className="collection-overlay" />

                  <div className="collection-content">
                    <span className="collection-label">
                      Collection
                    </span>

                    <h2>{collection.title}</h2>

                    <p>{collection.description}</p>

                    <span className="collection-button">
                      Shop now
                    </span>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </section>
    
    
    </>
  )
}
