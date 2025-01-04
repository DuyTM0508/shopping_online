import ReviewComment from "./reviewComment";

interface Props {
  reviews: {
    avatar: string;
    name: string;
    date: string;
    rating: number;
    comment: string;
  }[];
}

export default function ReviewSimple({ reviews }: Props) {
  let CommentsList: any = [];

  reviews.map((review) => {
    CommentsList.push(<ReviewComment review={review} />);
  });
  return (
    <>
      <div className="w-md-60 mx-auto mb-5 text-center">
        <div>Our Customer’s Opinion</div>
        <div>
          Society has put up so many boundaries, so many limitations on what’s
          right and wrong that it’s almost impossible to get a pure thought out.{" "}
        </div>
      </div>
      <div className="w-100 w-md-80 w-lg-60 mx-auto">{CommentsList}</div>
    </>
  );
}
