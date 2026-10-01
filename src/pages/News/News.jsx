
import { Link } from "react-router-dom";
import { useEffect } from "react";
import "./News.css";

const newsItems = [
  {
    id: 1,
    slug: "winning-at-the-international-design-architecture-awards-london-2022",
    title:
      "Winning at The International Design & Architecture Awards - London 2022",
    date: "Oct 23, 2022",
    image:
      "https://images.pexels.com/photos/8089161/pexels-photo-8089161.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: 2,
    slug: "the-design-show-2022-here-we-come",
    title: "The Design Show 2022 - Here We Come",
    date: "Oct 23, 2022",
    image:
      "https://images.pexels.com/photos/7534563/pexels-photo-7534563.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: 3,
    slug: "venturing-onto-rugs",
    title: "Venturing Onto Rugs",
    date: "Oct 23, 2022",
    image:
      "https://images.pexels.com/photos/19064708/pexels-photo-19064708.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: 4,
    slug: "honorary-award-at-cda-2021",
    title: "Honorary Award at CDA 2021",
    date: "Oct 23, 2022",
    image:
      "https://images.pexels.com/photos/26886880/pexels-photo-26886880.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: 5,
    slug: "londons-top-drawer-2019",
    title: "London’s Top Drawer 2019",
    date: "Jan 10, 2019",
    image:
      "https://images.pexels.com/photos/7545776/pexels-photo-7545776.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: 6,
    slug: "shewekar-launch-event-at-alismaelias-kodak-space-2019",
    title:
      "Shewekar Launch Event at Alismaelia’s Kodak Space 2019",
    date: "Jun 6, 2016",
    image:
      "https://images.pexels.com/photos/26729545/pexels-photo-26729545.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: 7,
    slug: "a-new-perspective-on-modern-furniture",
    title: "A New Perspective on Modern Furniture",
    date: "Sep 12, 2026",
    image:
      "https://images.pexels.com/photos/20035979/pexels-photo-20035979.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: 8,
    slug: "contemporary-design-and-timeless-spaces",
    title: "Contemporary Design and Timeless Spaces",
    date: "Sep 20, 2026",
    image:
      "https://images.pexels.com/photos/7045829/pexels-photo-7045829.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
];

function News() {
  /*
    Make sure the News page always starts
    from the top when opened.
  */
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, []);

  return (
    <main className="news-page">
      <div className="news-page-container">

        <div className="news-grid">
          {newsItems.map((news) => (
            <Link
              key={news.id}
              to={`/news/${news.slug}`}
              className="news-page-card"
            >
              <div className="news-page-image-wrapper">
                <img
                  src={news.image}
                  alt={news.title}
                  className="news-page-image"
                />
              </div>

              <div className="news-page-content">
                <span className="news-page-date">
                  {news.date}
                </span>

                <h2>{news.title}</h2>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}

export default News;

