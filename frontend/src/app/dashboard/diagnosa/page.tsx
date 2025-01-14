import React from "react";
import Back from "@/components/Back";
import DiagnosaForm from "@/components/dashboard/DiagnosaForm";

export default function DiagnosaPage() {
  return (
    <div className="h-full w-full p-4">
      <div className="flex h-full items-center justify-center">
        <div className="w-full">
          <div className="mx-auto max-w-screen-xl">
            <Back />
            <div className="flex flex-col gap-3">
              <h1 className="text-center text-3xl font-bold">Fitur Diagnosa</h1>
              <p className="mx-auto max-w-xl text-center text-base font-normal leading-normal text-gray-700">
                Disini anda dapat melakukan diagnosa terhadap diri anda dengan
                mengisi form-form berikut.
              </p>

              <DiagnosaForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
