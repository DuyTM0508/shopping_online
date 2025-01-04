interface Props {
  images?: string[] | undefined;
  defaultImage: string | undefined;
}

const ProductGallery = ({ images, defaultImage }: Props) => {
  return (
    <>
      <div className="col-span-12 flex lg:col-span-6">
        <div className="block">
          {images?.map((imgae, index) => (
            <img
              key={index}
              className="mb-4 max-h-[150px] w-[90%] rounded-md"
              src={imgae}
            />
          ))}
        </div>
        <img
          className="w-[70%] rounded-md"
          src={defaultImage}
          // alt={images[0].alt}
        />
      </div>
    </>
  );
};

export default ProductGallery;
