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
  return (
    <main className="flex flex-col justify-between h-[calc(100vh-2.5rem-64px)]">
      {children}
    </main>
  );
}
