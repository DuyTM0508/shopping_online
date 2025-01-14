import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

interface CartIconProps {
  count?: number;
  isLogged?: boolean;
  onCartClick?: () => void;
  onLoginClick?: () => void;
}

export default function CartIcon({
  count = 0,
  isLogged = false,
  onCartClick,
  onLoginClick,
}: CartIconProps) {
  const handleClick = () => {
    if (isLogged) {
      onCartClick?.();
    } else {
      onLoginClick?.();
    }
  };

  return (
    <div className="relative inline-flex">
      <button
        onClick={handleClick}
        className="relative rounded-full p-2 transition-colors hover:bg-accent"
        aria-label={`Shopping cart with ${count} items`}
      >
        <ShoppingCart className="h-6 w-6" />
        {count > 0 && (
          <span
            className={cn(
              "absolute right-0 top-0 -mr-1 -mt-1",
              "flex h-5 w-5 items-center justify-center",
              "rounded-full bg-yellow-400 text-xs font-medium",
              "ring-2 ring-background",
              "duration-300 animate-in zoom-in-50"
            )}
          >
            {count}
          </span>
        )}
      </button>
    </div>
  );
}
