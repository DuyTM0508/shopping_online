import { ImageSource } from "@/assets";
import { Link } from "react-router-dom";
import CommonIcons from "../commonIcons";

export default function CollectionSection() {
  return (
    <section className="mx-auto grid grid-cols-2 gap-3">
      <Link to="#" className="group block">
        <div className="relative overflow-hidden">
          <img
            src={ImageSource.category1}
            alt=""
            className="flex max-h-[30rem] w-full transform rounded-xl object-cover duration-500 group-hover:scale-110"
          />
        </div>
        <div className="text-dark flex items-center gap-1 px-3 py-2">
          Gaid
          <CommonIcons.MoveRight />
        </div>
      </Link>
      <Link to="#" className="group block">
        <div className="relative overflow-hidden">
          <img
            src={ImageSource.category2}
            alt=""
            className="flex max-h-[30rem] w-full transform rounded-xl object-cover duration-500 group-hover:scale-110"
          />
        </div>
        {/* <div className="text-dark flex items-center gap-1 px-3 py-2">
          Gaid
          <CommonIcons.MoveRight />
        </div> */}
      </Link>
    </section>
  );
}
