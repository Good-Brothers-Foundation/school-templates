import { ReactNode, HTMLAttributes } from "react";
import clsx from "clsx";

type WrapperProps = {
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export default function Wrapper({
  children,
  className,
  ...props
}: WrapperProps) {
  return (
    <div
      className={clsx("w-full max-w-310 px-4 mx-auto", className)}
      {...props}
    >
      {children}
    </div>
  );
}