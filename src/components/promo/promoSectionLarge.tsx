interface Props {
  title: string;
  full_description: string;
  pageHeaderBgImg: string;
  pageHeaderMinVh: string;
  pageHeaderRadius: string;
}

const PromoSectionLarge = ({
  title,
  full_description,
  pageHeaderBgImg,
  pageHeaderMinVh,
  pageHeaderRadius,
}: Props) => {
  return (
    <section className="mb-8">
      <div
        className="relative flex items-center justify-center py-5 md:py-0"
        style={{
          backgroundImage: `url(${pageHeaderBgImg})`,
          minHeight: pageHeaderMinVh,
          borderRadius: pageHeaderRadius,
        }}
      >
        <div className={`absolute inset-0 bg-black opacity-60`}></div>
        <div className="container relative z-10">
          <div className="flex justify-center">
            <div className="max-w-2xl text-center">
              <h1 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                {title}
              </h1>
              <p className="mb-6 text-lg text-white">{full_description}</p>
              <button className="btn rounded-lg bg-white px-6 py-3 text-lg text-black transition hover:bg-gray-200">
                Explore New Collection
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoSectionLarge;
