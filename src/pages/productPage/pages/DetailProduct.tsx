import DialogConfirm from "@/components/dialogs/DialogConfirm";
import LoadingScreen from "@/components/loadingScreen";
import AddToCartForm from "@/components/product/addToCartForm";
import ProductGallery from "@/components/product/productGallery";
import ProductRating from "@/components/product/productRating";
import ReviewSummaryChart from "@/components/reviews/reviewSummaryChart";
import BaseUrl from "@/consts/baseUrl";
import { showError, showSuccess } from "@/helpers/toast";
import useToggleDialog from "@/hooks/useToggleDialog";
import { useAuth } from "@/providers/AuthenticationProvider";
import httpService from "@/services/httpService";
import cartService from "@/services/modules/cart/cartService";
import useGetDetailProduct from "@/services/modules/product/hooks/useGetDetailProduct";
import { useCartStore } from "@/stores/useStores";
import { useNavigate, useParams } from "react-router-dom";
import data from "../../../../public/data.json";

interface Props {}

let productReviews = data.reviews
  .filter((x) => x.productID == "01")
  .map((review) => ({
    ...review,
    productID: Number(review.productID),
  }));

const DetailProduct = ({}: Props) => {
  //!State
  const { isLogged } = useAuth();
  const param = useParams();
  const detailId = param.id || "";
  const { data: detailProduct, isLoading } = useGetDetailProduct(detailId, {
    isTrigger: !!detailId,
  });
  const addItem = useCartStore((state) => state.addItem);
  const itemExists = useCartStore((state) => state.itemExists);
  const sessionId = httpService.getSessionIdStorage();
  const [openAskLogin, toggleAskLogin, shouldRenderAskLogin] =
    useToggleDialog();
  const navigation = useNavigate();

  //!Function
  const handleAddToCart = async () => {
    if (!isLogged) {
      toggleAskLogin();
    } else {
      if (detailProduct && !itemExists(detailId)) {
        await cartService.postAddToCart(sessionId, detailId);
        addItem(detailProduct);
        showSuccess("Added to cart successfully");
      } else {
        showError("Item already exists in cart");
      }
    }
  };

  if (isLoading) return <LoadingScreen />;
  //!Render
  return (
    <>
      {shouldRenderAskLogin && (
        <DialogConfirm
          isOpen={openAskLogin}
          toggle={toggleAskLogin}
          title={"Login"}
          content={"You need to login to add to cart"}
          variantYes={"destructive"}
          onSubmit={() => navigation(BaseUrl.Login)}
        />
      )}
      <div className="component:DetailProduct container mx-auto p-6">
        <div className="flex flex-wrap lg:flex-nowrap">
          <ProductGallery
            images={detailProduct?.FileList}
            defaultImage={detailProduct?.Image}
          />

          <div className="w-full lg:w-1/2 lg:pl-6">
            <div className="mt-4 text-2xl font-semibold">
              {detailProduct?.Name}
            </div>
            <div className="text-gray-700 mb-5">
              {detailProduct?.Description}
            </div>

            <div className="flex items-center">
              <div className="text-lg font-medium">
                {detailProduct?.Price.toLocaleString()} VND
              </div>
              <input className="hidden" defaultValue={detailProduct?.Price} />
            </div>

            <>
              <div className="sr-only">Reviews</div>
              <div className="mt-3 flex items-center">
                <ProductRating rating={detailProduct?.Rating} />
                <span className="text-gray-600 ml-3">
                  {detailProduct?.Reviews} reviews
                </span>
              </div>
            </>

            {/* {sizes.size !== 0 && <ProductSizes sizes={sizes} />} */}

            <AddToCartForm handleAddToCart={handleAddToCart} />
          </div>
        </div>

        <div className="mt-10">
          <div className="lg:w-1/2">
            <div className="text-lg font-semibold">Product Description</div>
            <div className="text-gray-700 mt-2">
              {detailProduct?.Description}
            </div>
          </div>
        </div>

        <ReviewSummaryChart reviews={productReviews} />
      </div>
    </>
  );
};

export default DetailProduct;
