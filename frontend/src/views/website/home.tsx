"use client";

import "swiper/css";
import "swiper/css/navigation";

import Image from "next/image";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

import { Swiper, SwiperSlide } from "swiper/react";

import { A11y, Navigation } from "swiper/modules";
import { Timeline } from "@/components/ui/timeline";
import { CardEducation } from "@/components/ui/cardEducation";

export default function Home() {
  const experiences = [
    {
      period: "2024 - Atual",
      title: "Desenvolvedor Web Full Stack - Agência Acerte Publicidade e Tech",
      description: "Desenvolvimento Frontend/Backend, APIs",
      tech: "Ruby, Rails, Jquery, JavaScript, Bootstrap, PostgreSQL",
    },
    {
      period: "2025 - Atual",
      title: "Desenvolvedor Web - Freelancer",
      description: "Desenvolvimento Frontend/Backend & APIs",
      tech: "React, Java, Spring Boot, TypeScript, Tailwind CSS, Next.js",
    },
  ];

  const education = [
    {
      title: "Análise e Desenvolvimento de Sistemas",
      institution: "Instituto Federal de Sergipe",
      period: "2021 - 2024",
    },
  ];

  return (
    <div className="bg-slate-900">
      <header className="py-5 mx-64 flex justify-between items-center">
        <Link href={""}>
          <p className="text-white text-3xl font-light">
            TH<strong className="text-blue-700 font-bold">Dev</strong>
          </p>
        </Link>

        <nav className="flex gap-5 font-light text-white items-center">
          <Link href={""}>Início</Link>
          <Link href={""}>Experiência Profissional</Link>
          <Link href={""}>Formação</Link>
          <Link href={""}>Projetos</Link>
          <Link href={""}>Contato</Link>
          <Link
            className="bg-blue-700 px-4 py-2 rounded-lg font-semibold"
            href={""}
          >
            Currículo
          </Link>
        </nav>
      </header>

      <main>
        <section className="bg-slate-800 pt-36">
          <div className="mx-64 flex justify-between items-start">
            <div className="max-w-[700px] flex flex-col gap-1">
              <h3 className="text-white text-2xl">
                Olá, eu sou o
                <span className="text-blue-700 font-bold"> Thiago Silva</span>
              </h3>

              <h1 className="font-bold text-white text-6xl">
                Desenvolvedor Web
              </h1>

              <p className="text-white text-md mb-10">
                Desenvolvedor Web focado na criação de aplicações modernas,
                responsivas e eficientes, utilizando tecnologias atuais para
                entregar soluções digitais de alta qualidade.
              </p>

              <div className="flex gap-5">
                <Link
                  href={"https://github.com/thiagodevcodes"} target="_blank"
                  className="bg-blue-700 transition-all font-bold text-white py-3 px-10 rounded-xl hover:bg-blue-800 flex items-center gap-2"
                >
                  <FontAwesomeIcon className="text-2xl" icon={faGithub} />
                  Github
                </Link>
                <Link
                  href={"https://www.linkedin.com/in/thiagosilvaweb"} target="_blank"
                  className="bg-blue-700 transition-all font-bold text-white py-3 px-10 rounded-xl hover:bg-blue-800 flex items-center gap-2"
                >
                  <FontAwesomeIcon className="text-2xl" icon={faLinkedin} />
                  Linkedin
                </Link>
              </div>
            </div>

            <div>
              <Image
                src={"/anim-thiago.png"}
                alt="Animação Thiago"
                width={300}
                height={500}
              />
            </div>
          </div>
        </section>

        <section className="text-white py-16">
          <div className="mx-64">
            <h2 className="text-3xl font-bold mb-16">
              Experiência Profissional
            </h2>

            <Timeline experiencies={experiences} />
          </div>
        </section>

        <section className="text-white pb-16">
          <div className="mx-64">
            <h2 className="text-3xl font-bold mb-16">Formação Acadêmica</h2>

            <CardEducation data={education}/>
          </div>
        </section>

        <section className="pb-16 bg-slate-800 py-16">
          <div className="mx-64">
            <h2 className="text-white text-3xl font-bold mb-16">Projetos</h2>

            <div className="relative overflow-visible">
              <Swiper
                modules={[Navigation, A11y]}
                spaceBetween={50}
                slidesPerView={3}
                navigation={{
                  nextEl: ".custom-next",
                  prevEl: ".custom-prev",
                }}
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log("slide change")}
                className="w-full"
              >
                <SwiperSlide>
                  <div className="bg-slate-900 h-96 rounded-3xl"></div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="bg-slate-900 h-96 rounded-3xl"></div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="bg-slate-900 h-96 rounded-3xl"></div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="bg-slate-900 h-96 rounded-3xl"></div>
                </SwiperSlide>
              </Swiper>

              <div className="custom-prev absolute -left-16 top-1/2 -translate-y-1/2 z-10 cursor-pointer">
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  className="text-blue-700 text-4xl"
                />
              </div>

              <div className="custom-next absolute -right-16 top-1/2 -translate-y-1/2 z-10 cursor-pointer">
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className="text-blue-700 text-4xl"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
