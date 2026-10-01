import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Search from "../pages/Search/Search";

function MainLayout({ children }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  return (
    <>
      <Navbar setIsSearchOpen={setIsSearchOpen} />

<Outlet />

{isSearchOpen && (
  <Search
    onClose={() => setIsSearchOpen(false)}
  />
)}

      <main>{children}</main>

      <Footer />
      <a
  aria-label="Chat with us"
  className="floating-whatsapp"
  href="https://wa.me/201553627522?text=Hello%2C+I%27m+interested+to+know+more+about+Shewekar."
  rel="noopener"
  target="_blank"
>
  <svg
    viewBox="0 0 50 50"
    fill="none"
    aria-hidden="true"
  >
    <circle
      cx="25"
      cy="25"
      r="25"
      fill="#25d366"
    />

    <path
      clipRule="evenodd"
      fill="#ffffff"
      fillRule="evenodd"
      d="M34.92 15.069A13.882 13.882 0 0 0 25.06 11c-7.685 0-13.94 6.224-13.942 13.874a13.793 13.793 0 0 0 1.861 6.936L11 39l7.39-1.93a13.977 13.977 0 0 0 6.663 1.69h.006c7.683 0 13.938-6.225 13.941-13.875a13.756 13.756 0 0 0-4.08-9.816ZM25.06 36.416h-.005c-2.079 0-4.118-.557-5.898-1.607l-.423-.25-4.386 1.145 1.17-4.256-.275-.437a11.462 11.462 0 0 1-1.771-6.137c.002-6.358 5.2-11.53 11.593-11.53a11.537 11.537 0 0 1 8.192 3.381 11.433 11.433 0 0 1 3.39 8.159c-.002 6.358-5.2 11.532-11.587 11.532Zm6.356-8.636c-.349-.174-2.061-1.012-2.38-1.128-.32-.116-.552-.174-.784.174-.232.347-.9 1.128-1.103 1.359-.203.231-.407.26-.755.086-.348-.174-1.47-.54-2.802-1.72-1.035-.92-1.734-2.055-1.937-2.402-.204-.347-.022-.535.152-.707.156-.156.348-.405.523-.608.174-.202.232-.347.348-.578.116-.231.058-.433-.029-.607-.087-.174-.783-1.88-1.074-2.574-.283-.676-.57-.584-.783-.595-.204-.01-.436-.012-.668-.012-.233 0-.61.086-.93.433-.319.348-1.219 1.187-1.219 2.892 0 1.706 1.248 3.355 1.423 3.587.174.231 2.456 3.733 5.95 5.235.832.357 1.48.57 1.987.73.834.265 1.593.227 2.194.138.669-.1 2.06-.839 2.35-1.649.29-.81.29-1.504.204-1.648-.087-.144-.32-.232-.668-.405v-.002Z"
    />
  </svg>
</a>
    </>
  );
}

export default MainLayout;