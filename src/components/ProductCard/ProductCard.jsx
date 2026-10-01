import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`}>
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-info">
          <p className="product-category">{product.category}</p>

          <h3>{product.name}</h3>

          <p className="product-price">
            {product.price.toLocaleString()} EGP
          </p>
        </div>
      </Link>
    </article>
  );
}

export default ProductCard;