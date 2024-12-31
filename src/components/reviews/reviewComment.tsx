import { Link } from "react-router-dom";
import ReviewRating from "./reviewRating";

interface Props {
  review: {
    avatar: string;
    name: string;
    date: string;
    rating: number;
    comment: string;
  };
}

export default function ReviewComment({ review }: Props) {
  return (
    <>
      <div className="d-block my-5">
        <ReviewRating rating={review.rating} />
        <p className="mt-4 text-sm">{review.comment}</p>
        <div className="d-flex align-items-center">
          <Link
            to="#"
            className="avatar avatar-lg rounded-circle min-width-50 min-height-50"
          >
            <img alt="Image placeholder" src={review.avatar} />
          </Link>
          <div className="ms-3">
            <h6 className="mb-0">{review.name}</h6>
            <p className="mb-2 text-sm">{review.date}</p>
          </div>
        </div>
      </div>
      <hr className="horizontal dark" />
    </>
  );
}
