"use client";
import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm, SubmitHandler } from "react-hook-form";
import { diagnosaFormSchema } from "@/lib/form.schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { geminiModel } from "@/actions/gemini.model";
import { MedicalRecommendation } from "@/types/response";
import HasilDiagnosa from "./HasilDiagnosa";

const DiagnosaForm = () => {
  const form = useForm<z.infer<typeof diagnosaFormSchema>>({
    resolver: zodResolver(diagnosaFormSchema),
    defaultValues: {
      usia: "",
      berat_badan: "",
      gender: undefined,
      tinggi_badan: "",
      riwayat_penyakit: undefined,
      rutinitas_olahraga: undefined,
      golongan_darah: undefined,
    },
  });

  const [response, setResponse] = React.useState<MedicalRecommendation | null>(
    null,
  );

  const [request, setRequest] =
    React.useState<z.infer<typeof diagnosaFormSchema>>();

  const onSubmit: SubmitHandler<z.infer<typeof diagnosaFormSchema>> = async (
    data,
  ) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setRequest(data);
    const response = await geminiModel({ payload: data });
    if (!response) return null;

    if (response) {
      const parsing = JSON.parse(response) as MedicalRecommendation;
      setResponse(parsing);
      form.reset();
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          className="mt-8 grid grid-cols-6 gap-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="col-span-6 sm:col-span-3">
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Jenis Kelamin Anda" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="LAKI-LAKI">Laki Laki</SelectItem>
                      <SelectItem value="PEREMPUAN">Perempuan</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Tentukan jenis kelamin anda.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <FormField
              control={form.control}
              name="golongan_darah"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Golongan Darah</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih golongan darah anda" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="A">A</SelectItem>
                      <SelectItem value="B">B</SelectItem>
                      <SelectItem value="AB">AB</SelectItem>
                      <SelectItem value="O">O</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Tentukan golongan darah anda.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <FormField
              control={form.control}
              name="usia"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Usia</FormLabel>
                  <FormControl>
                    <Input placeholder="masukkan usia anda..." {...field} />
                  </FormControl>
                  <FormDescription>
                    Masukkan usia anda dalam bentuk angka.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <FormField
              control={form.control}
              name="berat_badan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Berat Badan</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="masukkan berat badan anda..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Masukkan berat badan anda dalam bentuk angka.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <FormField
              control={form.control}
              name="tinggi_badan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tinggi Badan</FormLabel>
                  <FormControl>
                    <Input placeholder="masukkan tinggi anda..." {...field} />
                  </FormControl>
                  <FormDescription>
                    Masukkan tinggi anda dalam bentuk angka.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <FormField
              control={form.control}
              name="riwayat_penyakit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Riwayat Penyakit</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="masukkan riwayat penyakit anda..."
                      value={field.value || ""}
                      onChange={(e) =>
                        field.onChange(e.target.value.split(","))
                      }
                    />
                  </FormControl>
                  <FormDescription>Harap pisahkan dengan koma.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <FormField
              control={form.control}
              name="rutinitas_olahraga"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rutinitas Olahraga</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih rutinitas olahraga anda" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="TIDAK">TIDAK PERNAH</SelectItem>
                      <SelectItem value="KURANG">KURANG</SelectItem>
                      <SelectItem value="CUKUP">CUKUP</SelectItem>
                      <SelectItem value="BANYAK">SERING</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Harap isi dengan jujur.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6 justify-end sm:flex sm:items-center sm:gap-4">
            <Button
              onClick={form.handleSubmit(onSubmit)}
              disabled={form.formState.isSubmitting}
              className="rounded-md border border-blue-600 bg-indigo-600 px-12 py-6 text-sm font-semibold text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
            >
              Analisa Sekarang
            </Button>
          </div>
        </form>
      </Form>

      {response && request ? (
        <div className="mt-8 space-y-5">
          <h2 className="text-xl font-semibold">Hasil Analisa</h2>
          <HasilDiagnosa response={response} request={request} />
        </div>
      ) : null}
    </>
  );
};

export default DiagnosaForm;
