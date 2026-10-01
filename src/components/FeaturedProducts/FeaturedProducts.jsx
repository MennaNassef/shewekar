import products from "../../data/products";
import ProductGrid from "../ProductGrid/ProductGrid";

function FeaturedProducts() {
  const featuredProducts = products.slice(0, 4);

  return (
    <section className="featured-products">
      <div className="section-header">
        <p>Our Selection</p>

        <h2>Featured Products</h2>
      </div>

      <ProductGrid products={featuredProducts} />
    </section>
  );
}

export default FeaturedProducts;