"use client";
import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDiagnosa, getSingleDiagnosa } from "@/actions/helperFunctions";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";

const SingleDiagnosa = ({ diagnosa_id }: { diagnosa_id: string }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery({
    queryKey: ["single-diagnosa", diagnosa_id],
    queryFn: async () => await getSingleDiagnosa(diagnosa_id),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async () => await deleteDiagnosa(diagnosa_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["historiDiagnosa"] });
      router.push("/dashboard");
    },
  });

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data found</div>;

  const res = data.result.result;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold leading-relaxed">
          Hasil Diagnosa
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-base font-medium leading-relaxed text-gray-700">
          Secara umum, {res.hasil_diagnosa.diagnosa_umum}
        </p>

        <div className="space-y-2">
          <h2 className="text-xl font-bold">Informasi Data Diri</h2>
          <ul className="list-inside list-disc">
            {[
              { label: "Usia", value: res.usia.toString() },
              { label: "Gender", value: res.gender },
              { label: "Berat Badan", value: `${res.berat_badan}kg` },
              { label: "Tinggi Badan", value: `${res.tinggi_badan}cm` },
              { label: "Golongan Darah", value: res.golongan_darah },
              {
                label: "Riwayat Penyakit",
                value: res.riwayat_penyakit.join(", "),
              },
              { label: "Rutinitas Olahraga", value: res.rutinitas_olahraga },
            ].map((item, index) => (
              <li key={index} className="text-base font-normal">
                {item.label} : {item.value}
              </li>
            ))}
          </ul>
        </div>

        <Accordion type="single" collapsible>
          <AccordionItem value="prediksi_penyakit">
            <AccordionTrigger className="text-base">
              Prediksi Penyakit yang Mungkin Terjadi
            </AccordionTrigger>
            <AccordionContent>
              {res.hasil_diagnosa.prediksi_penyakit.map((penyakit, index) => (
                <div
                  key={index}
                  className="mb-4 rounded-lg border bg-gray-50 p-4 shadow-sm"
                >
                  <h3 className="text-base font-semibold text-indigo-600">
                    {penyakit.nama}
                  </h3>
                  <p className="mt-2 text-gray-700">{penyakit.sugesti}</p>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="rekomenasi_makanan">
            <AccordionTrigger className="text-base">
              Rekomendasi Makanan
            </AccordionTrigger>
            <AccordionContent>
              {res.hasil_diagnosa.rekomendasi_makanan.map((makanan, index) => (
                <div
                  key={index}
                  className="mb-4 rounded-lg border bg-gray-50 p-4 shadow-sm"
                >
                  <h3 className="text-base font-semibold text-indigo-600">
                    {makanan.nama}
                  </h3>
                  <p className="mt-2 text-gray-700">{makanan.sugesti}</p>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="rekomenasi_minuman">
            <AccordionTrigger className="text-base">
              Rekomendasi Minuman
            </AccordionTrigger>
            <AccordionContent>
              {res.hasil_diagnosa.rekomendasi_minuman.map((minuman, index) => (
                <div
                  key={index}
                  className="mb-4 rounded-lg border bg-gray-50 p-4 shadow-sm"
                >
                  <h3 className="text-base font-semibold text-indigo-600">
                    {minuman.nama}
                  </h3>
                  <p className="mt-2 text-gray-700">{minuman.sugesti}</p>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="rekomenasi_olahraga">
            <AccordionTrigger className="text-base">
              Rekomendasi Olahraga
            </AccordionTrigger>
            <AccordionContent>
              {res.hasil_diagnosa.rekomendasi_olahraga.map(
                (olahraga, index) => (
                  <div
                    key={index}
                    className="mb-4 rounded-lg border bg-gray-50 p-4 shadow-sm"
                  >
                    <h3 className="text-base font-semibold text-indigo-600">
                      {olahraga.nama}
                    </h3>
                    <p className="mt-2 text-xs text-gray-700">
                      {olahraga.durasi}
                    </p>
                    <p className="mt-2 text-gray-700">{olahraga.rutinitas}</p>
                  </div>
                ),
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <p className="text-sm font-light text-gray-500">
          {format(res.createdAt, "PPPP", { locale: id })}
        </p>

        <Button
          variant={"destructive"}
          className="px-4 py-5"
          disabled={isPending}
          onClick={() => mutateAsync()}
        >
          <Trash2 size={18} />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SingleDiagnosa;
