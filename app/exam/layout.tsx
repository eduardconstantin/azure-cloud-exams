import { ReactNode } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "🧪 Practice Exams Platform - Exam | Ditectrev",
  openGraph: {
    title: "🧪 Practice Exams Platform - Exam | Ditectrev",
  },
};

export default function ExamLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
