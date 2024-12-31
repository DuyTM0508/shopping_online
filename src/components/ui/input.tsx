import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  extraRight?: React.ReactNode;
  extraLeft?: React.ReactNode;
  isIcon?: boolean;
  iconText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, extraRight, extraLeft, isIcon, iconText, ...props },
    ref
  ) => {
    return (
      <div className="relative">
        {extraLeft && (
          <div className="absolute left-0 top-1/2 flex translate-y-[-50%] cursor-pointer justify-center pl-[12px] align-middle">
            {extraLeft}
          </div>
        )}
        <input
          type={type}
          className={cn(
            `flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
              type === "password" || extraRight ? "!pr-[48px]" : ""
            }
          ${extraLeft ? "!pl-[48px]" : ""}  
            `,
            className
          )}
          ref={ref}
          {...props}
        />
        {extraRight && (
          <div className="absolute right-0 top-1/2 flex translate-y-[-50%] cursor-pointer justify-center pr-[12px] align-middle">
            {extraRight}
          </div>
        )}
        {isIcon && (
          <div className="absolute bottom-3 right-3.5 2xl:bottom-1.5">
            {iconText}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
