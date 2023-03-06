import React from "react";

const TopNav = () => {
  return (
    <div className="h-16 mb-10 w-full px-3 border-b-2 border-slate-700 text-white flex justify-between items-center">
      <div className="flex items-center flex-col">{/* empty div */}</div>
      <div className="flex items-center flex-col">
        <p className="font-bold text-4xl leading-7">AZURE</p>
        <p className="text-base">FUNDAMENTALS</p>
      </div>
      <div className="flex items-center flex-col">{/* github stars button */}</div>
    </div>
  );
};

export default TopNav;
