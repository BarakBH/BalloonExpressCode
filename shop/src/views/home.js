import React from "react";
import ProductsGrid from "../components/productsGrid";
import ShopDetail from "../components/shopDetail";
import CategoriesSlider from "../components/sliders/categoriesSlider";
import FeaturedProducts from "../components/sliders/featuredProducts";
import { useSelector } from "react-redux";
import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

const Home = () => {
  const { products } = useSelector((state) => state.DataReducer);
  return (
    <main className="main">
      <FeaturedProducts />
      <CategoriesSlider />
      <ProductsGrid products={products} />
      <LightGallery speed={500} plugins={[lgThumbnail, lgZoom]}>
        {/* <a href="/ballons1.jpeg">
          <img alt="img1" src="/ballons1.jpeg" />
        </a>
        <a href="/ballons2.jpeg">
          <img alt="img2" src="/ballons2.jpeg" />
        </a>
        <a href="/ballons3.jpeg">
          <img alt="img3" src="/ballons3.jpeg" />
        </a>
        <a href="/ballons4.jpeg">
          <img alt="img4" src="/ballons4.jpeg" />
        </a>
        <a href="/ballons5.jpeg">
          <img alt="img5" src="/ballons5.jpeg" />
        </a>
        <a href="/ballons6.jpeg">
          <img alt="img6" src="/ballons6.jpeg" />
        </a> */}
      </LightGallery>
      <ShopDetail />
    </main>
  );
};

export default Home;
