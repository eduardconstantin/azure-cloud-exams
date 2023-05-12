import React from "react";
import Link from 'next/link'

export default function HomePage() {
    return(
        <div className="mx-auto w-5/6 sm:w-2/5 text-center">
            <h2 className="text-white text-5xl text-leading font-bold uppercase mt-20">Welcome!</h2>
            <p  className="text-white text-lg mt-4 mb-12  px-2">Test your knowledge under pressure with our timed exam mode, or explore and master over 480 questions at your own pace with our practice mode.</p>
            <div className="flex max-sm:flex-col max-sm:align-center justify-center gap-4">
            <Link href="/practice" className="group bg-slate-700 text-white hover:bg-gradient-to-r from-[#0284C7] to-[#2DD48F] rounded-lg p-[2px] w-[350px] h-[350px] cursor-pointer">
            <div className="flex flex-col justify-center h-full flex-auto bg-slate-800 rounded-lg pt-7 px-6">
                <h2 className="group-hover:bg-gradient-to-r group-hover:from-[#0284C7] group-hover:to-[#2DD48F] group-hover:text-transparent group-hover:bg-clip-text uppercase text-2xl font-bold">Practice mode</h2>
                <p className="text-sm text-slate-400 mt-7">Learn and familiarize yourself with the questions and answers without any time constraint.</p>
            </div>
            </Link>
            <Link href="/exam">
            <div onMouseEnter={() => setHovered(2)} onMouseLeave={() => setHovered(0)} className="flex-auto bg-slate-700 hover:bg-gradient-to-r from-[#F97316] to-[#FACC15] text-white rounded-lg p-[2px] w-[350px] h-[350px] cursor-pointer">
            <div className="flex flex-col justify-center h-full flex-auto bg-slate-800 rounded-lg pt-7 px-6">
                <h2 className={`${hovered === 2 ? "bg-gradient-to-r from-[#F97316] to-[#FACC15] text-transparent bg-clip-text" : "" } uppercase text-2xl font-bold flex-1"`}>Exam mode</h2>
                <p className="text-sm text-slate-400 mt-7">Put your knowledge to the test by answering a fixed number of randomly selected questions under a time limit.</p>
            </div>
            </div>
            </Link>
        </div>
        </div>
        )
}