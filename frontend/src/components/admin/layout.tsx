"use client";

import { ReactNode, useEffect, useState } from "react";
import { Header } from "@/components/admin/header";
import { Footer } from "@/components/admin/footer";
import { Aside } from "@/components/admin/aside";


type Props = {
  children: ReactNode;
};

export function Layout({ children }: Props) {

  return (
    <>
        <div className="grid min-h-screen grid-cols-[260px_1fr] grid-rows-[auto_1fr_auto]">
            <Aside />
            <Header />

            <main className="col-start-2 bg-white p-8">
                {children}
            </main>

            <Footer />
        </div>
 
    </>
  );
}