import ProductSizes from "@/components/product/productSizes";
import ProductGallery from "@/components/product/productGallery";
import ProductRating from "@/components/product/productRating";
import { Button } from "@/components/ui/button";

interface Props {
  title: string;
  images: {
    src: string;
    alt: string;
  }[];
  full_description: string;
  price: number;
  highlights: string[];
  details: string;
  rating: number;
  reviews: number;
  sizes: Map<string, number>;
}

const ProductOverview = ({
  title,
  images,
  full_description,
  price,
  highlights,
  details,
  rating,
  reviews,
  sizes,
}: Props) => {
  return (
    <>
      <div className="container mx-auto p-6">
        <div className="flex flex-wrap lg:flex-nowrap">
          {images.length !== 0 && <ProductGallery images={images} />}
          <div className="w-full lg:w-1/2 lg:pl-6">
            {title.length !== 0 && (
              <h2 className="mt-4 text-2xl font-semibold">{title}</h2>
            )}
            {full_description.length !== 0 && (
              <p className="text-gray-700 mb-5">{full_description}</p>
            )}

            <form action="" method="post">
              {price && (
                <div className="flex items-center">
                  <h3 className="text-lg font-medium">
                    ${price.toLocaleString()}
                  </h3>
                  <input className="hidden" defaultValue={price} />
                </div>
              )}

              {rating !== 0 && (
                <>
                  <h3 className="sr-only">Reviews</h3>
                  <div className="mt-3 flex items-center">
                    <ProductRating rating={rating} />
                    <span className="text-gray-600 ml-3">
                      {reviews} reviews
                    </span>
                  </div>
                </>
              )}

              {sizes.size !== 0 && <ProductSizes sizes={sizes} />}

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
              talented at anything except for the ability to learn. That’s what
              I do. That’s what I’m here for. Don’t be afraid to be wrong
              because you can’t learn anything from a compliment.
            </p>
            {highlights.length !== 0 && (
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
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductOverview;
