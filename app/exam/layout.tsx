import { ReactNode } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Azure Fundamentals - Exam",
  openGraph: {
    title: "Azure Fundamentals - Exam",
  },
};

export default function ExamLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
