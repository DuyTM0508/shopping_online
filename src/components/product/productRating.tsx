import { Link } from "react-router-dom";

interface Props {
  rating: number | undefined;
  reviews?: number;
}

const ProductRating = ({ rating = 0, reviews }: Props) => {
  const ratingStar = [];
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      ratingStar.push(
        <svg
          key={`filled-${i}`}
          className="w-5 flex-shrink-0 text-yellow-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
            clipRule="evenodd"
          />
        </svg>
      );
    } else {
      ratingStar.push(
        <svg
          key={`empty-${i}`}
          className="text-gray-300 w-5 flex-shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
            clipRule="evenodd"
          />
        </svg>
      );
    }
  }

  return (
    <>
      <div className="flex items-center">
        <div className="mb-0 mr-2 font-bold">4.5</div>
        {ratingStar}
        <Link
          to="#"
          className="text-gray-500 hover:text-gray-700 ml-3 text-sm font-medium"
        >
          See all {reviews} reviews
        </Link>
      </div>
    </>
  );
};

export default ProductRating;
