import React from "react";

type ColorVariant = "blue" | "red" | "green" | "yellow" | "purple" | "gray";
type SizeVariant = "sm" | "md" | "lg";

interface PillProps {
  children: React.ReactNode;
  color?: ColorVariant;
  size?: SizeVariant;
}

const Pill = ({ children, color = "blue", size = "md" }: PillProps) => {
  const colorVariants: Record<ColorVariant, string> = {
    blue: "bg-blue-100 text-blue-800",
    red: "bg-red-100 text-red-800",
    green: "bg-green-100 text-green-800",
    yellow: "bg-yellow-100 text-yellow-800",
    purple: "bg-purple-100 text-purple-800",
    gray: "bg-gray-100 text-gray-800",
  };

  const sizeVariants: Record<SizeVariant, string> = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-1.5",
  };

  return (
    <span
      className={`
        inline-flex items-center justify-center
        rounded-full font-medium
        ${colorVariants[color]}
        ${sizeVariants[size]}
      `}
    >
      {children}
    </span>
  );
};

export default Pill;
