import CardProduct from "@/components/product/cardCategory";
import ProductFeature from "@/components/product/productFeature";
import PromoSectionLarge from "@/components/promo/promoSectionLarge";
import data from "../../../public/data.json";
import { Link } from "react-router-dom";

const LandingPage = () => {
  //! State

  //! Function

  //! Render
  return (
    <div>
      <PromoSectionLarge
        title={"Collection is here"}
        full_description={data.products[0].full_description || ""}
        pageHeaderBgImg={"../images/bg2.jpg"}
        pageHeaderMinVh="90vh"
        pageHeaderRadius={""}
      />
      <div className="container my-5">
        <div className="mb-8 text-center">
          <h3 className="mb-2 text-xl font-bold">Shop by Category</h3>
          <Link to="#" className="text-dark font-semibold hover:underline">
            Browse all categories &#62;
          </Link>
        </div>
        <div className="row mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {data.categories.slice(0, 4).map((category, index) => (
            <div className="col-md-6 col-lg-3" key={index}>
              <CardProduct
                thumb_src={`..${category.thumb_src}`}
                collection={category.collection}
                title={category.title}
              />
            </div>
          ))}
        </div>

        <PromoSectionLarge
          title="Basic Starter Pack"
          full_description={data.products[0].full_description || ""}
          pageHeaderBgImg={"../images/bg2.jpg"}
          pageHeaderMinVh="50vh"
          pageHeaderRadius="1rem"
        />
        <div className="my-5">
          <ProductFeature
            title="Product Features"
            images={data.products[2].images || []}
            full_description="Society has put up so many boundaries..."
            featuresDetails={data.products[0].featuresDetails}
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
