import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import Link from "next/link";

const link = cva("a", {
  variants: {
    mode: {
      practice: [
        "bg-slate-700",
        "hover:bg-gradient-to-r",
        "from-[#0284C7]",
        "to-[#2DD48F]",
        "rounded-xl",
        "p-[2px]",
        "w-[350px]",
        "h-[350px]",
        "cursor-pointer",
      ],
      exam: [
        "bg-slate-700",
        "hover:bg-gradient-to-r",
        "from-[#F97316]",
        "to-[#FACC15]",
        "rounded-xl",
        "p-[2px]",
        "w-[350px]",
        "h-[350px]",
        "cursor-pointer",
      ],
    },
    size: {
      large: ["w-[350px]", "h-[350px]"],
    },
    compoundVariants: {
      mode: ["practice", "exam"],
      size: "large",
    },
    defaultVariants: {
      mode: "practice",
      size: "large",
    },
  },
});

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof link> {
  href: string;
  heading: string;
  paragraph: string;
  containerClassName?: string;
  headingClassName?: string;
  paragraphClassName?: string;
}

export const CustomLink: React.FC<LinkProps> = ({
  mode,
  size,
  heading,
  paragraph,
  containerClassName,
  headingClassName,
  paragraphClassName,
  ...props
}) => (
  <Link href={props.href}>
    <div
      className={`${link({ mode, size })} rounded-xl p-[2px] cursor-pointer`}
    >
      <div className={containerClassName}>
        <h2 className={headingClassName}>{heading}</h2>
        <p className={paragraphClassName}>{paragraph}</p>
      </div>
    </div>
  </Link>
);
