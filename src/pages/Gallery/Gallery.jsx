import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Gallery.css";

const designs = [
  {
    id: 1,
    title: "Back Sofa Tables",
    link: "/collections/back-sofa-tables",
    image:
      "https://shewekar.com/cdn/shop/files/For-The-Love-of-Patterns-Back-Sofa-Table-Detail-scaled.jpg?v=1716314366&width=1920",
    hoverImage:
      "https://shewekar.com/cdn/shop/files/For-The-Love-of-Patterns-Back-Sofa-Table-Detail-scaled.jpg?v=1716314366&width=1920",
  },

  {
    id: 2,
    title: "Sofas & Benches",
    link: "/collections/sofas-benches",
    image:
      "https://shewekar.com/cdn/shop/files/Archway_Sofa_Angle.jpg?v=1726991494&width=1920",
    hoverImage:
      "https://shewekar.com/cdn/shop/files/Archway_Sofa_Angle.jpg?v=1726991494&width=1920",
  },

  {
    id: 3,
    title: "Cabinets",
    link: "/collections/cabinets",
    image:
      "https://shewekar.com/cdn/shop/files/For_The_Love_of_Flowers_Chest_of_Drawers.jpg?v=1718030093&width=1920",
    hoverImage:
      "https://shewekar.com/cdn/shop/collections/For_The_Love_of_Flowers_Chest_of_Drawers.jpg?v=1721212162&width=1920",
  },

  {
    id: 4,
    title: "Chairs & Stools",
    link: "/collections/chairs",
    image:
      "https://shewekar.com/cdn/shop/files/Fairy_Wings_Armchair.jpg?v=1726991718&width=1920",
    hoverImage:
      "https://shewekar.com/cdn/shop/files/Fairy_Wings_Armchair.jpg?v=1726991718&width=1920",
  },

  {
    id: 5,
    title: "Coffee Tables",
    link: "/collections/coffee-tables",
    image:
      "https://shewekar.com/cdn/shop/files/Sisters_Coffee_Table_Three_Together_2.jpg?v=1727016282&width=1920",
    hoverImage:
      "https://shewekar.com/cdn/shop/files/Sisters_Coffee_Table_Three_Together_2.jpg?v=1727016282&width=1920",
  },

  {
    id: 6,
    title: "Consoles",
    link: "/collections/consoles",
    image:
      "https://shewekar.com/cdn/shop/files/Intertwined_Console_Resized_jpg.png?v=1727005335&width=1920",
    hoverImage:
      "https://shewekar.com/cdn/shop/files/Intertwined_Console_Resized_jpg.png?v=1727005335&width=1920",
  },

  {
    id: 7,
    title: "Dining Rooms",
    link: "/collections/dining-rooms",
    image:
      "https://shewekar.com/cdn/shop/files/Divine_Dining_Table.jpg?v=1726991680&width=1920",
    hoverImage:
      "https://shewekar.com/cdn/shop/files/Divine_Dining_Table.jpg?v=1726991680&width=1920",
  },

  {
    id: 8,
    title: "Lighting, Candles & Tableware",
    link: "/collections/lighting-candles-tableware",
    image:
      "https://shewekar.com/cdn/shop/files/Tassel_Lighting_Red_Large_efe4846a-0efb-4b80-98e5-97e02aa16b20.jpg?v=1726992198&width=1920",
    hoverImage:
      "https://shewekar.com/cdn/shop/files/Tassel_Lighting_Red_Large_efe4846a-0efb-4b80-98e5-97e02aa16b20.jpg?v=1726992198&width=1920",
  },

  {
    id: 9,
    title: "Mirrors",
    link: "/collections/mirrors",
    image:
      "https://shewekar.com/cdn/shop/files/Center_of_the_Universe.png?v=1721222117&width=1920",
    hoverImage:
      "https://shewekar.com/cdn/shop/files/Center_of_the_Universe.png?v=1721222117&width=1920",
  },

  {
    id: 10,
    title: "New Arrivals",
    link: "/collections/new-arrivals",
    image:
      "https://shewekar.com/cdn/shop/files/Both_without_Lid_Lit.jpg?v=1726991551&width=1920",
    hoverImage:
      "https://shewekar.com/cdn/shop/files/Both_without_Lid_Lit.jpg?v=1726991551&width=1920",
  },

  // =========================
  // Remaining items
  // =========================

  {
    id: 11,
    title: "Outdoors Collection",
    link: "/collections/outdoors-collection",
    image:
      "https://shewekar.com/cdn/shop/files/Swing_Me_Sofa.jpg?v=1726992162&width=2667",
    hoverImage:
      "https://shewekar.com/cdn/shop/files/Swing_Me_Sofa.jpg?v=1726992162&width=1920",
  },

  {
    id: 12,
    title: "Rugs",
    link: "/collections/rugs",
    image:
      "https://shewekar.com/cdn/shop/files/Blue_Blossom.png?v=1721221977&width=2524",
    hoverImage:
      "https://shewekar.com/cdn/shop/files/Blue_Blossom.png?v=1721221977&width=1920",
  },

  {
    id: 13,
    title: "Seating",
    link: "/collections/seating",
    image:
      "https://shewekar.com/cdn/shop/files/Sleek_Black_Chair_Resized_jpg.png?v=1727005380&width=4000",
    hoverImage:
      "https://shewekar.com/cdn/shop/files/Sleek_Black_Chair_Resized_jpg.png?v=1727005380&width=1920",
  },

  {
    id: 14,
    title: "Side Tables",
    link: "/collections/side-tables",
    image:
      "https://shewekar.com/cdn/shop/files/Funky-Fusion-Orange-scaled.jpg?v=1721224361&width=2560",
    hoverImage:
      "https://shewekar.com/cdn/shop/files/Funky-Fusion-Orange-scaled.jpg?v=1721224361&width=1920",
  },

  {
    id: 15,
    title: "Bedrooms",
    link: "/collections/bedrooms",
    image:
      "https://shewekar.com/cdn/shop/files/Untitled-1_f201226e-1524-4d26-9194-2892c710ec5a.png?v=1727013671&width=4000",
    hoverImage:
      "https://shewekar.com/cdn/shop/files/Untitled-1_f201226e-1524-4d26-9194-2892c710ec5a.png?v=1727013671&width=1920",
  },

  {
    id: 16,
    title: "TV Units",
    link: "/collections/tv-units",
    image:
      "https://shewekar.com/cdn/shop/files/Cool_Palm_Resized.png?v=1727005619&width=2524",
    hoverImage:
      "https://shewekar.com/cdn/shop/files/Cool_Palm_Resized.png?v=1727005619&width=1920",
  },
];

function GalleryCard({ design, className = "" }) {
  return (
    <article className={`gallery-card ${className}`}>
      <Link to={design.link} className="gallery-card-link">
        <div className="gallery-image-wrapper">
          <img
            src={design.image}
            alt={design.title}
            className="gallery-image gallery-image-main"
            loading="lazy"
          />

          <img
            src={design.hoverImage}
            alt=""
            className="gallery-image gallery-image-hover"
            loading="lazy"
          />

          <span className="gallery-overlay"></span>

          <p className="gallery-card-title">
            {design.title}
          </p>
        </div>
      </Link>
    </article>
  );
}

function Gallery() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);

  const firstGroup = designs.slice(0, 5);
  const secondGroup = designs.slice(5, 10);
  const thirdGroup = designs.slice(10, 15);
  const finalDesign = designs[15];

  return (
    <main className="gallery-page">
      <div className="gallery-container">

        {/* =========================
            INTRO
        ========================= */}

        <section className="gallery-intro">
          <p className="gallery-description">
            We ventured into furniture design to create timeless iconic
            pieces, which tell a story, integrate history and origin, and
            take nods from nature. These capsule collections are drawn and
            crafted by Egypt’s talented artisans. One-of-a-kind is the basis
            of all our creations, not adhering to trends but cultivating
            forward thinking design. Our collections all have a sensory
            element, which effortlessly enliven the rooms in which they are
            placed. They serve as a focal point to encourage conversation,
            to be passed down through generations; they act as the individual
            standouts that fill a home with meaning.
          </p>

          <h1 className="gallery-heading">
            Explore Our Designs
          </h1>
        </section>


        {/* =========================
            GROUP 1
        ========================= */}

        <section className="gallery-group gallery-group-normal">

          <GalleryCard
            design={firstGroup[0]}
            className="gallery-tall-left"
          />

          <GalleryCard
            design={firstGroup[1]}
            className="gallery-middle-top"
          />

          <GalleryCard
            design={firstGroup[2]}
            className="gallery-right-top"
          />

          <GalleryCard
            design={firstGroup[3]}
            className="gallery-middle-bottom"
          />

          <GalleryCard
            design={firstGroup[4]}
            className="gallery-right-bottom"
          />

        </section>


        {/* =========================
            GROUP 2 - REVERSED
        ========================= */}

        <section className="gallery-group gallery-group-reversed">

          <GalleryCard
            design={secondGroup[0]}
            className="gallery-left-top"
          />

          <GalleryCard
            design={secondGroup[1]}
            className="gallery-middle-top"
          />

          <GalleryCard
            design={secondGroup[2]}
            className="gallery-middle-bottom"
          />

          <GalleryCard
            design={secondGroup[3]}
            className="gallery-left-bottom"
          />

          <GalleryCard
            design={secondGroup[4]}
            className="gallery-tall-right"
          />

        </section>


        {/* =========================
            GROUP 3
        ========================= */}

        <section className="gallery-group gallery-group-normal">

          <GalleryCard
            design={thirdGroup[0]}
            className="gallery-tall-left"
          />

          <GalleryCard
            design={thirdGroup[1]}
            className="gallery-middle-top"
          />

          <GalleryCard
            design={thirdGroup[2]}
            className="gallery-right-top"
          />

          <GalleryCard
            design={thirdGroup[3]}
            className="gallery-middle-bottom"
          />

          <GalleryCard
            design={thirdGroup[4]}
            className="gallery-right-bottom"
          />

        </section>


        {/* =========================
            FINAL FULL WIDTH IMAGE
        ========================= */}

        <section className="gallery-final">
          <GalleryCard
            design={finalDesign}
            className="gallery-final-card"
          />
        </section>

      </div>
    </main>
  );
}

export default Gallery;