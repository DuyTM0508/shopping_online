import ReviewComment from "./reviewComment";
import ReviewRating from "./reviewRating";
import ReviewProgress from "./reviewProgress";
import { Button } from "../ui/button";

interface Props {
  reviews: {
    avatar: string;
    name: string;
    date: string;
    rating: number;
    comment: string;
    productID: number;
  }[];
}

export default function ReviewSummaryChart({ reviews }: Props) {
  let CommentsList: any = [];
  let rating = 0;

  reviews.map((review, index) => {
    rating += review.rating;
    CommentsList.push(<ReviewComment key={index} review={review} />);
  });

  rating = Math.trunc(rating / reviews.length);

  return (
    <>
      <div className="component:ReviewSumaryChart mx-auto mb-8 mt-20 w-full text-center md:w-3/5">
        <h3 className="text-xl font-bold">Our Customer’s Opinion</h3>
        <p className="text-gray-600">
          Society has put up so many boundaries, so many limitations on what’s
          right and wrong that it’s almost impossible to get a pure thought out.
        </p>
      </div>
      <div className="-mx-4 flex flex-wrap">
        <div className="w-full px-4 lg:w-5/12">
          <div className="bg-gray-50 mb-8 rounded-lg p-6">
            <h4 className="mb-4 text-lg font-semibold">Client Reviews</h4>
            <div className="flex items-center">
              <h6 className="mb-0 mr-2 text-xl font-semibold">{rating}</h6>
              <ReviewRating rating={rating} />
              <p className="text-gray-600 mb-0 ml-2">
                Based on <b>{reviews.length}</b> reviews
              </p>
            </div>
            <div className="my-6">
              <ReviewProgress reviews={reviews} />
            </div>
            <h5 className="text-lg font-semibold">We value your opinion</h5>
            <p className="text-gray-600 mb-6">
              The time is now for it to be okay to be great. People in this
              world shun people for being great.
            </p>
            <Button className=" w-full rounded-lg px-4 py-2 text-white">
              Write a review
            </Button>
          </div>
        </div>
        <div className="border-gray-200 max-h-96 w-full overflow-auto rounded-lg border px-4 lg:w-7/12">
          <div className="card">
            <div className="card-body">{CommentsList}</div>
          </div>
        </div>
      </div>
    </>
  );
}
