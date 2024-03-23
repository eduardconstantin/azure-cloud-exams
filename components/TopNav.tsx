"use client";

import React, { useEffect, useState } from "react";
import GitHubButton from "react-github-btn";
import HomeButton from "./HomeButton";
import Image from "next/image";
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
        <Image
          src="/logo.svg"
          alt="Ditectrev Logo"
          className="max-w-[90%] max-h-[90%]"
          height={50}
          width={200}
        />
        <p className="text-lg">🧪 Practice Exams Platform</p>
      </div>
      <div className="flex items-center flex-col pt-1 w-1/2">
        <GitHubButton
          href="https://github.com/Ditectrev/Practice-Exams-Platform"
          data-color-scheme="no-preference: light; light: light; dark: dark;"
          data-icon="octicon-star"
          data-size="large"
          data-show-count="true"
          aria-label="Star our platform on GitHub"
        >
          {windowWidth < 640 ? "" : "Star"}
        </GitHubButton>
      </div>
    </div>
  );
};

export default TopNav;
