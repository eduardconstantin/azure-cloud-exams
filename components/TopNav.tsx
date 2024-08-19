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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

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
        <p className={`windowWidth < 640 ? "text-md" : "text-lg"`}>
          🧪 Practice Exams Platform
        </p>
      </div>
      <div className="flex items-center pt-1 w-1/2">
        {windowWidth < 640 && (
          <div
            onClick={toggleMobileMenu}
            className="cursor-pointer mx-auto text-white"
          >
            ☰
          </div>
        )}
        {isMobileMenuOpen && (
          <div>
            <a
              href="https://apps.apple.com/app/cloudmaster-swift/id6503601139"
              className="mr-4 text-white"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our iOS App"
            >
              iOS App
            </a>
            <a
              href="https://shop.ditectrev.com"
              className="mr-4 text-white"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our Shop"
            >
              Shop
            </a>
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
            <div className="flex items-center pt-1 w-1/2">
              {windowWidth < 640 && (
                <div
                  onClick={toggleMobileMenu}
                  className="cursor-pointer mx-auto text-white"
                >
                  ☰
                </div>
              )}
              {isMobileMenuOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 flex flex-col items-center justify-center z-50">
                  <a
                    href="https://apps.apple.com/app/cloudmaster-swift/id6503601139"
                    className="mb-4 text-white text-xl"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit our iOS App"
                  >
                    iOS App
                  </a>
                  <a
                    href="https://shop.ditectrev.com"
                    className="mb-4 text-white text-xl"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit our Shop"
                  >
                    Shop
                  </a>
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
                  <button
                    onClick={toggleMobileMenu}
                    className="mt-4 text-white text-xl"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopNav;
