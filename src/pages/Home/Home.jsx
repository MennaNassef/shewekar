import Hero from "./Hero";
import CollectionsSection from "./CollectionsSection";
import HomeInteriors from "./HomeInteriors";
import HomeBusiness from "./HomeBusiness";
import NewArrivals from "./NewArrivals";
import HomeInteriorProjects from "./HomeShewekarInteriors";
import Newsletter from "./Newsletter";
import SocialMediaFeed from "./SocialMediaFeed";
import HomeShewekarNews from "./HomeShewekarNews";
import PopularProducts from "./PopularProducts";
import Bestsellers from "./Bestsellers";

function Home() {
  return (
    <>
      <Hero />

      <CollectionsSection />

      <HomeInteriors />

      <NewArrivals />

      <PopularProducts />
      <HomeInteriorProjects/>
      <Bestsellers />
      <SocialMediaFeed/>
      <HomeShewekarNews />
      <HomeBusiness />


      <Newsletter />
    </>
  );
}

export default Home;