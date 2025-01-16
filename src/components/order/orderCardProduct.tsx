interface Props {
  // product: {
  //   id: string;
  //   thumb_src: string;
  //   thumb_alt: string;
  //   title: string;
  //   price: number;
  //   description: string;
  // };
  // quantity: number;
  status: number;
  address: string;
  email: string;
  phoneNumber: string;
}

export default function OrderCardProduct({
  status,
  address,
  email,
  // quantity,
  phoneNumber,
}: Props) {
  let widthClass = "";

  switch (status) {
    case 5:
      widthClass = "w-1/5";
      break;
    case 1:
      widthClass = "w-2/5";
      break;
    case 2:
      widthClass = "w-3/5";
      break;
    case 3:
      widthClass = "w-4/5";
      break;
    case 4:
      widthClass = "w-full";
  }

  return (
    <div className="card mb-4 border p-3 shadow-sm md:p-4">
      <div className="flex flex-col border-b pb-4 md:flex-row">
        {/* <div className="flex-1 md:w-2/12">
          <img
            className="mb-3 w-full rounded-lg md:mb-0"
            src={`${product.thumb_src}`}
            alt={product.thumb_alt}
          />
        </div> */}
        {/* <div className="flex-1 md:w-5/12"> */}
        {/* <h5 className="text-lg">{product.title}</h5>
          <h6 className="text-sm font-bold">
            ${product.price.toLocaleString()}
          </h6> */}
        {/* <p className="mb-0 text-sm opacity-80">{product.description}</p> */}
        {/* <p className="text-dark mt-2 text-sm">
            <b>Quantity:</b> {quantity}
          </p>
        </div> */}
        <div className="mt-4 flex-1 md:mt-0 md:w-3/12">
          <h5 className="text-lg">Delivery Address</h5>
          <p className="mb-0 text-sm opacity-80">{address}</p>
        </div>
        <div className="mt-4 flex-1 md:mt-0 md:w-2/12">
          <h5 className="text-lg">Shipping Updates</h5>
          <p className="mb-2 text-sm opacity-80">{email}</p>
          <p className="text-sm opacity-80">{phoneNumber}</p>
          <a className="btn btn-white btn-sm" href="#">
            Edit
          </a>
        </div>
      </div>
      <div className="mt-4">
        <h6 className="text-center">Preparing to ship on March 24, 2021</h6>
        <div className="progress my-4 h-2 rounded-full bg-slate-300">
          <div
            className={`progress-bar bg-black ${widthClass} h-2 rounded-full`}
            role="progressbar"
          ></div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-center">
            <div className="icon icon-shape icon-sm mx-auto mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white">
              <svg
                width="16"
                height="16"
                viewBox="0 0 20 20"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4 4C2.89543 4 2 4.89543 2 6V7H18V6C18 4.89543 17.1046 4 16 4H4Z"></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18 9H2V14C2 15.1046 2.89543 16 4 16H16C17.1046 16 18 15.1046 18 14V9ZM4 13C4 12.4477 4.44772 12 5 12H6C6.55228 12 7 12.4477 7 13C7 13.5523 6.55228 14 6 14H5C4.44772 14 4 13.5523 4 13ZM9 12C8.44772 12 8 12.4477 8 13C8 13.5523 8.44772 14 9 14H10C10.5523 14 11 13.5523 11 13C11 12.4477 10.5523 12 10 12H9Z"
                ></path>
              </svg>
            </div>
            <p className="font-semibold">Not Paid</p>
          </div>
          <div className="text-center">
            <div className="icon icon-shape icon-sm mx-auto mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM11.7071 6.70711C12.0976 6.31658 12.0976 5.68342 11.7071 5.29289C11.3166 4.90237 10.6834 4.90237 10.2929 5.29289L7 8.5858L5.70711 7.29289C5.31658 6.90237 4.68342 6.90237 4.29289 7.29289C3.90237 7.68342 3.90237 8.3166 4.29289 8.7071L6.29289 10.7071C6.68342 11.0976 7.31658 11.0976 7.70711 10.7071L11.7071 6.70711Z"
                  fill="white"
                />
              </svg>
            </div>
            <p className="text-dark font-semibold">Order placed</p>
          </div>

          <div className="text-center">
            <div className="icon icon-shape icon-sm mx-auto mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500 text-white">
              <svg
                width="16"
                height="16"
                viewBox="0 0 20 20"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4 4C2.89543 4 2 4.89543 2 6V7H18V6C18 4.89543 17.1046 4 16 4H4Z"></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18 9H2V14C2 15.1046 2.89543 16 4 16H16C17.1046 16 18 15.1046 18 14V9ZM4 13C4 12.4477 4.44772 12 5 12H6C6.55228 12 7 12.4477 7 13C7 13.5523 6.55228 14 6 14H5C4.44772 14 4 13.5523 4 13ZM9 12C8.44772 12 8 12.4477 8 13C8 13.5523 8.44772 14 9 14H10C10.5523 14 11 13.5523 11 13C11 12.4477 10.5523 12 10 12H9Z"
                ></path>
              </svg>
            </div>
            <p className="font-semibold">Processed</p>
          </div>

          <div className="text-center">
            <div className="icon icon-shape icon-sm mx-auto mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 bg-secondary text-white">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.5 12.875C6.5 13.4963 5.99632 14 5.375 14C4.75368 14 4.25 13.4963 4.25 12.875C4.25 12.2537 4.75368 11.75 5.375 11.75C5.99632 11.75 6.5 12.2537 6.5 12.875Z"
                  fill="white"
                />
                <path
                  d="M11.75 12.875C11.75 13.4963 11.2463 14 10.625 14C10.0037 14 9.5 13.4963 9.5 12.875C9.5 12.2537 10.0037 11.75 10.625 11.75C11.2463 11.75 11.75 12.2537 11.75 12.875Z"
                  fill="white"
                />
                <path
                  d="M2.75 3.5C2.33579 3.5 2 3.83579 2 4.25V11.75C2 12.1642 2.33579 12.5 2.75 12.5H3.53751C3.71123 11.6442 4.46789 11 5.375 11C6.28211 11 7.03877 11.6442 7.21249 12.5H8C8.41423 12.5 8.75 12.1642 8.75 11.75V4.25C8.75 3.83579 8.41423 3.5 8 3.5H2.75Z"
                  fill="white"
                />
                <path
                  d="M11 5.75C10.5858 5.75 10.25 6.08579 10.25 6.5V11.0375C10.3712 11.0129 10.4966 11 10.625 11C11.5321 11 12.2888 11.6442 12.4625 12.5H13.25C13.6642 12.5 14 12.1642 14 11.75V4.25C14 3.83579 13.6642 3.5 13.25 3.5H11Z"
                  fill="white"
                />
              </svg>
            </div>
            <p className="font-semibold">Shipped</p>
          </div>

          <div className="text-center">
            <div className="icon icon-shape icon-sm mx-auto mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM11.7071 6.70711C12.0976 6.31658 12.0976 5.68342 11.7071 5.29289C11.3166 4.90237 10.6834 4.90237 10.2929 5.29289L7 8.5858L5.70711 7.29289C5.31658 6.90237 4.68342 6.90237 4.29289 7.29289C3.90237 7.68342 3.90237 8.3166 4.29289 8.7071L6.29289 10.7071C6.68342 11.0976 7.31658 11.0976 7.70711 10.7071L11.7071 6.70711Z"
                  fill="white"
                />
              </svg>
            </div>
            <p className="font-semibold">Delivered</p>
          </div>
        </div>
      </div>
    </div>
  );
}
