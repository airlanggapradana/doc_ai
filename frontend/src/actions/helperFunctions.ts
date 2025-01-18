"use server";
import axios from "axios";
import { env } from "@/env";
import { diagnosaFormSchema, registerFormSchema } from "@/lib/form.schema";
import { z } from "zod";
import {
  LoginResponse,
  MedicalRecommendation,
  RegisterResponse,
  Token,
} from "@/types/response";
import { loginFormSchema } from "@/lib/form.schema";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { SaveDiagnosa, UserWithDiagnosa } from "@/types/diagnosa";

export const register = async (payload: z.infer<typeof registerFormSchema>) => {
  try {
    const response = await axios.post(
      `${env.NEXT_PUBLIC_BASE_API_URL}/auth/register`,
      payload,
    );
    return { status: response.status, data: response.data as RegisterResponse };
  } catch (error: unknown) {
    throw new Error("Failed to register");
  }
};

export const login = async (payload: z.infer<typeof loginFormSchema>) => {
  try {
    const response = await axios.post(
      `${env.NEXT_PUBLIC_BASE_API_URL}/auth/login`,
      payload,
    );
    return { status: response.status, data: response.data as LoginResponse };
  } catch (error: unknown) {
    throw new Error("Failed to login");
  }
};

export const saveDiagnosa = async (
  payload: z.infer<typeof diagnosaFormSchema> & {
    hasil_diagnosa: MedicalRecommendation;
  },
) => {
  const data = JSON.stringify({
    usia: parseInt(payload.usia),
    gender: payload.gender,
    riwayat_penyakit: payload.riwayat_penyakit,
    berat_badan: parseInt(payload.berat_badan),
    tinggi_badan: parseInt(payload.tinggi_badan),
    rutinitas_olahraga: payload.rutinitas_olahraga,
    golongan_darah: payload.golongan_darah,
    hasil_diagnosa: {
      create: {
        diagnosa_umum: payload.hasil_diagnosa.diagnosa_umum,
        prediksi_penyakit: {
          create: payload.hasil_diagnosa.prediksi_penyakit.map((penyakit) => ({
            nama: penyakit.nama,
            sugesti: penyakit.sugesti,
          })),
        },
        rekomendasi_makanan: {
          create: payload.hasil_diagnosa.rekomendasi_makanan.map((makanan) => ({
            nama: makanan.nama,
            sugesti: makanan.sugesti,
          })),
        },
        rekomendasi_minuman: {
          create: payload.hasil_diagnosa.rekomendasi_minuman.map((minuman) => ({
            nama: minuman.nama,
            sugesti: minuman.sugesti,
          })),
        },
        rekomendasi_olahraga: {
          create: payload.hasil_diagnosa.rekomendasi_olahraga.map(
            (olahraga) => ({
              nama: olahraga.nama,
              durasi: olahraga.durasi,
              rutinitas: olahraga.rutinitas,
            }),
          ),
        },
      },
    },
  });

  const session = await getToken();
  if (!session) return null;
  const token = session.token;

  const response = await axios.post(
    `${env.NEXT_PUBLIC_BASE_API_URL}/diagnose/${session.user.id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      maxBodyLength: Infinity,
    },
  );

  return { status: response.status, data: response.data as SaveDiagnosa };
};

export const getDiagnosa = async () => {
  try {
    const session = await getToken();
    if (!session) return null;
    const token = session.token;

    const response = await axios.get(
      `${env.NEXT_PUBLIC_BASE_API_URL}/user/${session.user.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    return {
      status: response.status,
      result: response.data as UserWithDiagnosa,
    };
  } catch (error) {
    throw new Error("Failed to get diagnosa");
  }
};

export const getToken = async () => {
  const cookie = (await cookies()).get("token");
  if (!cookie) return null;
  const token = cookie.value;

  const decoded = jwt.decode(token, { json: true });
  return { token, user: decoded as Token };
};

export const setCookie = async (data: string) => {
  const cookieStore = await cookies();
  cookieStore.set("token", data);
};

export const removeCookie = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("token");
};
