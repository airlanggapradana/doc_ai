import Image from "next/image";
import Link from "next/link";
import React from "react";
import HeroIllustration from "../../../public/undraw_doctors_djoj.png";
import { TextAnimate } from "@/components/ui/text-animate";

const Hero = () => {
  return (
    <div className="mb-16 flex items-center justify-between">
      <div className="max-w-3xl">
        <TextAnimate
          animation="slideUp"
          by="word"
          duration={1.5}
          className="text-4xl font-extrabold leading-relaxed"
        >
          Cek kesehatan anda darimana aja dengan Doc AI
        </TextAnimate>

        <p className="mt-4 sm:text-lg/relaxed">
          Kami menyediakan layanan cek kesehatan yang dapat membantu anda
          mengidentifikasi penyakit yang mungkin anda derita.
        </p>

        <div className="mt-8 flex flex-wrap justify-start gap-4">
          <Link
            className="block w-full rounded bg-indigo-500 px-12 py-3 text-base font-semibold text-white shadow hover:bg-red-500 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
            href={"/register"}
          >
            Mulai Sekarang
          </Link>

          <Link
            className="block w-full rounded px-12 py-3 text-base font-medium text-indigo-700 shadow hover:text-red-700 focus:outline-none focus:ring active:text-red-500 sm:w-auto"
            href="#"
          >
            Pelajari Lebih Lanjut
          </Link>
        </div>
      </div>

      <Image
        priority
        src={HeroIllustration}
        alt="hero_img"
        className="h-[25rem] w-[25rem]"
      />
    </div>
  );
};

export default Hero;
