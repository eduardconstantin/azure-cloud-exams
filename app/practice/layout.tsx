import { ReactNode } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Azure Fundamentals - Practice",
  openGraph: {
    title: "Azure Fundamentals - Practice",
  },
};

export default function ExamLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
