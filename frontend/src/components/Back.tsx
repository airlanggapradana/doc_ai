"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { SquareArrowLeft } from "lucide-react";

const Back = () => {
  const router = useRouter();
  return (
    <SquareArrowLeft
      size={32}
      color="#4f46e5"
      onClick={() => router.back()}
      className="hover:cursor-pointer"
    />
  );
};

export default Back;
