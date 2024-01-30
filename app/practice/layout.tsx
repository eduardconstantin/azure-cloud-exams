import { ReactNode } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Azure Cloud Exams - Practice",
  openGraph: {
    title: "Azure Cloud Exams - Practice",
  },
};

export default function ExamLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
