import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import "../Collections/Collections.css";

import {
  getAllProducts,
} from "../../api/productsApi";

const PRODUCTS_PER_PAGE = 12;


function Products() {

  // ========================================
  // States
  // ========================================

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [sortBy, setSortBy] =
    useState("best-selling");


  // ========================================
  // Fetch All Products
  // ========================================

  useEffect(() => {

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });


    const fetchProducts = async () => {

      try {

        setLoading(true);

        setError("");


        const data =
          await getAllProducts();


        setProducts(
          Array.isArray(data)
            ? data
            : []
        );

        setCurrentPage(1);

      } catch (error) {

        console.error(
          "Products error:",
          error
        );

        setError(
          "Unable to load products."
        );

      } finally {

        setLoading(false);

      }

    };


    fetchProducts();

  }, []);


  // ========================================
  // Sort Products
  // ========================================

  const sortedProducts = useMemo(() => {

    const result = [...products];


    switch (sortBy) {

      case "title-ascending":

        return result.sort(
          (a, b) =>
            a.title.localeCompare(
              b.title
            )
        );


      case "title-descending":

        return result.sort(
          (a, b) =>
            b.title.localeCompare(
              a.title
            )
        );


      case "price-ascending":

        return result.sort(
          (a, b) =>
            a.price - b.price
        );


      case "price-descending":

        return result.sort(
          (a, b) =>
            b.price - a.price
        );


      case "created-ascending":

        return result.sort(
          (a, b) =>
            new Date(a.createdAt) -
            new Date(b.createdAt)
        );


      case "created-descending":

        return result.sort(
          (a, b) =>
            new Date(b.createdAt) -
            new Date(a.createdAt)
        );


      case "most-relevant":

        return result;


      case "best-selling":

        return result;


      case "manual":

      default:

        return result;
    }

  }, [products, sortBy]);


  // ========================================
  // Pagination
  // ========================================

  const totalPages = Math.ceil(
    sortedProducts.length /
      PRODUCTS_PER_PAGE
  );


  const currentProducts =
    sortedProducts.slice(
      (currentPage - 1) *
        PRODUCTS_PER_PAGE,

      currentPage *
        PRODUCTS_PER_PAGE
    );


  // ========================================
  // Sort Change
  // ========================================

  const handleSortChange = (
    event
  ) => {

    setSortBy(
      event.target.value
    );

    setCurrentPage(1);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };


  // ========================================
  // Page Change
  // ========================================

  const handlePageChange = (
    page
  ) => {

    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };


  // ========================================
  // Render
  // ========================================

  return (

    <main className="collection-page">


      {/* =========================
          PRODUCTS HEADER
      ========================= */}

      <section className="collection-header">

        <h1>
          Products
        </h1>

      </section>


      {/* =========================
          TOOLBAR
      ========================= */}

      <section className="collection-toolbar">


        <div className="collection-results">

          {loading
            ? "Loading..."
            : `${products.length} Results`}

        </div>


        <div className="collection-sort">

          <span>
            Sort By:
          </span>


          <select
            name="sort_by"
            className="collection-sort-select"
            id="SortBy"
            value={sortBy}
            onChange={
              handleSortChange
            }
          >

            <option value="manual">
              Featured
            </option>


            <option value="most-relevant">
              Most relevant
            </option>


            <option value="best-selling">
              Best selling
            </option>


            <option value="title-ascending">
              Alphabetically, A-Z
            </option>


            <option value="title-descending">
              Alphabetically, Z-A
            </option>


            <option value="price-ascending">
              Price, low to high
            </option>


            <option value="price-descending">
              Price, high to low
            </option>


            <option value="created-ascending">
              Date, old to new
            </option>


            <option value="created-descending">
              Date, new to old
            </option>

          </select>

        </div>

      </section>


      {/* =========================
          LOADING
      ========================= */}

      {loading && (

        <div className="collection-loading">

          <p>
            Loading products...
          </p>

        </div>

      )}


      {/* =========================
          ERROR
      ========================= */}

      {!loading && error && (

        <div className="collection-empty">

          <p>
            {error}
          </p>

        </div>

      )}


      {/* =========================
          PRODUCTS
      ========================= */}

      {!loading &&
        !error && (

          <>


            <section className="collection-products">

              {currentProducts.map(
                (product) => (

                  <article
                    className="collection-product-card"
                    key={product.id}
                  >

                    <Link
                      to={`/products/${product.handle}`}
                      state={{ product }}
                      className="collection-product-link"
                    >

                      {/* =========================
                          PRODUCT IMAGE
                      ========================= */}

                      <div className="collection-product-image">

                        <div className="product-overlay-info">

                          <span>

                            {product.vendor ||
                              "Shewekar"}

                            {product.tags?.[0]
                              ? ` / ${product.tags[0]}`
                              : ""}

                          </span>

                        </div>


                        {/* Main Image */}

                        {product.image && (

                          <img
                            src={product.image}
                            alt={product.title}
                            loading="lazy"
                            className="product-image-main"
                          />

                        )}


                        {/* Hover Image */}

                        {product.images?.[1] && (

                          <img
                            src={
                              product.images[1]
                            }
                            alt={
                              product.title
                            }
                            loading="lazy"
                            className="product-image-hover"
                          />

                        )}

                      </div>


                      {/* =========================
                          PRODUCT NAME
                      ========================= */}

                      <div className="collection-product-info">

                        <h2>
                          {product.title}
                        </h2>

                      </div>

                    </Link>

                  </article>

                )
              )}

            </section>


            {/* =========================
                PAGINATION
            ========================= */}

            {totalPages > 1 && (

              <nav
                className="collection-pagination"
                aria-label="Pagination"
              >

                {Array.from(
                  {
                    length:
                      totalPages,
                  },
                  (_, index) =>
                    index + 1
                ).map((page) => (

                  <button
                    type="button"
                    key={page}
                    className={
                      currentPage ===
                      page
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      handlePageChange(
                        page
                      )
                    }
                  >

                    {page}

                  </button>

                ))}


                {currentPage <
                  totalPages && (

                  <button
                    type="button"
                    className="pagination-next"
                    aria-label="Next page"
                    onClick={() =>
                      handlePageChange(
                        currentPage + 1
                      )
                    }
                  >

                    <span className="arrow-icon"></span>

                  </button>

                )}

              </nav>

            )}

          </>

        )}

    </main>

  );

}


export default Products;