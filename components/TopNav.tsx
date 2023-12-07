"use client";

import React, { useEffect, useState } from "react";
import GitHubButton from "react-github-btn";
import HomeButton from "./HomeButton";
import { usePathname, useRouter } from "next/navigation";

const TopNav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [windowWidth, setWindowWidth] = useState<number>(0);
  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  return (
    <div className="h-16 mb-10 w-full px-3 border-b-[1px] border-slate-700 text-white flex justify-between items-center">
      <div className="flex items-center flex-col w-1/2">
        {pathname !== "/" && (
          <HomeButton
            handleReturnToMainPage={() => {
              router.push("/");
            }}
          />
        )}
      </div>
      <div className="flex items-center flex-col w-full">
        <p className="font-bold text-4xl leading-7">AZURE</p>
        <p className="text-base">FUNDAMENTALS</p>
      </div>
      <div className="flex items-center flex-col pt-1 w-1/2">
        <GitHubButton
          href="https://github.com/eduardconstantin/azure-fundamentals"
          data-color-scheme="no-preference: light; light: light; dark: dark;"
          data-icon="octicon-star"
          data-size="large"
          data-show-count="true"
          aria-label="Star azure-fundamentals on GitHub"
        >
          {windowWidth < 640 ? "" : "Star"}
        </GitHubButton>
      </div>
    </div>
  );
};

export default TopNav;
