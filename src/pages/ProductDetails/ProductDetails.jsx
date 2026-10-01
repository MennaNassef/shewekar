import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Link,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getProductByHandle,
  getAllProducts,
} from "../../api/productsApi";

import "./ProductDetails.css";


/* ================================
   HELPERS
================================ */

function stripHtml(html = "") {
  const div =
    document.createElement("div");

  div.innerHTML = html;

  return (
    div.textContent ||
    div.innerText ||
    ""
  );
}


function normalizeText(text = "") {
  return text
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}


/* ================================
   EXTRACT PRODUCT CONTENT
================================ */

function extractProductContent(
  html = ""
) {
  const text =
    normalizeText(
      stripHtml(html)
    );

  const materialsMatch =
    text.match(
      /Materials?\s*:\s*(.*?)(?=Dimensions?\s*:|$)/i
    );

  const dimensionsMatch =
    text.match(
      /Dimensions?\s*:\s*(.*)$/i
    );

  let description = text;

  if (materialsMatch) {
    description =
      description.replace(
        materialsMatch[0],
        ""
      );
  }

  if (dimensionsMatch) {
    description =
      description.replace(
        dimensionsMatch[0],
        ""
      );
  }

  return {
    description:
      description.trim(),

    materials:
      materialsMatch?.[1]?.trim() ||
      "",

    dimensions:
      dimensionsMatch?.[1]?.trim() ||
      "",
  };
}


/* ================================
   PRODUCT TAGS
================================ */

function normalizeTags(tags) {
  if (Array.isArray(tags)) {
    return tags.map((tag) =>
      String(tag)
        .trim()
        .toLowerCase()
    );
  }

  if (typeof tags === "string") {
    return tags
      .split(",")
      .map((tag) =>
        tag.trim().toLowerCase()
      )
      .filter(Boolean);
  }

  return [];
}


/* ================================
   PRODUCT IMAGE
================================ */

function getProductImage(product) {
  return (
    product.images?.[0] ||
    product.image ||
    ""
  );
}


/* ================================
   PRODUCT DETAILS
================================ */

function ProductDetails() {
  const {
    productHandle,
  } = useParams();

  const navigate = useNavigate();

  const location =
    useLocation();

  /*
    لو جايين من CollectionDetails
    أو من You May Also Like
    المنتج يظهر فورًا.
  */
  const initialProduct =
    location.state?.product || null;


  const [product, setProduct] =
    useState(initialProduct);


  const [allProducts, setAllProducts] =
    useState([]);


  const [selectedImage, setSelectedImage] =
    useState(
      initialProduct?.images?.[0] ||
      initialProduct?.image ||
      ""
    );


  /*
    بداية الصور الظاهرة في الـ thumbnails

    مثال:
    0 => 1 2 3 4 5
    1 => 2 3 4 5 6
    2 => 3 4 5 6 7
  */
  const [
    thumbnailStartIndex,
    setThumbnailStartIndex,
  ] = useState(0);


  const [error, setError] =
    useState("");


  const relatedSliderRef =
    useRef(null);


  const [
    canScrollLeft,
    setCanScrollLeft,
  ] = useState(false);


  const [
    canScrollRight,
    setCanScrollRight,
  ] = useState(false);


  /* ================================
     INITIAL PRODUCT
  ================================ */

  useEffect(() => {
    if (!initialProduct) {
      return;
    }

    setProduct(initialProduct);

    setSelectedImage(
      initialProduct.images?.[0] ||
      initialProduct.image ||
      ""
    );

    /*
      لما ننتقل لمنتج جديد
      نرجع الـ thumbnails لأول 5 صور.
    */
    setThumbnailStartIndex(0);

    setError("");
  }, [initialProduct, productHandle]);


  /* ================================
     GET FULL PRODUCT DATA

     مهم:
     حتى لو المنتج موجود في state
     بنجيب بياناته الكاملة في الخلفية
     علشان الوصف يظهر.
  ================================ */

  useEffect(() => {
    let mounted = true;

    if (!productHandle) {
      return;
    }

    const fetchFullProduct =
      async () => {
        try {
          const productData =
            await getProductByHandle(
              productHandle
            );

          if (!mounted) {
            return;
          }

          /*
            بنعمل merge بدل ما نستبدل
            المنتج كله.
          */
          setProduct((current) => ({
            ...(current || {}),
            ...productData,

            description:
              productData.description ||
              current?.description ||
              "",

            body_html:
              productData.body_html ||
              current?.body_html ||
              "",
          }));

          /*
            لو مفيش صورة حاليًا
            استخدم صورة الـ API.
          */
          if (
            !initialProduct &&
            productData
          ) {
            setSelectedImage(
              productData.images?.[0] ||
              productData.image ||
              ""
            );

            setThumbnailStartIndex(0);
          }
        } catch (err) {
          console.error(
            "Product details error:",
            err
          );

          /*
            لو مفيش product أصلاً
            وقتها فقط نعرض الخطأ.
          */
          if (
            mounted &&
            !initialProduct
          ) {
            setError(
              "Unable to load this product."
            );
          }
        }
      };

    fetchFullProduct();

    return () => {
      mounted = false;
    };
  }, [productHandle]);


  /* ================================
     GET ALL PRODUCTS

     في الخلفية فقط
     علشان You May Also Like
  ================================ */

  useEffect(() => {
    let mounted = true;

    const fetchRelatedProducts =
      async () => {
        try {
          const products =
            await getAllProducts();

          if (!mounted) {
            return;
          }

          setAllProducts(
            Array.isArray(products)
              ? products
              : []
          );
        } catch (err) {
          console.error(
            "Related products error:",
            err
          );
        }
      };

    fetchRelatedProducts();

    return () => {
      mounted = false;
    };
  }, []);


  /* ================================
     RELATED SLIDER ARROWS

     مهم:
     الـ Hook لازم يكون قبل أي
     conditional return
  ================================ */

  const updateArrows = () => {
    const slider =
      relatedSliderRef.current;

    if (!slider) {
      return;
    }

    const maxScroll =
      slider.scrollWidth -
      slider.clientWidth;

    setCanScrollLeft(
      slider.scrollLeft > 5
    );

    setCanScrollRight(
      maxScroll > 5 &&
      slider.scrollLeft <
        maxScroll - 5
    );
  };


  useEffect(() => {
    const slider =
      relatedSliderRef.current;

    if (!slider) {
      return;
    }

    requestAnimationFrame(
      updateArrows
    );


    const resizeObserver =
      new ResizeObserver(() => {
        updateArrows();
      });


    resizeObserver.observe(
      slider
    );


    slider.addEventListener(
      "scroll",
      updateArrows
    );


    window.addEventListener(
      "resize",
      updateArrows
    );


    return () => {
      slider.removeEventListener(
        "scroll",
        updateArrows
      );

      window.removeEventListener(
        "resize",
        updateArrows
      );

      resizeObserver.disconnect();
    };
  }, [
    allProducts.length,
    product?.handle,
  ]);


  /* ================================
     ERROR
  ================================ */

  if (error && !product) {
    return (
      <main className="product-details-page">

        <div className="product-error">

          <h2>
            Product not found
          </h2>

          <Link to="/collections">
            Back to Collections
          </Link>

        </div>

      </main>
    );
  }


  /*
    لو لسه مفيش product
    مش بنعرض Loading.

    الصفحة هتظهر لما يكون عندنا
    product من state أو API.
  */
  if (!product) {
    return null;
  }


  /* ================================
     PRODUCT CONTENT
  ================================ */

  const {
    description,
    materials,
    dimensions,
  } =
    extractProductContent(
      product.description ||
      product.body_html ||
      ""
    );


  /* ================================
     IMAGES
  ================================ */

  const images =
    product.images?.length > 0
      ? product.images
      : product.image
      ? [product.image]
      : [];


  const available =
    product.available !== false;


  /* ================================
     RECOMMENDED PRODUCTS
  ================================ */

  const currentTags =
    normalizeTags(
      product.tags
    );


  const recommendedProducts =
    allProducts

      .filter(
        (item) =>
          item.handle !==
            product.handle &&
          getProductImage(item)
      )

      .map((item) => {

        const itemTags =
          normalizeTags(
            item.tags
          );


        const matchingTags =
          itemTags.filter(
            (tag) =>
              currentTags.includes(
                tag
              )
          ).length;


        const sameVendor =
          item.vendor &&
          product.vendor &&
          item.vendor.toLowerCase() ===
            product.vendor.toLowerCase();


        const sameType =
          item.product_type &&
          product.product_type &&
          item.product_type.toLowerCase() ===
            product.product_type.toLowerCase();


        return {
          ...item,

          recommendationScore:
            matchingTags * 3 +
            (sameType ? 2 : 0) +
            (sameVendor ? 1 : 0),
        };
      })

      .filter(
        (item) =>
          item.recommendationScore > 0
      )

      .sort(
        (a, b) =>
          b.recommendationScore -
          a.recommendationScore
      )

      .slice(0, 6);


  /* ================================
     SCROLL RELATED PRODUCTS
  ================================ */

  const scrollRelated = (
    direction
  ) => {
    const slider =
      relatedSliderRef.current;

    if (!slider) {
      return;
    }


    const card =
      slider.querySelector(
        ".related-product-card"
      );

    if (!card) {
      return;
    }


    const gap =
      window.innerWidth <= 600
        ? 10
        : 12;


    const distance =
      card.getBoundingClientRect()
        .width + gap;


    slider.scrollBy({
      left:
        direction === "right"
          ? distance
          : -distance,

      behavior: "smooth",
    });
  };


  /* ================================
     IMAGE NAVIGATION
  ================================ */

  const currentImageIndex =
    images.indexOf(
      selectedImage
    );


  const changeImage = (
    direction
  ) => {
    if (images.length <= 1) {
      return;
    }


    const nextIndex =
      direction === "right"
        ? (
            currentImageIndex + 1
          ) % images.length
        : (
            currentImageIndex -
            1 +
            images.length
          ) % images.length;


    setSelectedImage(
      images[nextIndex]
    );


    /*
      تحريك نافذة الـ thumbnails
      مع السهم الموجود على الصورة الكبيرة.

      لو عندنا أكثر من 5 صور:
      
      Right:
      1 2 3 4 5
        2 3 4 5 6
          3 4 5 6 7

      Left:
        2 3 4 5 6
      1 2 3 4 5
    */
    if (images.length > 5) {
      let newStartIndex =
        thumbnailStartIndex;


      /* ==========================
         RIGHT
      ========================== */

      if (
        direction === "right"
      ) {

        /*
          لو كنا عند آخر صورة
          ورجعنا لأول صورة
        */
        if (
          currentImageIndex ===
          images.length - 1
        ) {
          newStartIndex = 0;
        }

        /*
          لو الصورة الجديدة خرجت
          من ناحية اليمين
        */
        else if (
          nextIndex >=
          thumbnailStartIndex + 5
        ) {
          newStartIndex =
            thumbnailStartIndex + 1;
        }
      }


      /* ==========================
         LEFT
      ========================== */

      if (
        direction === "left"
      ) {

        /*
          لو كنا عند أول صورة
          ورجعنا لآخر صورة
        */
        if (
          currentImageIndex === 0
        ) {
          newStartIndex =
            images.length - 5;
        }

        /*
          لو الصورة الجديدة خرجت
          من ناحية الشمال
        */
        else if (
          nextIndex <
          thumbnailStartIndex
        ) {
          newStartIndex =
            thumbnailStartIndex - 1;
        }
      }


      /*
        حماية علشان الـ index
        ما يخرجش بره الصور.
      */
      newStartIndex =
        Math.max(
          0,
          Math.min(
            newStartIndex,
            images.length - 5
          )
        );


      setThumbnailStartIndex(
        newStartIndex
      );
    }
  };


  /* ================================
     WHATSAPP
  ================================ */

  const productUrl =
    `https://shewekar.com/products/${product.handle}`;


  const whatsappMessage =
    encodeURIComponent(
      `Hi, I have a question regarding ${product.title} - ${productUrl}`
    );


  const whatsappUrl =
    `https://wa.me/201553627522?text=${whatsappMessage}`;


  /* ================================
     RENDER
  ================================ */

  return (
    <main className="product-details-page">

      {/* =========================
          MAIN PRODUCT
      ========================= */}

      <section className="product-details-container">

        {/* =========================
            PRODUCT GALLERY
        ========================= */}

        <div className="product-gallery">

          {/* MAIN IMAGE */}

          <div className="product-main-image">

            {selectedImage && (
              <img
                src={selectedImage}
                alt={product.title}
              />
            )}


            {/* IMAGE ARROWS */}

            {images.length > 1 && (
              <div className="product-image-arrows">

                <button
                  type="button"
                  className="
                    product-image-arrow
                    product-image-arrow-left
                  "
                  onClick={() =>
                    changeImage("left")
                  }
                  aria-label="Previous image"
                >

                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 16 17"
                    fill="none"
                  >

                    <path
                      d="M6 4.5L10 8.5L6 12.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                  </svg>

                </button>


                <button
                  type="button"
                  className="
                    product-image-arrow
                    product-image-arrow-right
                  "
                  onClick={() =>
                    changeImage("right")
                  }
                  aria-label="Next image"
                >

                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 16 17"
                    fill="none"
                  >

                    <path
                      d="M6 4.5L10 8.5L6 12.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                  </svg>

                </button>

              </div>
            )}

          </div>


          {/* THUMBNAILS */}

          <div className="product-thumbnails">

            {images
              .slice(
                thumbnailStartIndex,
                thumbnailStartIndex + 5
              )
              .map(
                (
                  image,
                  visibleIndex
                ) => {

                  const actualIndex =
                    thumbnailStartIndex +
                    visibleIndex;


                  return (
                    <button
                      key={`${image}-${actualIndex}`}
                      type="button"
                      className={`
                        product-thumbnail
                        ${
                          selectedImage === image
                            ? "active"
                            : ""
                        }
                      `}
                      onClick={() =>
                        setSelectedImage(
                          image
                        )
                      }
                      aria-label={`View image ${
                        actualIndex + 1
                      }`}
                    >

                      <img
                        src={image}
                        alt={`${product.title} ${
                          actualIndex + 1
                        }`}
                      />

                    </button>
                  );
                }
              )}

          </div>

        </div>


        {/* =========================
            PRODUCT INFO
        ========================= */}

        <div className="product-info">

          <div className="product-vendor">
            {product.vendor ||
              "SHEWEKAR"}
          </div>


          <h1 className="product-title">
            {product.title}
          </h1>


          {/* DESCRIPTION */}

          {description && (
            <div className="product-description">
              {description}
            </div>
          )}


          {/* MATERIALS */}

          {materials && (
            <div className="product-detail-row">

              <strong>
                Materials:
              </strong>

              <span>
                {materials}
              </span>

            </div>
          )}


          {/* DIMENSIONS */}

          {dimensions && (
            <div className="product-detail-row">

              <strong>
                Dimensions:
              </strong>

              <span>
                {dimensions}
              </span>

            </div>
          )}


          {/* AVAILABILITY */}

          <div className="product-availability">

            {!available
              ? "Variant sold out or unavailable"
              : "Available"}

          </div>


          {/* ACTIONS */}

          <div className="product-actions">

            <button
              type="button"
              className="get-quote-button"
            >
              Get A Quote
            </button>


            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-button"
            >

              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >

                <path
                  d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.4L3 20.5l1.4-4.7a8.5 8.5 0 1 1 16.1-4.1Z"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <path
                  d="M8.2 7.8c.3-.6.6-.6.9-.6h.5c.2 0 .4.1.5.4l.8 1.8c.1.2.1.4-.1.6l-.6.8c-.2.2-.2.4 0 .7.4.7 1.1 1.4 1.8 1.8.3.2.5.2.7 0l.8-1c.2-.2.4-.2.7-.1l1.8.9c.3.1.4.3.4.5 0 .4-.2 1.2-.7 1.6-.5.5-1.2.7-2 .5-1-.2-2.3-.8-3.7-2-1.2-1.1-2-2.5-2.2-3.5-.2-.9 0-1.6.4-2.2Z"
                  fill="currentColor"
                />

              </svg>

              <span>
                Contact us on WhatsApp
              </span>

            </a>

          </div>

        </div>

      </section>


      {/* =========================
          YOU MAY ALSO LIKE
      ========================= */}

      {recommendedProducts.length >
        0 && (

        <section className="you-may-also-like">

          <div className="you-may-also-like-header">

            <h2>
              You May Also Like
            </h2>

          </div>


          <div className="related-slider-area">

            <div
              className="related-products-grid"
              ref={relatedSliderRef}
            >

              {recommendedProducts.map(
                (relatedProduct) => {
                  const relatedImage =
                    getProductImage(
                      relatedProduct
                    );

                  return (
                    <Link
                      key={relatedProduct.id}
                      to={`/products/${relatedProduct.handle}`}
                      state={{
                        product:
                          relatedProduct,
                      }}
                      className="related-product-card"
                      onClick={() => {
                        window.scrollTo({
                          top: 0,
                          left: 0,
                          behavior: "auto",
                        });
                      }}
                    >

                      <div className="related-product-image">

                        <img
                          src={relatedImage}
                          alt={
                            relatedProduct.title
                          }
                        />

                      </div>


                      <div className="related-product-info">

                        <h3>
                          {
                            relatedProduct.title
                          }
                        </h3>


                        {relatedProduct.price >
                          0 && (
                          <span>
                            {
                              relatedProduct.price
                            }
                          </span>
                        )}

                      </div>

                    </Link>
                  );
                }
              )}

            </div>


            {/* SLIDER ARROWS */}

            <div className="related-slider-arrows">

              <button
                type="button"
                className={`
                  related-slider-arrow
                  related-slider-arrow-left
                  ${
                    !canScrollLeft
                      ? "is-disabled"
                      : ""
                  }
                `}
                onClick={() =>
                  scrollRelated(
                    "left"
                  )
                }
                disabled={
                  !canScrollLeft
                }
                aria-label="Previous products"
              >

                <svg
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                >

                  <path
                    d="M6 4.5L10 8.5L6 12.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                </svg>

              </button>


              <button
                type="button"
                className={`
                  related-slider-arrow
                  related-slider-arrow-right
                  ${
                    !canScrollRight
                      ? "is-disabled"
                      : ""
                  }
                `}
                onClick={() =>
                  scrollRelated(
                    "right"
                  )
                }
                disabled={
                  !canScrollRight
                }
                aria-label="Next products"
              >

                <svg
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                >

                  <path
                    d="M6 4.5L10 8.5L6 12.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                </svg>

              </button>

            </div>

          </div>

        </section>
      )}

    </main>
  );
}


export default ProductDetails;