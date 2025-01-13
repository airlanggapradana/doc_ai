import Login from "@/components/auth/Login";
import Back from "@/components/Back";
import React from "react";

export default function LoginPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="w-full">
        <div className="mx-auto max-w-screen-2xl">
          <div className="mx-auto max-w-3xl">
            <Back />
            <h1 className="mt-6 text-center text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Masuk Akun
            </h1>

            <p className="mt-4 text-center leading-relaxed text-gray-500">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi
              nam dolorum aliquam, quibusdam aperiam voluptatum.
            </p>

            <Login />
          </div>
        </div>
      </div>
    </div>
  );
}
