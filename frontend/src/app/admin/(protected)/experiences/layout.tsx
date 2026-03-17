"use client";

import { ReactNode } from "react";
import { ExperienceProvider } from "@/modules/experiences/contexts/context";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <ExperienceProvider>
      {children}
    </ExperienceProvider>
  );
}