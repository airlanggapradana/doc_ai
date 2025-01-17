"use client";
import React from "react";
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
import { MedicalRecommendation } from "@/types/response";
import { HeartPulse } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { diagnosaFormSchema } from "@/lib/form.schema";
import { z } from "zod";
import { saveDiagnosa } from "@/actions/helperFunctions";
import { useMutation } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const HasilDiagnosa = ({
  response,
  request,
}: {
  response: MedicalRecommendation;
  request: z.infer<typeof diagnosaFormSchema>;
}) => {
  const router = useRouter();
  const payload = { ...request, hasil_diagnosa: response };

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["saveDiagnosa", payload],
    mutationFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      return await saveDiagnosa(payload);
    },
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <span>
            <HeartPulse color="#4f46e5" />
          </span>
          Hasil Diagnosa Kamu{" "}
        </CardTitle>
        <CardDescription>
          Berikut hasil dari analisa model AI kami.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple">
          {[
            {
              value: "diagnosa_umum",
              title: "Diagnosa Secara Umum",
              content: <p>{response.diagnosa_umum}</p>,
            },
            {
              value: "prediksi_penyakit",
              title: "Prediksi Penyakit Terkait",
              content: response.prediksi_penyakit.map((penyakit, index) => (
                <div
                  key={index}
                  className="mb-4 rounded-lg border bg-gray-50 p-4 shadow-sm"
                >
                  <h3 className="text-base font-semibold text-indigo-600">
                    {penyakit.nama}
                  </h3>
                  <p className="mt-2 text-gray-700">{penyakit.sugesti}</p>
                </div>
              )),
            },
            {
              value: "rekomendasi_makanan",
              title: "Rekomendasi Makanan",
              content: response.rekomendasi_makanan.map((makanan, index) => (
                <div
                  key={index}
                  className="mb-4 rounded-lg border bg-gray-50 p-4 shadow-sm"
                >
                  <h3 className="text-base font-semibold text-indigo-600">
                    {makanan.nama}
                  </h3>
                  <p className="mt-2 text-gray-700">{makanan.sugesti}</p>
                </div>
              )),
            },
            {
              value: "rekomendasi_minuman",
              title: "Rekomendasi Minuman",
              content: response.rekomendasi_minuman.map((minuman, index) => (
                <div
                  key={index}
                  className="mb-4 rounded-lg border bg-gray-50 p-4 shadow-sm"
                >
                  <h3 className="text-base font-semibold text-indigo-600">
                    {minuman.nama}
                  </h3>
                  <p className="mt-2 text-gray-700">{minuman.sugesti}</p>
                </div>
              )),
            },
            {
              value: "rekomendasi_olahraga",
              title: "Rekomendasi Olahraga",
              content: response.rekomendasi_olahraga.map((olahraga, index) => (
                <div
                  key={index}
                  className="mb-4 rounded-lg border bg-gray-50 p-4 shadow-sm"
                >
                  <h3 className="text-base font-semibold text-indigo-600">
                    {olahraga.nama}
                  </h3>
                  <p className="text-xs font-medium">{olahraga.durasi}</p>
                  <p className="mt-2 text-sm text-gray-700">
                    {olahraga.rutinitas}
                  </p>
                </div>
              )),
            },
          ].map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger className="text-base font-bold">
                {item.title}
              </AccordionTrigger>
              <AccordionContent className="font-medium leading-relaxed">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <p className="text-base italic text-gray-500">
          {format(new Date(), "PPPP", { locale: id })}
        </p>

        <Button
          variant={"ghost"}
          onClick={() => mutateAsync()}
          disabled={isPending}
        >
          Simpan Hasil Diagnosa
        </Button>
      </CardFooter>
    </Card>
  );
};

export default HasilDiagnosa;
