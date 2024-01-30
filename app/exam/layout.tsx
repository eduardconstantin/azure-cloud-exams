import { ReactNode } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Azure Cloud Exams - Exam",
  openGraph: {
    title: "Azure Cloud Exams - Exam",
  },
};

export default function ExamLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
