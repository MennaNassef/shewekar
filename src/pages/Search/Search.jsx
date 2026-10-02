
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { getAllProducts } from "../../api/productsApi";
import collections from "../../data/collections";
import projects from "../../data/projects.json";

import "./Search.css";


/* =========================
   STATIC PAGES
========================= */

const pages = [
  {
    id: "home",
    title: "Home",
    description:
      "Discover Shewekar furniture, collections, interior design and projects.",
    url: "/",
    type: "Page",
  },

  {
    id: "shop",
    title: "Shop",
    description:
      "Explore Shewekar furniture and design pieces.",
    url: "/shop",
    type: "Page",
  },

  {
    id: "collections",
    title: "Collections",
    description:
      "Explore Shewekar's collections and unique designs.",
    url: "/collections",
    type: "Page",
  },

  {
    id: "commercial",
    title: "Commercial",
    description:
      "Explore Shewekar commercial interior design projects.",
    url: "/commercial",
    type: "Page",
  },

  {
    id: "residential",
    title: "Residential",
    description:
      "Explore Shewekar residential interior design projects.",
    url: "/residential",
    type: "Page",
  },

  {
    id: "gallery",
    title: "Gallery",
    description:
      "Explore Shewekar's design gallery.",
    url: "/gallery",
    type: "Page",
  },

  {
    id: "interior-design",
    title: "Interior Design",
    description:
      "Discover Shewekar interior design services and projects.",
    url: "/interior-design",
    type: "Page",
  },

  {
    id: "news",
    title: "News",
    description:
      "Latest Shewekar news and design stories.",
    url: "/news",
    type: "Page",
  },

  {
    id: "about",
    title: "About",
    description:
      "Learn more about Shewekar and its design philosophy.",
    url: "/about",
    type: "Page",
  },

  {
    id: "contact",
    title: "Contact",
    description:
      "Get in touch with Shewekar.",
    url: "/contact",
    type: "Page",
  },
];


function Search({ onClose }) {

  const [searchValue, setSearchValue] = useState("");

  const [products, setProducts] = useState([]);


  /* =========================
     LOAD PRODUCTS FROM API
  ========================= */

  useEffect(() => {

    const loadProducts = async () => {

      try {

        const data = await getAllProducts();

        console.log(
          "Search API products:",
          data
        );

        setProducts(data);

      } catch (error) {

        console.error(
          "Search products error:",
          error
        );

        setProducts([]);

      }

    };

    loadProducts();

  }, []);


  /* =========================
     BODY SCROLL LOCK
  ========================= */

  useEffect(() => {

    const hasText =
      searchValue.trim().length > 0;

    /*
      Before typing:
      lock page scrolling.

      After typing:
      keep the main page fixed,
      and allow scrolling inside search overlay.
    */

    if (!hasText) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "";
    };

  }, [searchValue]);


  /* =========================
     SEARCH DATA
  ========================= */

  const searchData = useMemo(() => {

    return [

      /* =========================
         PRODUCTS
      ========================= */

      ...products.map((product) => ({

        id:
          `product-${product.id}`,

        type:
          "Product",

        title:
          product.title,

        description:
          product.type ||
          product.product_type ||
          "",

        image:
          product.image,

        price:
          product.price,

        /*
          IMPORTANT:
          Use the real Shopify handle
          from the API.
        */

        url:
          `/products/${product.handle}`,

        searchText: `
          ${product.title || ""}
          ${product.type || ""}
          ${product.product_type || ""}
          ${product.tags?.join(" ") || ""}
          ${product.price || ""}
        `.toLowerCase(),

      })),


      /* =========================
         COLLECTIONS
      ========================= */

      ...collections.map((collection) => ({

        id:
          `collection-${collection.id}`,

        type:
          "Collection",

        title:
          collection.name,

        description:
          collection.description,

        image:
          collection.image,

        url:
          `/collections/${collection.name
            .toLowerCase()
            .replace(/\s+/g, "-")}`,

        searchText: `
          ${collection.name}
          ${collection.description}
        `.toLowerCase(),

      })),


      /* =========================
         PROJECTS
      ========================= */

      ...Object.entries(projects)
        .filter(
          ([key]) =>
            key !== "_meta"
        )
        .map(
          ([slug, project]) => ({

            id:
              `project-${slug}`,

            type:
              "Project",

            title:
              project.title,

            description:
              project.description,

            image:
              project.heroImage ||
              project.images?.find(
                (image) =>
                  image.isHero
              )?.url ||
              project.images?.[0]?.url,

            url:
              `/projects/${slug}`,

            searchText: `
              ${project.title || ""}
              ${project.location || ""}
              ${project.client || ""}
              ${project.projectDate || ""}
              ${project.description || ""}
            `.toLowerCase(),

          })
        ),


      /* =========================
         PAGES
      ========================= */

      ...pages.map((page) => ({

        id:
          page.id,

        type:
          page.type,

        title:
          page.title,

        description:
          page.description,

        url:
          page.url,

        searchText: `
          ${page.title}
          ${page.description}
        `.toLowerCase(),

      })),

    ];

  }, [products]);


  /* =========================
     LIVE SEARCH
  ========================= */

  const results = useMemo(() => {

    const value =
      searchValue
        .trim()
        .toLowerCase();

    if (!value) {
      return [];
    }

    return searchData.filter(
      (item) =>
        item.searchText.includes(value)
    );

  }, [
    searchValue,
    searchData,
  ]);


  const hasSearched =
    searchValue.trim().length > 0;


  /* =========================
     PAGE CLASS
  ========================= */

  const pageClassName = `
    search-page
    ${hasSearched
      ? "search-page-active"
      : "search-page-idle"
    }
  `;


  return (
    <div className={pageClassName}>

      {/* =========================
          CLOSE
      ========================= */}

      <button
        type="button"
        className="search-close"
        onClick={onClose}
        aria-label="Close search"
      >
        ×
      </button>


      <div className="search-container">

        {/* =========================
            SEARCH HEADER
        ========================= */}

        <section className="search-header">

          {hasSearched && (
            <h1 className="search-results-heading">
              Search Results: {searchValue.trim()}
            </h1>
          )}


          <form
            className="search-form"
            onSubmit={(event) =>
              event.preventDefault()
            }
          >

            <input
              type="text"
              value={searchValue}
              onChange={(event) =>
                setSearchValue(
                  event.target.value
                )
              }
              placeholder="Search"
              aria-label="Search"
              autoFocus
            />

            <button type="submit">
              Search
            </button>

          </form>

        </section>


        {/* =========================
            RESULTS
        ========================= */}

        {hasSearched && (

          <section className="page-search-results">

            <p className="search-results-count">
              Showing {results.length}{" "}
              {results.length === 1
                ? "result"
                : "results"}.
            </p>


            {/* =========================
                PRODUCTS
            ========================= */}

            {results.filter(
              (item) =>
                item.type === "Product"
            ).length > 0 && (

              <div className="search-section">

                <h2 className="search-section-title">
                  Products
                </h2>


                <div className="search-results-grid">

                  {results
                    .filter(
                      (item) =>
                        item.type === "Product"
                    )
                    .map((item) => (

                      <Link
                        to={item.url}
                        className="search-result-card"
                        key={item.id}
                        onClick={onClose}
                      >

                        {item.image && (
                          <div className="search-result-image">

                            <img
                              src={item.image}
                              alt={item.title}
                            />

                          </div>
                        )}


                        <p className="search-result-type">
                          Product
                        </p>


                        <h3 className="search-result-title">
                          {item.title}
                        </h3>


                        {item.price && (
                          <p className="search-result-price">
                            {item.price.toLocaleString()} EGP
                          </p>
                        )}

                      </Link>

                    ))}

                </div>

              </div>
            )}


            {/* =========================
                COLLECTIONS
            ========================= */}

            {results.filter(
              (item) =>
                item.type === "Collection"
            ).length > 0 && (

              <div className="search-section">

                <h2 className="search-section-title">
                  Collections
                </h2>


                <div className="search-results-grid">

                  {results
                    .filter(
                      (item) =>
                        item.type === "Collection"
                    )
                    .map((item) => (

                      <Link
                        to={item.url}
                        className="search-result-card"
                        key={item.id}
                        onClick={onClose}
                      >

                        {item.image && (
                          <div className="search-result-image">

                            <img
                              src={item.image}
                              alt={item.title}
                            />

                          </div>
                        )}


                        <p className="search-result-type">
                          Collection
                        </p>


                        <h3 className="search-result-title">
                          {item.title}
                        </h3>

                      </Link>

                    ))}

                </div>

              </div>
            )}


            {/* =========================
                PROJECTS
            ========================= */}

            {results.filter(
              (item) =>
                item.type === "Project"
            ).length > 0 && (

              <div className="search-section">

                <h2 className="search-section-title">
                  Projects
                </h2>


                <div className="search-results-grid">

                  {results
                    .filter(
                      (item) =>
                        item.type === "Project"
                    )
                    .map((item) => (

                      <Link
                        to={item.url}
                        className="search-result-card"
                        key={item.id}
                        onClick={onClose}
                      >

                        {item.image && (
                          <div className="search-result-image">

                            <img
                              src={item.image}
                              alt={item.title}
                            />

                          </div>
                        )}


                        <p className="search-result-type">
                          Project
                        </p>


                        <h3 className="search-result-title">
                          {item.title}
                        </h3>

                      </Link>

                    ))}

                </div>

              </div>
            )}


            {/* =========================
                PAGES
            ========================= */}

            {results.filter(
              (item) =>
                item.type === "Page"
            ).length > 0 && (

              <div className="search-section pages-section">

                <h2 className="search-section-title">
                  Pages
                </h2>


                <div className="pages-grid">

                  {results
                    .filter(
                      (item) =>
                        item.type === "Page"
                    )
                    .map((item) => (

                      <Link
                        to={item.url}
                        className="page-result-card"
                        key={item.id}
                        onClick={onClose}
                      >

                        <div className="page-icon">

                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >

                            <path
                              d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z"
                              stroke="currentColor"
                            />

                            <path
                              d="M14 2V8H20"
                              stroke="currentColor"
                            />

                            <path
                              d="M8 13H16"
                              stroke="currentColor"
                            />

                            <path
                              d="M8 17H13"
                              stroke="currentColor"
                            />

                          </svg>

                        </div>


                        <h3 className="page-result-title">
                          {item.title}
                        </h3>

                      </Link>

                    ))}

                </div>

              </div>
            )}


            {/* =========================
                NO RESULTS
            ========================= */}

            {results.length === 0 && (

              <p className="no-search-results">
                No results found. Check the spelling or use
                a different word or phrase.
              </p>

            )}

          </section>
        )}

      </div>

    </div>
  );
}

export default Search;
