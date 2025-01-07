import { Cart } from "@/services/modules/cart/interfaces/cart";

interface Props {
  data: Cart[];
}

const BillingInfo = ({ data }: Props) => {
  //!State

  //!Function

  //!Render
  return (
    <>
      <div className="rounded-lg bg-slate-700 p-10 text-white">
        <div className="mb-4 flex flex-col items-end">
          <div className="">Amount</div>
          <div className="typo-2">
            {data
              ?.reduce((total, item) => total + item?.Price, 0)
              .toLocaleString() + " VND"}
          </div>
        </div>
        {data.map((item, index) => (
          <div className="mb-4 flex gap-4" key={index}>
            <img
              src={item?.Image}
              alt="credit-card"
              className="w-20 rounded-lg"
            />
            <div className="ml-2 w-[24rem]">
              <div>{item?.ProductName}</div>
            </div>
            <div className=" text-end">{`${item?.Price.toLocaleString()} VND`}</div>
          </div>
        ))}

        <div className="flex flex-col">
          <div className="mb-4 flex justify-between">
            <div>Subtotal</div>
            <div className="">
              {data
                ?.reduce((total, item) => total + item.Price, 0)
                .toLocaleString() + " VND"}
            </div>
          </div>

          <div className="mb-4 flex justify-between">
            <div>Shipping Estimate</div>
            <div className="">0 VND</div>
          </div>

          <div className="mb-4 flex justify-between">
            <div>Tax</div>
            <div className="">0 VDN</div>
          </div>

          <hr className="mb-4"></hr>

          <div className="mb-4 flex justify-between">
            <div className="typo-1 font-bold">Total</div>
            <div className="">
              {data
                ?.reduce((total, item) => total + item?.Price, 0)
                .toLocaleString() + " VND"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BillingInfo;
