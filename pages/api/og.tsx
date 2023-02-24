import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export default function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const question = searchParams.get("question") ?? "My default title";
    return new ImageResponse(
      (
        <div tw="flex text-center w-full h-full bg-slate-800 items-center justify-center">
          <p tw="px-8 text-xl font-sans text-stone-300">{question}</p>
        </div>
      ),
      {
        width: 1200,
        height: 200,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
