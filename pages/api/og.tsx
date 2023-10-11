import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export default function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const question = searchParams.get("question") ?? "My default title";
    const width = Number(searchParams.get("width")) ?? 0;

    return new ImageResponse(
      (
        <div tw="flex text-center w-full h-full bg-slate-800 items-center justify-center ">
          <p
            tw={`px-8 ${
              width < 640 ? "text-5xl" : "text-3xl"
            } font-sans text-stone-300`}
          >
            {question}
          </p>
        </div>
      ),
      {
        width: width < 640 ? 800 : 1200,
        height: width < 640 ? 450 : 300,
      },
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
