import React from "react";
import Back from "@/components/Back";
import SingleDiagnosa from "@/components/dashboard/SingleDiagnosa";

export default async function HistoriPage({
  params,
}: {
  params: Promise<{ diagnosaId: string }>;
}) {
  const slug = (await params).diagnosaId;
  return (
    <div className="h-full w-full overflow-auto p-4">
      <div className="space-y-5">
        <Back />
        <div className="space-y-3">
          <h1 className="text-center text-3xl font-bold">Hasil Diagnosa</h1>
          <p className="text-center text-base font-medium text-gray-500">
            Berikut merupakan hasil diagnosa kamu.
          </p>

          <SingleDiagnosa diagnosa_id={slug} />
        </div>
      </div>
    </div>
  );
}
