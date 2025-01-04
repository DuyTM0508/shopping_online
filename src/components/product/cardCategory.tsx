import { Link } from "react-router-dom";

interface Props {
  thumb_src: string;
  title: string;
  collection: string;
  classList?: string;
  cta?: string;
}

export default function CardProduct({
  thumb_src,
  title,
  collection,
  classList,
  cta,
}: Props) {
  const baseURL = import.meta.env.BASE_URL;
  const classBody = cta ? "flex items-end" : "text-center w-100 pt-80";

  return (
    <Link to="#" className={`block ${classList}`}>
      <div className="card-background card relative mb-4 lg:mb-0">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${baseURL}${thumb_src})`,
          }}
        ></div>

        {/* Overlay */}
        <div className={`relative z-10 rounded-2xl p-4 ${classBody}`}>
          <div className="d-block mt-10">
            <div className="mb-1 font-semibold text-white">{collection}</div>
            <div className="font-black text-white">{title}</div>
            {/* {(cta != null) &&  */}
            <Link
              to="#"
              className="font-weight-semibold mb-0 text-sm text-white"
            >
              See products &#62;
            </Link>
            {/* } */}
          </div>
        </div>
      </div>
    </Link>
  );
}
