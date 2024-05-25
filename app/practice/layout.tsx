import { ReactNode } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "🧪 Practice Exams Platform | Ditectrev",
  openGraph: {
    title: "🧪 Practice Exams Platform | Ditectrev",
  },
};

export default function ExamLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
