import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

/* =====================================================
   ICONS
===================================================== */

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 5 5" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="7" r="3.5" />
      <path d="M4.5 21c.8-4.2 3.2-6.3 7.5-6.3s6.7 2.1 7.5 6.3" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 8.5h14l-1 12H6l-1-12Z" />
      <path d="M9 8.5V6a3 3 0 0 1 6 0v2.5" />
    </svg>
  );
}

/* =====================================================
   MOBILE MENU ICON
===================================================== */

function MenuIcon({ open }) {
  return (
    <span className={`menu-lines ${open ? "is-open" : ""}`}>
      <span className="menu-line menu-line-one"></span>
      <span className="menu-line menu-line-two"></span>
    </span>
  );
}

/* =====================================================
   CHEVRON
===================================================== */

function ChevronIcon({ open = false }) {
  return (
    <svg
      className={`mobile-chevron ${open ? "is-open" : ""}`}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="m7 9 5 5 5-5" />
    </svg>
  );
}

/* =====================================================
   LINKS
===================================================== */

const links = [
  {
    label: "Home",
    path: "/",
  },

  {
    label: "Interior Design",
    path: "/interior-design",
    hasMegaMenu: true,

    mobileItems: [
      {
        label: "Commercial",
        path: "/commercial",
        image: "/hero/hero-1.jpg",
      },
      {
        label: "Residential",
        path: "/residential",
        image: "/hero/hero-2.webp",
      },
    ],
  },

  {
    label: "Collections",
    path: "/collections",
    hasMegaMenu: true,

    mobileItems: [
      {
        label: "Celestial Collection",
        path: "/collections/celestial-collection",
        image: "/collections/celestial.webp",
      },
      {
        label: "Layers of Life",
        path: "/collections/layers-of-life",
        image: "/collections/layers_of_life.webp",
      },
      {
        label: "Celebration of Life",
        path: "/collections/celebration-of-life",
        image: "/collections/celebration_of_life.webp",
      },
      {
        label: "Nubia Collection",
        path: "/collections/nubia-collection",
        image: "/collections/nubianDolls.webp",
      },
    ],
  },

  {
    label: "Gallery",
    path: "/gallery",
    hasMegaMenu: true,

    /* Mobile Gallery image */
    mobileImage: "/hero/hero-3.webp",

    mobileGroups: [
      {
        label: "Spaces",
        items: [
          {
            label: "Bedrooms",
            path: "/collections/bedrooms",
          },
          {
            label: "Dining Rooms",
            path: "/collections/dining-rooms",
          },
          {
            label: "Seating",
            path: "/collections/seating",
          },
          {
            label: "Outdoor",
            path: "/collections/outdoors-collection",
          },
        ],
      },

      {
        label: "Products",
        items: [
          {
            label: "Back Sofa Tables",
            path: "/collections/back-sofa-tables",
          },
          {
            label: "Cabinets",
            path: "/collections/cabinets",
          },
          {
            label: "Coffee Tables",
            path: "/collections/coffee-tables",
          },
          {
            label: "Consoles",
            path: "/collections/consoles",
          },
          {
            label: "Mirrors",
            path: "/collections/mirrors",
          },
          {
            label: "Rugs",
            path: "/collections/rugs",
          },
          {
            label: "Side Tables",
            path: "/collections/side-tables",
          },
          {
            label: "TV Units",
            path: "/collections/tv-units",
          },
          {
            label: "Lighting, Candles & Tableware",
            path: "/collections/lighting-candles-tableware",
          },
          {
            label: "Chairs & Stools",
            path: "/collections/chairs",
          },
          {
            label: "Sofas & Benches",
            path: "/collections/sofas-benches",
          },
        ],
      },
    ],
  },

  {
    label: "About us",
    path: "/about",
  },

  {
    label: "News",
    path: "/news",
  },

  {
    label: "Orders",
    path: "/login",
  },

  {
    label: "Contact us",
    path: "/contact",
  },
];

/* =====================================================
   NAVBAR
===================================================== */

function Navbar({ setIsSearchOpen }) {
  const { pathname } = useLocation();

  const [cartOpen, setCartOpen] = useState(false);

  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navbarHover, setNavbarHover] = useState(false);

  const [openMegaMenu, setOpenMegaMenu] = useState(null);

  const [openMobileSubmenu, setOpenMobileSubmenu] =
    useState(null);

  const [openMobileGroup, setOpenMobileGroup] =
    useState(null);

  const megaMenuTimer = useRef(null);

  const isHome = pathname === "/";
  const isNewsDetails = pathname.startsWith("/news/");
  const isOverlayPage = isHome || isNewsDetails;

  /* =====================================================
     SCROLL
  ===================================================== */

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;

      setScrolled(currentScrollY > 30);

      if (mobileOpen || cartOpen) {
        lastScrollY = currentScrollY;
        return;
      }

      if (Math.abs(delta) > 3) {
        if (currentScrollY > 80 && delta > 0) {
          setHidden(true);
        }

        if (delta < 0) {
          setHidden(false);
        }
      }

      if (currentScrollY <= 5) {
        setHidden(false);
        setScrolled(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, [mobileOpen, cartOpen]);

  /* =====================================================
     BODY SCROLL LOCK
  ===================================================== */

  useEffect(() => {
    const shouldLock = mobileOpen || cartOpen;

    document.body.style.overflow = shouldLock
      ? "hidden"
      : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen, cartOpen]);

  /* =====================================================
     RESET MOBILE MENU ON ROUTE CHANGE
  ===================================================== */

  useEffect(() => {
    setMobileOpen(false);
    setOpenMobileSubmenu(null);
    setOpenMobileGroup(null);
  }, [pathname]);

  /* =====================================================
     CLOSE CART ON ROUTE CHANGE
  ===================================================== */

  useEffect(() => {
    setCartOpen(false);
  }, [pathname]);

  /* =====================================================
     CLEAR MEGA MENU TIMER
  ===================================================== */

  useEffect(() => {
    return () => {
      clearTimeout(megaMenuTimer.current);
    };
  }, []);

  /* =====================================================
     MOBILE MENU
  ===================================================== */

  const toggleMenu = () => {
    setMobileOpen((prev) => !prev);

    setNavbarHover(false);
    setHidden(false);

    if (mobileOpen) {
      setOpenMobileSubmenu(null);
      setOpenMobileGroup(null);
    }
  };

  /* =====================================================
     MOBILE PARENT SUBMENU
  ===================================================== */

  const toggleMobileSubmenu = (label) => {
    setOpenMobileSubmenu((prev) =>
      prev === label ? null : label
    );

    setOpenMobileGroup(null);
  };

  /* =====================================================
     MOBILE GALLERY GROUP
  ===================================================== */

  const toggleMobileGroup = (label) => {
    setOpenMobileGroup((prev) =>
      prev === label ? null : label
    );
  };

  /* =====================================================
     ACTIVE LINK
  ===================================================== */

  const isActive = (path) => {
    if (path === "/") {
      return pathname === "/";
    }

    return (
      pathname === path ||
      pathname.startsWith(`${path}/`)
    );
  };

  /* =====================================================
     NAVBAR CLASS
  ===================================================== */

  const navbarClass = [
    "navbar",
    isOverlayPage ? "navbar-overlay" : "",
    scrolled ? "navbar-scrolled" : "",
    hidden ? "navbar-hidden" : "",
    mobileOpen ? "mobile-menu-open" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header
      className={navbarClass}
      onMouseEnter={() => {
        if (window.innerWidth > 900) {
          setNavbarHover(true);
        }
      }}
      onMouseLeave={() => {
        if (window.innerWidth > 900) {
          setNavbarHover(false);
        }
      }}
    >
      {/* =================================================
          NAVBAR INNER
      ================================================= */}

      <div className="navbar-inner">

        {/* MOBILE BUTTON */}

        <button
          type="button"
          className="navbar-mobile-toggle"
          aria-label={
            mobileOpen
              ? "Close menu"
              : "Open menu"
          }
          aria-expanded={mobileOpen}
          onClick={toggleMenu}
        >
          <MenuIcon open={mobileOpen} />
        </button>

        {/* LOGO */}

        <Link
          to="/"
          className="navbar-logo"
          aria-label="Shewekar home"
        >
          <img
            src={
              mobileOpen ||
              !isOverlayPage ||
              scrolled ||
              navbarHover
                ? "/shewekar-logo-black.png"
                : "/shewekar-logo-white.webp"
            }
            alt="SHEWEKAR"
          />
        </Link>

        {/* =================================================
            DESKTOP NAV
        ================================================= */}

        <nav
          className="navbar-menu"
          aria-label="Main navigation"
        >
          {links.map((link) => (
            <div
              key={link.path}
              className={`navbar-menu-item ${
                link.hasMegaMenu
                  ? "has-mega-menu"
                  : ""
              }`}
              onMouseEnter={() => {
                if (
                  window.innerWidth > 900 &&
                  link.hasMegaMenu
                ) {
                  clearTimeout(
                    megaMenuTimer.current
                  );

                  setOpenMegaMenu(
                    link.label
                  );
                }
              }}
              onMouseLeave={() => {
                if (
                  window.innerWidth > 900 &&
                  link.hasMegaMenu
                ) {
                  megaMenuTimer.current =
                    setTimeout(() => {
                      setOpenMegaMenu(null);
                    }, 250);
                }
              }}
            >
              <Link
                to={
                  link.label === "Collections"
                    ? undefined
                    : link.path
                }
                className={
                  isActive(link.path)
                    ? "active"
                    : ""
                }
                onClick={(e) => {
                  if (
                    link.label ===
                    "Collections"
                  ) {
                    e.preventDefault();
                  }
                }}
              >
                <span>
                  {link.label}
                </span>
              </Link>

              {/* =================================================
                  INTERIOR DESIGN
              ================================================= */}

              {link.label ===
                "Interior Design" && (
                <div
                  className={`mega-menu mega-menu-interior ${
                    openMegaMenu ===
                    "Interior Design"
                      ? "is-open"
                      : ""
                  }`}
                  onMouseEnter={() => {
                    clearTimeout(
                      megaMenuTimer.current
                    );

                    setOpenMegaMenu(
                      "Interior Design"
                    );
                  }}
                  onMouseLeave={() => {
                    megaMenuTimer.current =
                      setTimeout(() => {
                        setOpenMegaMenu(
                          null
                        );
                      }, 250);
                  }}
                >
                  <div className="mega-menu-inner">

                    <div className="mega-menu-links">

                      <Link to="/commercial">
                        Commercial
                      </Link>

                      <Link to="/residential">
                        Residential
                      </Link>

                    </div>

                    <div className="mega-menu-images">

                      <Link
                        to="/commercial"
                        className="mega-image-card"
                      >
                        <img
                          src="/hero/hero-1.jpg"
                          alt="Commercial Projects"
                        />

                        <div className="mega-image-overlay">

                          <span>
                            Get Inspired
                          </span>

                          <h3>
                            Commercial Projects
                          </h3>

                        </div>
                      </Link>

                      <Link
                        to="/residential"
                        className="mega-image-card"
                      >
                        <img
                          src="/hero/hero-2.webp"
                          alt="Residential Projects"
                        />

                        <div className="mega-image-overlay">

                          <span>
                            Embrace Elegance
                          </span>

                          <h3>
                            Residential Projects
                          </h3>

                        </div>
                      </Link>

                    </div>

                  </div>
                </div>
              )}

              {/* =================================================
                  COLLECTIONS
              ================================================= */}

              {link.label ===
                "Collections" && (
                <div
                  className={`mega-menu mega-menu-collections ${
                    openMegaMenu ===
                    "Collections"
                      ? "is-open"
                      : ""
                  }`}
                  onMouseEnter={() => {
                    clearTimeout(
                      megaMenuTimer.current
                    );

                    setOpenMegaMenu(
                      "Collections"
                    );
                  }}
                  onMouseLeave={() => {
                    megaMenuTimer.current =
                      setTimeout(() => {
                        setOpenMegaMenu(
                          null
                        );
                      }, 250);
                  }}
                >
                  <div className="collections-menu">

                    <Link
                      to="/collections/celestial-collection"
                      className="collection-card"
                    >
                      <img
                        src="/collections/celestial.webp"
                        alt="Celestial Collection"
                      />

                      <div className="collection-card-overlay">

                        <h3>
                          Celestial Collection
                        </h3>

                        <span>
                          Shop Now
                        </span>

                      </div>
                    </Link>

                    <Link
                      to="/collections/layers-of-life"
                      className="collection-card"
                    >
                      <img
                        src="/collections/layers_of_life.webp"
                        alt="Layers of Life"
                      />

                      <div className="collection-card-overlay">

                        <h3>
                          Layers of Life
                        </h3>

                        <span>
                          Shop Now
                        </span>

                      </div>
                    </Link>

                    <Link
                      to="/collections/celebration-of-life"
                      className="collection-card"
                    >
                      <img
                        src="/collections/celebration_of_life.webp"
                        alt="Celebration of Life"
                      />

                      <div className="collection-card-overlay">

                        <h3>
                          Celebration of Life
                        </h3>

                        <span>
                          Shop Now
                        </span>

                      </div>
                    </Link>

                    <Link
                      to="/collections/nubia-collection"
                      className="collection-card"
                    >
                      <img
                        src="/collections/nubianDolls.webp"
                        alt="Nubia Collection"
                      />

                      <div className="collection-card-overlay">

                        <h3>
                          Nubia Collection
                        </h3>

                        <span>
                          Shop Now
                        </span>

                      </div>
                    </Link>

                  </div>
                </div>
              )}

              {/* =================================================
                  GALLERY
              ================================================= */}

              {link.label === "Gallery" && (
                <div
                  className={`mega-menu mega-menu-gallery ${
                    openMegaMenu === "Gallery"
                      ? "is-open"
                      : ""
                  }`}
                  onMouseEnter={() => {
                    clearTimeout(
                      megaMenuTimer.current
                    );

                    setOpenMegaMenu(
                      "Gallery"
                    );
                  }}
                  onMouseLeave={() => {
                    megaMenuTimer.current =
                      setTimeout(() => {
                        setOpenMegaMenu(
                          null
                        );
                      }, 250);
                  }}
                >
                  <div className="gallery-menu">

                    {/* SPACES */}

                    <div className="gallery-column">

                      <span className="gallery-column-title">
                        Spaces
                      </span>

                      <Link to="/collections/bedrooms">
                        Bedrooms
                      </Link>

                      <Link to="/collections/dining-rooms">
                        Dining Rooms
                      </Link>

                      <Link to="/collections/seating">
                        Seating
                      </Link>

                      <Link to="/collections/outdoors-collection">
                        Outdoor
                      </Link>

                    </div>

                    {/* PRODUCTS */}

                    <div className="gallery-column gallery-products">

                      <span className="gallery-column-title">
                        Products
                      </span>

                      <Link to="/collections/back-sofa-tables">
                        Back Sofa Tables
                      </Link>

                      <Link to="/collections/cabinets">
                        Cabinets
                      </Link>

                      <Link to="/collections/coffee-tables">
                        Coffee Tables
                      </Link>

                      <Link to="/collections/consoles">
                        Consoles
                      </Link>

                      <Link to="/collections/mirrors">
                        Mirrors
                      </Link>

                      <Link to="/collections/rugs">
                        Rugs
                      </Link>

                      <Link to="/collections/side-tables">
                        Side Tables
                      </Link>

                      <Link to="/collections/tv-units">
                        TV Units
                      </Link>

                      <Link to="/collections/lighting-candles-tableware">
                        Lighting, Candles &
                        Tableware
                      </Link>

                      <Link to="/collections/chairs">
                        Chairs & Stools
                      </Link>

                      <Link to="/collections/sofas-benches">
                        Sofas & Benches
                      </Link>

                    </div>

                    {/* FEATURE */}

                    <Link
                      to="/gallery"
                      className="gallery-feature"
                    >
                      <img
                        src="/hero/hero-3.webp"
                        alt="All Collections"
                      />

                      <div className="gallery-feature-overlay">

                        <span>
                          Take a look
                        </span>

                        <h3>
                          All Collections
                        </h3>

                      </div>

                    </Link>

                  </div>
                </div>
              )}

            </div>
          ))}
        </nav>

        {/* =================================================
            ACTIONS
        ================================================= */}

        <div className="navbar-actions">

          <button
            type="button"
            className="navbar-search-button"
            onClick={() =>
              setIsSearchOpen(true)
            }
            aria-label="Search"
          >
            <SearchIcon />
          </button>

          <Link
            to="/login"
            aria-label="Account"
          >
            <UserIcon />
          </Link>

          <button
            type="button"
            className="cart-link"
            aria-label="Cart"
            onClick={() =>
              setCartOpen(true)
            }
          >
            <BagIcon />

            <span>
              0
            </span>
          </button>

        </div>

      </div>

      {/* =================================================
          MOBILE MENU
      ================================================= */}

      <div
        className={`navbar-mobile-menu ${
          mobileOpen
            ? "is-open"
            : ""
        }`}
      >
        <div className="mobile-menu-content">

          <div className="mobile-main-links">

            {links.map((link) => {

              const hasMobileSubmenu =
                Boolean(
                  link.mobileItems ||
                  link.mobileGroups
                );

              const submenuOpen =
                openMobileSubmenu ===
                link.label;

              return (
                <div
                  key={link.path}
                  className={`mobile-menu-item ${
                    submenuOpen
                      ? "is-expanded"
                      : ""
                  }`}
                >

                  {/* =================================================
                      NORMAL LINK
                  ================================================= */}

                  {!hasMobileSubmenu ? (

                    <Link
                      to={link.path}
                      className={
                        isActive(link.path)
                          ? "active"
                          : ""
                      }
                      onClick={() => {
                        setMobileOpen(false);
                        setOpenMobileSubmenu(
                          null
                        );
                        setOpenMobileGroup(
                          null
                        );
                      }}
                    >
                      <span>
                        {link.label}
                      </span>
                    </Link>

                  ) : (

                    /* =================================================
                       PARENT WITH SUBMENU
                    ================================================= */

                    <div className="mobile-parent-row">

                      <Link
                        to={
                          link.label ===
                          "Collections"
                            ? undefined
                            : link.path
                        }
                        className={
                          isActive(link.path)
                            ? "active"
                            : ""
                        }
                        onClick={(e) => {
                          if (
                            link.label ===
                            "Collections"
                          ) {
                            e.preventDefault();
                          }
                        }}
                      >
                        <span>
                          {link.label}
                        </span>
                      </Link>

                      <button
                        type="button"
                        className="mobile-submenu-toggle"
                        aria-label={`Open ${link.label}`}
                        aria-expanded={
                          submenuOpen
                        }
                        onClick={() =>
                          toggleMobileSubmenu(
                            link.label
                          )
                        }
                      >
                        <ChevronIcon
                          open={
                            submenuOpen
                          }
                        />
                      </button>

                    </div>
                  )}

                  {/* =================================================
                      SUBMENU
                  ================================================= */}

                  {hasMobileSubmenu && (
                      <div
                        className={`mobile-submenu ${
                          submenuOpen
                            ? "is-open"
                            : ""
                        }`}
                      >

                        {/* INTERIOR DESIGN / COLLECTIONS */}

                        {link.mobileItems && (
                          <div className="mobile-submenu-links mobile-image-submenu">

                            {link.mobileItems.map((item) => (
                              <Link
                                key={item.path}
                                to={item.path}
                                className={`mobile-image-link ${
                                  isActive(item.path)
                                    ? "active"
                                    : ""
                                }`}
                                onClick={() => {
                                  setMobileOpen(false);
                                  setOpenMobileSubmenu(null);
                                  setOpenMobileGroup(null);
                                }}
                              >

                                <div className="mobile-image-card">

                                  <img
                                    src={item.image}
                                    alt={item.label}
                                  />

                                  <div className="mobile-image-card-overlay">
                                    <span>
                                      {item.label}
                                    </span>
                                  </div>

                                </div>

                              </Link>
                            ))}

                          </div>
                        )}

                        {/* GALLERY */}

                        {link.mobileGroups && (
                          <div className="mobile-gallery-groups">

                            {link.mobileImage && (
                              <Link
                                to="/gallery"
                                className="mobile-gallery-image"
                                onClick={() => {
                                  setMobileOpen(false);
                                  setOpenMobileSubmenu(null);
                                  setOpenMobileGroup(null);
                                }}
                              >
                                <img
                                  src={link.mobileImage}
                                  alt="Gallery"
                                />
                              </Link>
                            )}

                            {link.mobileGroups.map((group) => {

                              const groupOpen =
                                openMobileGroup ===
                                group.label;

                              return (
                                <div
                                  className={`mobile-gallery-group ${
                                    groupOpen
                                      ? "is-open"
                                      : ""
                                  }`}
                                  key={group.label}
                                >

                                  <div className="mobile-gallery-group-row">

                                    <span>
                                      {group.label}
                                    </span>

                                    <button
                                      type="button"
                                      className="mobile-group-toggle"
                                      aria-label={`Open ${group.label}`}
                                      aria-expanded={groupOpen}
                                      onClick={() =>
                                        toggleMobileGroup(
                                          group.label
                                        )
                                      }
                                    >
                                      <ChevronIcon
                                        open={groupOpen}
                                      />
                                    </button>

                                  </div>

                                  <div
                                    className={`mobile-gallery-group-links ${
                                      groupOpen
                                        ? "is-open"
                                        : ""
                                    }`}
                                  >

                                    {group.items.map((item) => (
                                      <Link
                                        key={item.path}
                                        to={item.path}
                                        className={
                                          isActive(item.path)
                                            ? "active"
                                            : ""
                                        }
                                        onClick={() => {
                                          setMobileOpen(false);
                                          setOpenMobileSubmenu(null);
                                          setOpenMobileGroup(null);
                                        }}
                                      >
                                        {item.label}
                                      </Link>
                                    ))}

                                  </div>

                                </div>
                              );
                            })}

                          </div>
                        )}

                      </div>
                    )}
                </div>
              );
            })}

          </div>

          {/* =================================================
              ACCOUNT AREA
          ================================================= */}

          <div className="mobile-account-area">

            <Link
              to="/logout"
              className="mobile-logout"
              onClick={() => {
                setMobileOpen(false);
                setOpenMobileSubmenu(null);
                setOpenMobileGroup(null);
              }}
            >
              Log Out
            </Link>

            <div className="mobile-account-links">

              <Link
                to="/cart"
                onClick={() => {
                  setMobileOpen(false);
                  setOpenMobileSubmenu(null);
                  setOpenMobileGroup(null);
                }}
              >
                Shopping Cart
              </Link>

              <Link
                to="/login"
                onClick={() => {
                  setMobileOpen(false);
                  setOpenMobileSubmenu(null);
                  setOpenMobileGroup(null);
                }}
              >
                Welcome to Your Account
              </Link>

              <Link
                to="/address-book"
                onClick={() => {
                  setMobileOpen(false);
                  setOpenMobileSubmenu(null);
                  setOpenMobileGroup(null);
                }}
              >
                Address Book
              </Link>

            </div>

          </div>

        </div>
      </div>

      {/* =================================================
          CART DRAWER
      ================================================= */}

      {cartOpen && (

        <div
          className="cart-drawer-overlay"
          onClick={() =>
            setCartOpen(false)
          }
        >

          <aside
            className="cart-drawer"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="cart-drawer__header">

              <h2>
                My Shopping Cart (0)
              </h2>

              <button
                type="button"
                className="cart-drawer__close"
                onClick={() =>
                  setCartOpen(false)
                }
                aria-label="Close cart"
              >
                ×
              </button>

            </div>

            <div className="cart-drawer__line" />

            <div className="cart-drawer__check">

              <svg
                viewBox="0 0 24 24"
                width="25"
                height="25"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                />

                <path d="M8 12l2.5 2.5L16 9" />
              </svg>

            </div>

            <div className="cart-drawer__empty">

              <p>
                You have no products in
                your shopping cart.
              </p>

              <button
                type="button"
                className="cart-drawer__shopping"
                onClick={() => {
                  setCartOpen(false);

                  window.location.href =
                    "/collections/all";
                }}
              >
                Start Shopping
              </button>

            </div>

          </aside>

        </div>
      )}

    </header>
  );
}

export default Navbar;