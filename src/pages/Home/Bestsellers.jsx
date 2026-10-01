import { Link } from "react-router-dom";
import "./Bestsellers.css";

const BESTSELLERS = [
  {
    handle: "andalucia-china-cabinet",
    title: "Andalucía",
    vendor: "Shewekar",
    category: "Cabinets",
    image:
      "https://shewekar.com/cdn/shop/files/Andalusia-China-Cabinet.png?v=1716399178&width=2525",
    hoverImage:
      "https://shewekar.com/cdn/shop/files/Andalusia-China-Cabinet-Detail.jpg?v=1716399178&width=1084",
  },
  {
    handle: "archway-sofa",
    title: "Archway Sofa",
    vendor: "Shewekar",
    category: "Layers of Life",
    image:
      "https://shewekar.com/cdn/shop/files/Velvet_Grove.jpg?v=1756539294&width=5760",
    hoverImage:
      "https://shewekar.com/cdn/shop/files/Archway-Sofa-Angle-scaled.jpg?v=1756539268&width=2560",
  },
  {
    handle: "opposites-attract",
    title: "Opposites Attract",
    vendor: "Shewekar",
    category: "Celebration of Life",
    image:
      "https://shewekar.com/cdn/shop/files/Opposites-Attract-Console-scaled.jpg?v=1716400859&width=2560",
    hoverImage:
      "https://shewekar.com/cdn/shop/files/Opposites-Attract-Console-Detail-2-scaled.jpg?v=1716400859&width=1991",
  },
  {
    handle: "sisters-coffee-table",
    title: "Sisters Coffee Table",
    vendor: "Shewekar",
    category: "Coffee Tables",
    image:
      "https://shewekar.com/cdn/shop/files/Burgundy_Balance_dbab2d7a-78b1-463c-b83f-a7622e66d410.jpg?v=1756536244&width=3840",
    hoverImage:
      "https://shewekar.com/cdn/shop/files/Sisters-Coffee-Table-scaled.jpg?v=1756535922&width=2560",
  },
  {
    handle: "center-of-universe",
    title: "Center of Universe",
    vendor: "Shewekar",
    category: "Celebration of Life",
    image:
      "https://shewekar.com/cdn/shop/files/Center_of_the_Universe.png?v=1721222117&width=2524",
    hoverImage:
      "https://shewekar.com/cdn/shop/files/010-scaled.jpg?v=1721222135&width=2201",
  },
  {
    handle: "dancing-lotus-2",
    title: "Dancing Lotus",
    vendor: "Shewekar",
    category: "Layers of Life",
    image:
      "https://shewekar.com/cdn/shop/files/H65745_1-scaled.jpg?v=1716399814&width=2560",
    hoverImage:
      "https://shewekar.com/cdn/shop/files/Close-Up-with-Lid.jpg?v=1716399814&width=2538",
  },
];

function Bestsellers() {
  return (
    <section className="bestsellers">
      <div className="bestsellers-header">
        <h2>Bestsellers</h2>

        <Link
          to="/gallery"
          className="bestsellers-shop-link bestsellers-shop-desktop"
        >
          Shop Bestsellers
        </Link>
      </div>

      <div className="bestsellers-grid">
        {BESTSELLERS.map((product) => (
          <Link
            key={product.handle}
            to={`/products/${product.handle}`}
            state={{ product }}
            className="bestseller-card"
          >
            <div className="bestseller-image">
              <img
                src={product.image}
                alt={product.title}
                className="bestseller-image-main"
                loading="lazy"
              />

              <img
                src={product.hoverImage}
                alt={product.title}
                className="bestseller-image-hover"
                loading="lazy"
              />
            </div>

            <div className="bestseller-info">
              <div className="bestseller-meta">
                <span>{product.vendor}</span>
                <span>{product.category}</span>
              </div>

              <h3>{product.title}</h3>
            </div>
          </Link>
        ))}
      </div>

      <Link
        to="/collections/all"
        className="bestsellers-shop-link bestsellers-shop-mobile"
      >
        Shop Bestsellers
      </Link>
    </section>
  );
}

export default Bestsellers;