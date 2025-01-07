import { OrderList } from "@/services/modules/order/interfaces/order.interface";
import OrderCardProduct from "./orderCardProduct";
import { Button } from "../ui/button";
import moment from "moment";
import { DateTimeFormat } from "../consts/dates";

interface Props {
  order: OrderList[];
}

export default function OrderSummaries({ order }: Props) {
  return (
    <>
      <div className="rounded-lg bg-[#f9fafb] p-4">
        {order.map((order, index) => (
          <>
            <div
              className="mb-4 flex flex-col items-center justify-between md:flex-row"
              key={index}
            >
              <div className="flex w-full flex-row justify-between">
                <div className="flex flex-col">
                  <div className="text-xl font-semibold">
                    Order #{order.OrderCode}
                  </div>
                  <div className="text-dark mb-0 mt-4 md:mt-0">
                    Order divlaced:{" "}
                    <b>
                      {moment(order.CreatedDate).format(
                        DateTimeFormat.FullDate
                      )}
                    </b>
                  </div>
                </div>
                <div>
                  <Button>View Invoice</Button>
                </div>
              </div>
            </div>

            <OrderCardProduct
              // product={product}
              status={order.Status}
              // quantity={quantity}
              address={order.Address}
              email={order.Email}
              phoneNumber={order.PhoneNumber}
            />
          </>
        ))}
      </div>
    </>
  );
}
