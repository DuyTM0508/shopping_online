import { ImageSource } from "@/assets";
import PromoSectionLarge from "@/components/promo/promoSectionLarge";
import BaseUrl from "@/consts/baseUrl";

const HomePage = () => {
  return (
    <div>
      <PromoSectionLarge
        title={"Welcome to our store"}
        full_description={
          '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."'
        }
        pageHeaderBgImg={ImageSource.imgBgLandingPage}
        pageHeaderMinVh="90vh"
        pageHeaderRadius={""}
        titleButton="Our View"
        linkTo={BaseUrl.LandingPage}
      />
    </div>
  );
};

export default HomePage;
