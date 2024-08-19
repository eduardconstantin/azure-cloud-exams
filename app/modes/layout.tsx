import { ReactNode } from "react";
import "styles/globals.css";

type ModesLayoutProps = {
  children: ReactNode;
};

export default function ModesLayout({ children }: ModesLayoutProps) {
  return <>{children}</>;
}
