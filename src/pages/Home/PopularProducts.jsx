import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import {
  getAllProducts,
} from "../../api/productsApi";

import "./PopularProducts.css";


const POPULAR_HANDLES = [
  "for-the-love-of-flowers-china-cabinet",
  "tassel",
  "nile-blossom",
  "intertwined",
  "gala",
  "shewekars-dining-table",
];


function PopularProducts() {

  const [products, setProducts] = useState([]);


  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const data = await getAllProducts();

        const popularProducts =
          POPULAR_HANDLES
            .map((handle) =>
              data.find(
                (product) =>
                  product.handle === handle
              )
            )
            .filter(Boolean);

        setProducts(popularProducts);

      } catch (error) {

        console.error(
          "Popular products error:",
          error
        );

      }

    };

    fetchProducts();

  }, []);


  return (
    <section className="popular-products">

      {/* =========================
          HEADER
      ========================= */}

      <div className="popular-products-header">

        <h2>
          Popular Products
        </h2>

        {/* Desktop Button */}
        <Link
          to="/collections/all"
          className="popular-products-shop-link popular-products-shop-desktop"
        >
          Shop now
        </Link>

      </div>


      {/* =========================
          PRODUCTS
      ========================= */}

      <div className="popular-products-grid">

        {products.map((product) => (

          <Link
            key={product.id}
            to={`/products/${product.handle}`}
            state={{ product }}
            className="popular-product-card"
          >

            <div className="popular-product-image">

              {product.image && (
                <img
                  src={product.image}
                  alt={product.title}
                  className="popular-product-image-main"
                  loading="lazy"
                />
              )}

              {product.images?.[1] && (
                <img
                  src={product.images[1]}
                  alt={product.title}
                  className="popular-product-image-hover"
                  loading="lazy"
                />
              )}

            </div>


            <div className="popular-product-info">

              <div className="popular-product-meta">

                <span>
                  {product.vendor || "Shewekar"}
                </span>

                {(product.type ||
                  product.product_type ||
                  product.tags?.[0]) && (
                  <span>
                    {product.type ||
                      product.product_type ||
                      product.tags?.[0]}
                  </span>
                )}

              </div>

              <h3>
                {product.title}
              </h3>

            </div>

          </Link>

        ))}

      </div>


      {/* =========================
          MOBILE BUTTON
      ========================= */}

      <Link
        to="/collections/all"
        className="popular-products-shop-link popular-products-shop-mobile"
      >
        Shop now
      </Link>

    </section>
  );
}


export default PopularProducts;