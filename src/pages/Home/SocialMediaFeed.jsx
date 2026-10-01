import { useEffect, useState } from "react";
import "./SocialMediaFeed.css";

const SOCIAL_IMAGES = [
  // 1
  "https://shewekar.com/cdn/shop/files/Snapinsta.app_440783693_18309375544144695_2042903166316414566_n_1080.jpg?v=1716707835&width=710",

  // 2
  "https://shewekar.com/cdn/shop/files/Snapinsta.app_438729348_18307841068144695_4582286916693275978_n_1080.jpg?v=1716707835&width=710",

  // 3
  "https://shewekar.com/cdn/shop/files/Snapinsta.app_430652644_18301731820144695_7821296285546371468_n_1080.jpg?v=1716707835&width=710",

  // 4
  "https://shewekar.com/cdn/shop/files/Snapinsta.app_439864364_18307686709144695_1009220503908450999_n_1080.jpg?v=1716709177&width=710",

  // 5
  "https://shewekar.com/cdn/shop/files/Snapinsta.app_435757032_18305905591144695_8405762836106833495_n_1080.jpg?v=1716709178&width=710",

  // 6
  "https://shewekar.com/cdn/shop/files/Snapinsta.app_436223765_18305905630144695_4749640500896922235_n_1080.jpg?v=1716709178&width=710",

  // 7
  "https://shewekar.com/cdn/shop/files/Snapinsta.app_435794102_18305905558144695_4419895304952120512_n_1080.jpg?v=1716709178&width=710",

  // 8
  "https://shewekar.com/cdn/shop/files/Snapinsta.app_435888655_18305905582144695_7128212409924948899_n_1080.jpg?v=1716709178&width=710",

  // 9
  "https://shewekar.com/cdn/shop/files/Snapinsta.app_436441394_18310179715144695_6248003504828203466_n_1080.jpg?v=1716707835&width=710",

  // 10
  "https://shewekar.com/cdn/shop/files/Snapinsta.app_436315872_18306241162144695_7671218950244650127_n_1080.jpg?v=1716708832&width=710",

  // 11
  "https://shewekar.com/cdn/shop/files/Snapinsta.app_435660590_18305905540144695_7033063974256261714_n_1080.jpg?v=1716709178&width=710",

  // 12
  "https://shewekar.com/cdn/shop/files/Snapinsta.app_443842277_18311116945144695_2155309103873562734_n_1080.jpg?v=1716707834&width=710",
];

const INSTAGRAM_URL = "https://www.instagram.com/shewekar/";

function InstagramIcon() {
  return (
    <svg
      className="social-feed-instagram"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
      />

      <circle
        cx="12"
        cy="12"
        r="4"
      />

      <circle
        cx="17.5"
        cy="6.5"
        r="1"
        className="instagram-dot"
      />
    </svg>
  );
}

// function getItemsPerView() {
//   if (window.innerWidth <= 600) {
//     return 2;
//   }

//   if (window.innerWidth <= 900) {
//     return 3;
//   }

//   return 6;
// }

export default function SocialMediaFeed() {
//   const [itemsPerView, setItemsPerView] = useState(6);
const itemsPerView = 6;

  /*
    Each visible slot has its own image index.

    Desktop:
    [1, 2, 3, 4, 5, 6]

    Then:
    [7, 8, 9, 10, 11, 12]

    Then back to:
    [1, 2, 3, 4, 5, 6]
  */

  const [imageIndexes, setImageIndexes] = useState([0, 1, 2, 3, 4, 5]);

  /*
    Which slots are currently animating.
  */
  const [animatingSlots, setAnimatingSlots] = useState([]);

  /*
    Used to control the two groups.

    First:
    2, 4, 6

    Then after 2 seconds:
    1, 3, 5
  */
  const [animationKey, setAnimationKey] = useState(0);

//   useEffect(() => {
//     const handleResize = () => {
//       const newItemsPerView = getItemsPerView();

//       setItemsPerView(newItemsPerView);

//       /*
//         Restart visible images when breakpoint changes.
//       */
//       setImageIndexes(
//         Array.from(
//           { length: newItemsPerView },
//           (_, index) => index
//         )
//       );

//       setAnimatingSlots([]);
//     };

//     handleResize();

//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

  /*
    Move one group.
  */
  const moveGroup = (slots) => {
    setAnimatingSlots(slots);

    /*
      Wait until the slide animation finishes,
      then replace the image with the next image.
    */
    setTimeout(() => {
      setImageIndexes((currentIndexes) => {
        return currentIndexes.map((currentIndex, slotIndex) => {
          if (!slots.includes(slotIndex)) {
            return currentIndex;
          }

          return (currentIndex + itemsPerView) % SOCIAL_IMAGES.length;
        });
      });

      setAnimatingSlots([]);
    }, 900);
  };

  useEffect(() => {
    /*
      Start the first group after the section has been visible
      for a little while.
    */
    const firstTimer = setTimeout(() => {
      /*
        Desktop:
        slot indexes 1,3,5
        = visual images 2,4,6

        Mobile:
        slot indexes 1
        = second image
      */
      const evenSlots = [];

      for (let i = 1; i < itemsPerView; i += 2) {
        evenSlots.push(i);
      }

      moveGroup(evenSlots);
    }, 2500);

    /*
      Second group starts 2 seconds later.
    */
    const secondTimer = setTimeout(() => {
      const oddSlots = [];

      for (let i = 0; i < itemsPerView; i += 2) {
        oddSlots.push(i);
      }

      moveGroup(oddSlots);
    }, 4000);

    /*
      Restart the whole sequence.
    */
    const restartTimer = setTimeout(() => {
      setAnimationKey((value) => value + 1);
    }, 5000);

    return () => {
      clearTimeout(firstTimer);
      clearTimeout(secondTimer);
      clearTimeout(restartTimer);
    };
  }, [animationKey, itemsPerView]);

  return (
    <section className="social-feed">
      {/* ================= HEADER ================= */}

      <div className="social-feed-header">
        <div className="social-feed-heading">
          <span>Get Inspired</span>

          <h2>Our Social Media Feed</h2>
        </div>

        {/* Desktop button */}
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="social-feed-follow desktop-follow"
        >
          <InstagramIcon />
          <span>Follow</span>
        </a>
      </div>

      {/* ================= IMAGES ================= */}

      <div
        className="social-feed-grid"
        style={{
          "--items": itemsPerView,
        }}
      >
        {Array.from({ length: itemsPerView }).map((_, slotIndex) => {
          const currentImageIndex = imageIndexes[slotIndex];

          /*
            The next image is the image belonging
            to the same position in the next group.
          */
          const nextImageIndex =
            (currentImageIndex + itemsPerView) %
            SOCIAL_IMAGES.length;

          const isAnimating =
            animatingSlots.includes(slotIndex);

          return (
            <div
              className="social-feed-slot"
              key={slotIndex}
            >
              {/* Old image */}
              <img
                className={`social-feed-image current-image ${
                  isAnimating ? "slide-out" : ""
                }`}
                src={SOCIAL_IMAGES[currentImageIndex]}
                alt={`Shewekar social media ${currentImageIndex + 1}`}
              />

              {/* New image */}
              {isAnimating && (
                <img
                  className="social-feed-image next-image slide-in"
                  src={SOCIAL_IMAGES[nextImageIndex]}
                  alt={`Shewekar social media ${nextImageIndex + 1}`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile button */}
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="social-feed-follow mobile-follow"
      >
        <InstagramIcon />
        <span>Follow</span>
      </a>
    </section>
  );
}