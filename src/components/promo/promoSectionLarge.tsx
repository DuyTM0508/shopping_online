import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import BaseUrl from "@/consts/baseUrl";

interface Props {
  title: string;
  full_description: string;
  pageHeaderBgImg: string;
  pageHeaderMinVh: string;
  pageHeaderRadius: string;
  titleButton: string;
  linkTo?: string;
}

const PromoSectionLarge = ({
  title,
  full_description,
  pageHeaderBgImg,
  pageHeaderMinVh,
  pageHeaderRadius,
  titleButton,
  linkTo,
}: Props) => {
  const navigate = useNavigate();
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
              <div className="mb-4 text-3xl font-bold text-white md:text-4xl">
                {title}
              </div>
              <div className="mb-6 text-lg text-white">{full_description}</div>
              <Button
                className="btn hover:bg-gray-200 rounded-lg bg-white px-6 py-3 text-lg text-black transition"
                variant={"primary"}
                onClick={() => navigate(linkTo || BaseUrl.HomePage)}
              >
                {titleButton}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoSectionLarge;
