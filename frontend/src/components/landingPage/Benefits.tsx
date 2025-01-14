import React, { ReactNode } from "react";
import { Beef, Bot, Hourglass, NotebookText } from "lucide-react";
import { TextAnimate } from "../ui/text-animate";

const Benefits = () => {
  const benefits = [
    {
      title: "Langsung dari AI",
      description: "Diagnosa penyakit langsung dari AI kami",
      icon: <Bot size={50} opacity={0.5} />,
    },
    {
      title: "Rekomendasi Pola Makan",
      description: "Rekomendasi pola makan yang sesuai dengan kondisi Anda.",
      icon: <Beef size={50} opacity={0.5} />,
    },
    {
      title: "Otomatis Tersimpan di Cloud",
      description:
        "Sistem kami akan menyimpan data Anda secara real-time di cloud",
      icon: <Hourglass size={50} opacity={0.5} />,
    },
    {
      title: "Rekomendasi Pola Hidup",
      description: "Rekomendasi pola hidup yang sesuai dengan kondisi Anda.",
      icon: <NotebookText size={50} opacity={0.5} />,
    },
  ];
  return (
    <section className="mt-14 bg-white py-16">
      <TextAnimate
        duration={2.5}
        animation="slideUp"
        by="character"
        className="text-4xl font-extrabold text-indigo-500"
      >
        Premium Experience
      </TextAnimate>
      <p className="mt-3 font-medium text-gray-600">
        Rasakan berbagai keuntungan menggunakan layanan kami.
      </p>
      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map((benefit, index) => (
          <BenefitCard
            key={index}
            title={benefit.title}
            desc={benefit.description}
            icon={benefit.icon}
          />
        ))}
      </div>
    </section>
  );
};

const BenefitCard = ({
  title,
  desc,
  icon,
}: {
  title: string;
  desc: string;
  icon?: ReactNode;
}) => {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      {icon}
      <h3 className="mt-4 text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-600">{desc}</p>
    </div>
  );
};

export default Benefits;
