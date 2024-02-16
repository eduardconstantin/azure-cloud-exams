import Link, { LinkProps } from "next/link";
import clsx from "clsx";
import { AnchorHTMLAttributes } from "react";

interface NameLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">,
    LinkProps {
  heading: string;
  paragraph: string;
  wrapperClassNames?: string;
  headingClassNames?: string;
}

const NameLink = ({
  heading,
  paragraph,
  wrapperClassNames,
  headingClassNames,
  ...linkProps
}: NameLinkProps) => {
  return (
    <Link
      {...linkProps}
      className={clsx(
        wrapperClassNames,
        `group bg-slate-700 hover:bg-gradient-to-r rounded-xl p-[2px] w-full h-[100px] cursor-pointer`,
      )}
    >
      <div
        className={clsx(
          headingClassNames,
          "flex flex-col justify-center items-center h-full bg-slate-800 rounded-xl px-7",
        )}
      >
        <h2 className="text-white group-hover:bg-gradient-to-r group-hover:text-transparent bg-clip-text uppercase text-xl font-bold">
          {heading}
        </h2>
        <p className="text-xs text-slate-400 mt-1">{paragraph}</p>
      </div>
    </Link>
  );
};

export default NameLink;
