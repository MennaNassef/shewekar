import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Collections from "./pages/Collections/Collections";
import CollectionDetails from "./pages/CollectionDetails/CollectionDetails";
import Gallery from "./pages/Gallery/Gallery";
import InteriorDesign from "./pages/InteriorDesign/InteriorDesign";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Cart from "./pages/Cart/Cart";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import News from "./pages/News/News";
import NewsDetails from "./pages/News/NewsDetails";
import Commercial from "./pages/Commercial/Commercial";
import Residential from "./pages/Residential/Residential";
import ProjectDetails from "./pages/ProjectDetails/ProjectDetails";
import Search from "./pages/Search/Search";
import Products from "./pages/Products/Products";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/shop" element={<Home />} />

          

          <Route path="/collections" element={<Gallery />} />

          
          <Route
            path="/collections/:collectionSlug"
            element={<CollectionDetails />}
          />

          <Route path="/commercial" element={<Commercial />} />

          <Route path="/residential" element={<Residential />} />

          <Route path="/gallery" element={<Gallery />} />

          <Route
            path="/collections/all"
            element={<Products />}
          />

          <Route
            path="/interior-design"
            element={<InteriorDesign />}
          />

          <Route
            path="/products/:productHandle"
            element={<ProductDetails />}
          />
          <Route path="/products" element={<Gallery />} />

          <Route
            path="/projects/:slug"
            element={<ProjectDetails />}
          />

          <Route path="/news" element={<News />} />

          <Route
            path="/news/:slug"
            element={<NewsDetails />}
          />

          <Route path="/about" element={<About />} />

          <Route path="/contact" element={<Contact />} />

          <Route path="/cart" element={<Cart />} />

          <Route path="/login" element={<Login />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;