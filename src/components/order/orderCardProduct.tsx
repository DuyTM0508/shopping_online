import { CheckCircle2, CreditCard, Package, Truck } from "lucide-react";

interface OrderCardProductProps {
  status: number;
  address: string;
  email: string;
  phoneNumber: string;
}

const statusConfig = {
  width: {
    1: "w-1/5",
    2: "w-2/5",
    3: "w-3/5",
    4: "w-4/5",
    5: "w-full",
  },
  color: {
    notPaid: "bg-red-500",
    placed: "bg-orange-500",
    processed: "bg-yellow-500",
    shipped: "bg-blue-500",
    delivered: "bg-green-500",
  },
};

export default function OrderCardProduct({
  status,
  address,
  email,
  phoneNumber,
}: OrderCardProductProps) {
  const progressWidth =
    statusConfig.width[status as keyof typeof statusConfig.width] || "w-0";

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Delivery Address</h3>
          <p className="text-sm text-muted-foreground">{address}</p>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Shipping Updates</h3>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{email}</p>
            <p className="text-sm text-muted-foreground">{phoneNumber}</p>
          </div>
          {/* <Button variant="outline" size="sm" className="mt-2">
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Button> */}
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-center text-sm text-muted-foreground">
          Preparing to ship on March 24, 2021
        </p>

        <div className="h-2 rounded-full bg-gray-100">
          <div
            className={`h-2 rounded-full bg-blue-600 transition-all duration-500 ${progressWidth}`}
          />
        </div>

        <div className="grid grid-cols-5 gap-4">
          <StatusStep
            icon={<CreditCard className="h-5 w-5" />}
            label="Not Paid"
            color={statusConfig.color.notPaid}
            isActive={status >= 1}
          />
          <StatusStep
            icon={<Package className="h-5 w-5" />}
            label="Order placed"
            color={statusConfig.color.placed}
            isActive={status >= 2}
          />
          <StatusStep
            icon={<Package className="h-5 w-5" />}
            label="Processed"
            color={statusConfig.color.processed}
            isActive={status >= 3}
          />
          <StatusStep
            icon={<Truck className="h-5 w-5" />}
            label="Shipped"
            color={statusConfig.color.shipped}
            isActive={status >= 4}
          />
          <StatusStep
            icon={<CheckCircle2 className="h-5 w-5" />}
            label="Delivered"
            color={statusConfig.color.delivered}
            isActive={status >= 5}
          />
        </div>
      </div>
    </div>
  );
}

interface StatusStepProps {
  icon: React.ReactNode;
  label: string;
  color: string;
  isActive: boolean;
}

function StatusStep({ icon, label, color, isActive }: StatusStepProps) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`mb-2 flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-200 ${
          isActive ? color : "bg-gray-200"
        }`}
      >
        <div className="text-white">{icon}</div>
      </div>
      <p
        className={`text-center text-sm font-medium ${
          isActive ? "text-gray-900" : "text-gray-500"
        }`}
      >
        {label}
      </p>
    </div>
  );
}
