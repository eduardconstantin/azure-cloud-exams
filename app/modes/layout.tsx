import { ReactNode } from "react";
import { Metadata } from "next";
import "styles/globals.css";

export const metadata: Metadata = {
  title: "🧪 Practice Exams Platform - Modes | Ditectrev",
  openGraph: {
    title: "🧪 Practice Exams Platform - Modes | Ditectrev",
  },
};

type ModesLayoutProps = {
  children: ReactNode;
};

export default function ModesLayout({ children }: ModesLayoutProps) {
  return <>{children}</>;
}
