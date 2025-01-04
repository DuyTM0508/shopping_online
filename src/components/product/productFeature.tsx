import ProductFeatureDetails from "./productFeatureDetails";
import ProductFeatureImg from "./productFeatureImg";

export default function ProductFeature({
  title,
  images,
  full_description,
  featuresDetails,
}: any) {
  return (
    <>
      <div className="rounded-lg bg-white p-6">
        <div className="mx-auto max-w-2xl text-center">
          {title.length !== 0 && (
            <h2 className="mb-3 text-2xl font-semibold">{title}</h2>
          )}
          {full_description.length !== 0 && (
            <div className="text-gray-600 mb-5">{full_description}</div>
          )}
        </div>
        <div className="mt-5 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div>
            <div className="mb-5">
              <div className="mb-3 text-xl font-medium">
                Product Description
              </div>
              <div className="text-gray-600 mb-5">
                Society has put up so many boundaries, so many limitations on
                what’s right and wrong that it’s almost impossible to get a pure
                thought out...
              </div>
            </div>
            {featuresDetails && (
              <ProductFeatureDetails featuresDetails={featuresDetails} />
            )}
          </div>
          <div>
            <ProductFeatureImg images={images} />
          </div>
        </div>
      </div>
    </>
  );
}
