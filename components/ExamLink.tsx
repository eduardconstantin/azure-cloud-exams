import Link, { LinkProps } from "next/link";
import clsx from "clsx";
import { AnchorHTMLAttributes } from "react";

interface ExamLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">,
    LinkProps {
  heading: string;
  paragraph: string;
  wrapperClassNames?: string;
  headingClassNames?: string;
}

const ExamLink = ({
  heading,
  paragraph,
  wrapperClassNames,
  headingClassNames,
  ...linkProps
}: ExamLinkProps) => {
  return (
    <Link
      {...linkProps}
      className={clsx(
        wrapperClassNames,
        "group bg-slate-700 hover:bg-gradient-to-r rounded-xl p-[2px] w-full h-[350px] cursor-pointer"
      )}
    >
      <div
        className={clsx(
          headingClassNames,
          'flex flex-col justify-center items-center h-full bg-slate-800 rounded-xl px-7',
        )}
      >
        <h2 className="text-white group-hover:bg-gradient-to-r group-hover:text-transparent bg-clip-text uppercase text-3xl font-bold">
          {heading}
        </h2>
        <p className="text-sm text-slate-400 mt-7">{paragraph}</p>
      </div>
    </Link>
  );
};

export default ExamLink;
