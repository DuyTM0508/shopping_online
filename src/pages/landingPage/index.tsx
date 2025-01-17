import { ImageSource } from "@/assets";
import CollectionSection from "@/components/product/cardCategory";
import ProductFeature from "@/components/product/productFeature";
import PromoSectionLarge from "@/components/promo/promoSectionLarge";
import BaseUrl from "@/consts/baseUrl";

const LandingPage = () => {
  //! State

  //! Function

  //! Render
  return (
    <div>
      <PromoSectionLarge
        title={"Discover Sustainable Style - Stunning Secondhand Clothes"}
        full_description={
          "Shop the best of pre-loved fashion at unbeatable prices."
        }
        pageHeaderBgImg={ImageSource.imgBgHomePage}
        pageHeaderMinVh="70vh"
        pageHeaderRadius={""}
        titleButton="Discover Now"
        linkTo={BaseUrl.ProductPage}
      />

      <div className="container my-5">
        <div className="mb-8 text-start">
          <div className="mb-2 text-xl font-bold">Shop by Category</div>
          {/* <Link to="#" className="text-dark font-semibold hover:underline">
            Browse all categories &#62;
          </Link> */}
        </div>

        <CollectionSection />
      </div>

      <PromoSectionLarge
        title="Basic Starter Pack"
        full_description={
          "Get the best of pre-loved fashion at unbeatable prices."
        }
        pageHeaderBgImg={ImageSource.imgBgHomePage2}
        pageHeaderMinVh="55vh"
        pageHeaderRadius="1rem"
        titleButton="Shop Now"
        linkTo={BaseUrl.ProductPage}
      />

      <div className="container my-5">
        <ProductFeature />
      </div>
    </div>
  );
};

export default LandingPage;
