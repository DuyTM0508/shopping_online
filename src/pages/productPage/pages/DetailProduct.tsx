import DialogConfirm from "@/components/dialogs/DialogConfirm";
import LoadingScreen from "@/components/loadingScreen";
import AddToCartForm from "@/components/product/addToCartForm";
import ProductGallery from "@/components/product/productGallery";
import ProductRating from "@/components/product/productRating";
import BaseUrl from "@/consts/baseUrl";
import { showError, showSuccess } from "@/helpers/toast";
import useToggleDialog from "@/hooks/useToggleDialog";
import { useAuth } from "@/providers/AuthenticationProvider";
import httpService from "@/services/httpService";
import cartService from "@/services/modules/cart/cartService";
import useGetDetailProduct from "@/services/modules/product/hooks/useGetDetailProduct";
import { useCartStore } from "@/stores/useStores";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { ShippingBenefits } from "../components/BenefitCard";

interface Props {}

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
      <div className="container mx-auto px-4 py-10 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row">
          <ProductGallery
            images={detailProduct?.FileList}
            defaultImage={detailProduct?.Image || ""}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full lg:w-1/2"
          >
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-3xl font-bold text-gray-900"
            >
              {detailProduct?.Name}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-4"
            >
              <ProductRating
                rating={detailProduct?.Rating}
                reviews={detailProduct?.Reviews}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 text-2xl font-bold text-gray-900"
            >
              {detailProduct?.Price.toLocaleString()} VND
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-6 text-gray-600"
            >
              {detailProduct?.Description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <AddToCartForm handleAddToCart={handleAddToCart} />
            </motion.div>
          </motion.div>
        </div>

        <div className="mt-20">
          <ShippingBenefits />
        </div>
      </div>
    </>
  );
};

export default DetailProduct;
