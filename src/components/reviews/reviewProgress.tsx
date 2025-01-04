interface Props {
  reviews: {
    avatar: string;
    name: string;
    date: string;
    rating: number;
    comment: string;
  }[];
}

export default function ReviewProgress({ reviews }: Props) {
  let ratings = [0, 0, 0, 0, 0, 0];
  let ratingsPercentage = [0, 0, 0, 0, 0, 0];

  reviews.forEach((review) => {
    ratings[review.rating]++;
  });

  for (let i = 1; i < 6; i++) {
    ratingsPercentage[i] = Math.trunc((ratings[i] * 100) / reviews.length);
  }

  return (
    <>
      {[5, 4, 3, 2, 1].map((rating) => (
        <div key={rating} className="mb-4 flex items-center">
          <div className="flex items-center">
            <div className="mb-0 font-bold">{rating}</div>
            <svg
              className="mx-2 h-5 w-5 flex-shrink-0 text-yellow-500"
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
          </div>
          <div className="mx-3 h-3 w-full overflow-hidden rounded-lg bg-gray">
            <div
              className="h-full bg-yellow-500"
              style={{ width: `${ratingsPercentage[rating]}%` }}
            ></div>
          </div>
          <div className="text-sm font-bold">{ratingsPercentage[rating]}%</div>
        </div>
      ))}
    </>
  );
}
