interface Props {
  images: {
    src: string;
    alt: string;
  }[];
}

export default function ProductFeatureImg({ images }: Props) {
  return (
    <>
      <div className="flex flex-col md:flex-row">
        <img
          className="mb-4 max-h-48 w-full rounded-3xl md:mb-0"
          src={`${import.meta.env.BASE_URL}images/product7.jpg`}
          alt={images[0].alt}
        />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <img
            className="max-h-48 w-full rounded-3xl"
            src={`${import.meta.env.BASE_URL}images/product8.jpg`}
            alt={images[2].alt}
          />
        </div>
        <div>
          <img
            className="max-h-48 w-full rounded-3xl"
            src={`${import.meta.env.BASE_URL}images/product9.jpg`}
            alt={images[3].alt}
          />
        </div>
      </div>
    </>
  );
}
