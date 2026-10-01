import products from "../../data/products";
import ProductGrid from "../../components/ProductGrid/ProductGrid";

function Shop() {
  return (
    <section className="shop-page">
      <div className="shop-header">
        <p>Discover Our Collection</p>

        <h1>Shop</h1>

        <p>
          Explore our selection of furniture and pieces designed
          to bring character and elegance to your space.
        </p>
      </div>

      <ProductGrid products={products} />
    </section>
  );
}

export default Shop;