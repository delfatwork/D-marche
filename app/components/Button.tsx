import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  hierarchy?: "primary" | "secondary" | "quiet" | "danger";
};

export default function Button({ hierarchy = "primary", className, type = "button", style, children, ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={`btn ${hierarchy}${className ? ` ${className}` : ""}`}
      style={{ width: "fit-content", ...style }}
      {...props}
    >
      {children}
    </button>
  );
}
