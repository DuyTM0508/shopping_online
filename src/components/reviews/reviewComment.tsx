import { Link } from "react-router-dom";
import ReviewRating from "./reviewRating";
import { memo } from "react";

interface Props {
  review: {
    avatar: string;
    name: string;
    date: string;
    rating: number;
    comment: string;
  };
}

const ReviewComment = ({ review }: Props) => {
  return (
    <>
      <div className="my-5 block">
        <ReviewRating rating={review.rating} />
        <div className="text-gray-600 mt-4 text-sm">{review.comment}</div>
        <div className="mt-4 flex items-center">
          <Link
            to="#"
            className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-full"
          >
            <img
              alt="Image placeholder"
              src={review.avatar}
              className="h-full w-full object-cover"
            />
          </Link>
          <div className="ml-3">
            <div className="text-gray-800 mb-0 text-base font-medium">
              {review.name}
            </div>
            <div className="text-gray-500 text-sm">{review.date}</div>
          </div>
        </div>
      </div>
      <hr className="border-gray-300" />
    </>
  );
};

export default memo(ReviewComment);
