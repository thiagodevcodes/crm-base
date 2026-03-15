"use client";

import { getBanners } from "@/services/images";
import { useEffect, useState } from "react";
import Image from "next/image";
import { BannerFile } from "@/types/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { A11y, Navigation } from "swiper/modules";

export default function Home() {
  const [banners, setBanners] = useState<BannerFile[]>([]);

  useEffect(() => {
    // Simula a obtenção de banners (substitua com chamada real à API)
    const fetchBanners = async () => {
      const res = await getBanners();
      setBanners(res);
    };

    fetchBanners();
  }, []);

  return (
    <div className="bg-slate-900">
      <header className="p-5 mx-64 flex justify-between items-center">
        <Link href={""}>
          <p className="text-white text-3xl font-light">
            TH<strong className="text-blue-700 font-bold">Dev</strong>
          </p>
        </Link>

        <nav className="flex gap-5 font-light text-white">
          <Link href={""}>Início</Link>
          <Link href={""}>Sobre nós</Link>
          <Link href={""}>Soluções</Link>
          <Link href={""}>Contato</Link>
        </nav>
      </header>

      <main className="pt-32">
        <div className="flex justify-between items-start mx-64">
          <div className="max-w-[700px] flex flex-col gap-1">
            <h3 className="text-white text-2xl">
              Olá, eu sou o
              <span className="text-blue-700 font-bold"> Thiago Silva</span>
            </h3>

            <h1 className="font-bold text-white text-6xl">Desenvolvedor Web</h1>

            <p className="text-white text-md mb-10">
              Desenvolvedor Web focado na criação de aplicações modernas,
              responsivas e eficientes, utilizando tecnologias atuais para
              entregar soluções digitais de alta qualidade.
            </p>

            <div className="flex gap-5">
              <Link
                href={""}
                className="bg-blue-700 transition-all font-bold text-white py-3 px-10 rounded-xl hover:bg-blue-800"
              >
                Github
              </Link>
              <Link
                href={""}
                className="bg-blue-700 transition-all font-bold text-white py-3 px-10 rounded-xl hover:bg-blue-800"
              >
                Linkedin
              </Link>
            </div>
          </div>

          <Image
            src={"/anim-thiago.png"}
            alt="Animação Thiago"
            width={1000}
            height={500}
          />
        </div>

        <div className="w-full">
          {/* imagem */}
          {banners.length > 0 && (
            <Swiper
              modules={[Navigation, A11y]}
              spaceBetween={50}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              onSwiper={(swiper) => console.log(swiper)}
              onSlideChange={() => console.log("slide change")}
            >
              {banners.map((banner) => (
                <SwiperSlide
                  key={banner.bannerId}
                  className="bg-white overflow-hidden shadow-lg"
                >
                  <Image
                    src={banner.url}
                    alt={`Banner ${banner.bannerId}`}
                    width={1200}
                    height={600}
                    className="w-full object-cover"
                    unoptimized
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </main>
    </div>
  );
}
