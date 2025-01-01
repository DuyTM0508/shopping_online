import ProductGallery from "@/components/product/productGallery";
import ProductRating from "@/components/product/productRating";
import ReviewSummaryChart from "@/components/reviews/reviewSummaryChart";
import { Button } from "@/components/ui/button";
import useGetDetailProduct from "@/services/modules/product/hooks/useGetDetailProduct";
import { useParams } from "react-router-dom";
interface Props {}
import data from "../../../../public/data.json";
let productReviews = data.reviews
  .filter((x) => x.productID == "01")
  .map((review) => ({
    ...review,
    productID: Number(review.productID),
  }));

const DetailProduct = ({}: Props) => {
  //!State
  const param = useParams();
  const detailId = param.id || "";
  const { data: detailProduct, isLoading } = useGetDetailProduct(detailId, {
    isTrigger: !!detailId,
  });
  //!Function
  if (isLoading) return <div>Loading...</div>;

  //!Render
  return (
    <>
      <>
        <div className="component:DetailProduct container mx-auto p-6">
          <div className="flex flex-wrap lg:flex-nowrap">
            <ProductGallery
              images={detailProduct?.FileList}
              defaultImage={detailProduct?.Image}
            />

            <div className="w-full lg:w-1/2 lg:pl-6">
              <h2 className="mt-4 text-2xl font-semibold">
                {detailProduct?.Name}
              </h2>
              <p className="text-gray-700 mb-5">{detailProduct?.Description}</p>

              <form action="" method="post">
                <div className="flex items-center">
                  <h3 className="text-lg font-medium">
                    ${detailProduct?.Price.toLocaleString()}
                  </h3>
                  <input
                    className="hidden"
                    defaultValue={detailProduct?.Price}
                  />
                </div>

                <>
                  <h3 className="sr-only">Reviews</h3>
                  <div className="mt-3 flex items-center">
                    <ProductRating rating={detailProduct?.Rating} />
                    <span className="text-gray-600 ml-3">
                      {detailProduct?.Reviews} reviews
                    </span>
                  </div>
                </>

                {/* {sizes.size !== 0 && <ProductSizes sizes={sizes} />} */}

                <Button
                  className=" mt-4 rounded-md bg-black px-6 py-2 text-lg text-white"
                  type="submit"
                  variant={"default"}
                >
                  Add to cart
                </Button>
              </form>
            </div>
          </div>

          <div className="mt-10">
            <div className="lg:w-1/2">
              <h4 className="text-lg font-semibold">Product Description</h4>
              <p className="text-gray-700 mt-2">
                There’s nothing I really wanted to do in life that I wasn’t able
                to get good at. That’s my skill. I’m not really specifically
                talented at anything except for the ability to learn. That’s
                what I do. That’s what I’m here for. Don’t be afraid to be wrong
                because you can’t learn anything from a compliment.
              </p>
              {/* {highlights.length !== 0 && (
                <>
                  <h6 className="mt-4 text-sm font-semibold">Benefits</h6>
                  <ul className="text-gray-600 list-inside list-disc">
                    {highlights.map((highlight, index) => (
                      <li key={index} className="mb-2">
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {details.length !== 0 && (
                <>
                  <h6 className="mt-4 text-sm font-semibold">
                    More about product
                  </h6>
                  <p className="text-gray-600 mt-2">{details}</p>
                </>
              )} */}
            </div>
          </div>

          <ReviewSummaryChart reviews={productReviews} />
        </div>
      </>
    </>
  );
};

export default DetailProduct;
