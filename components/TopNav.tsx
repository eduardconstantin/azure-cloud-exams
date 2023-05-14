import React, { useEffect, useState } from "react";
import GitHubButton from "react-github-btn";
import Link from "next/link";
import { useRouter } from 'next/router';

const TopNav = () => {
  const router = useRouter();
  const [windowWidth, setWindowWidth] = useState<number>(0);
  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  return (
    <div className="h-16 mb-10 w-full px-3 border-b-2 border-slate-700 text-white flex justify-between items-center">
     {router.pathname !== '/' && (
      <div style={{  width:"100px", height:"30px",backgroundColor:"#1E293B",borderRadius:"10px",display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="hover:border border-white">
        <Link href="/"><svg style={{height:"27px"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
  <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
</svg></Link></div>
        )}
      <div className="flex items-center flex-col w-1/2">{/* empty div */}</div>
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
