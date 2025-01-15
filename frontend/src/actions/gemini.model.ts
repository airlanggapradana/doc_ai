import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { env } from "@/env";
import { z } from "zod";
import { diagnosaFormSchema } from "@/lib/form.schema";

export const geminiModel = async ({
  payload,
}: {
  payload: z.infer<typeof diagnosaFormSchema>;
}) => {
  const genAI = new GoogleGenerativeAI(env.NEXT_PUBLIC_GEMINI_API);

  const schema = {
    type: SchemaType.OBJECT,
    properties: {
      diagnosa_umum: {
        type: SchemaType.STRING,
      },
      rekomendasi_makanan: {
        type: SchemaType.ARRAY,
        items: {
          type: SchemaType.OBJECT,
          properties: {
            nama: {
              type: SchemaType.STRING,
            },
            sugesti: {
              type: SchemaType.STRING,
            },
          },
          required: ["nama", "sugesti"],
        },
      },
      rekomendasi_olahraga: {
        type: SchemaType.ARRAY,
        items: {
          type: SchemaType.OBJECT,
          properties: {
            nama: {
              type: SchemaType.STRING,
            },
            rutinitas: {
              type: SchemaType.STRING,
            },
            durasi: {
              type: SchemaType.STRING,
            },
          },
          required: ["nama", "rutinitas", "durasi"],
        },
      },
      rekomendasi_minuman: {
        type: SchemaType.ARRAY,
        items: {
          type: SchemaType.OBJECT,
          properties: {
            nama: {
              type: SchemaType.STRING,
            },
            sugesti: {
              type: SchemaType.STRING,
            },
          },
          required: ["nama", "sugesti"],
        },
      },
      prediksi_penyakit: {
        type: SchemaType.ARRAY,
        items: {
          type: SchemaType.OBJECT,
          properties: {
            nama: {
              type: SchemaType.STRING,
            },
            sugesti: {
              type: SchemaType.STRING,
            },
          },
          required: ["nama", "sugesti"],
        },
      },
    },
    required: [
      "diagnosa_umum",
      "rekomendasi_makanan",
      "rekomendasi_olahraga",
      "rekomendasi_minuman",
      "prediksi_penyakit",
    ],
  };

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: schema,
    },
  });

  if (payload) {
    const response = await model.generateContent(
      `Diberikan kasus sebagai berikut :
  
  Seorang ${payload.gender} berusia ${payload.usia} tahun dengan berat badan ${payload.berat_badan}kg, tinggi ${payload.tinggi_badan}cm, golongan darah ${payload.golongan_darah}, dan ${payload.rutinitas_olahraga} berolahraga memiliki riwayat penyakit ${payload.riwayat_penyakit}.
  
  Lakukan :
  
  1.Analisa kasus tersebut lalu berikan penyakit-penyakit yang mungkin ia derita di masa depan serta berikan rekomendasi pola hidup yang cocok
  2.Output harus dalam format JSON`,
    );
    if (response) {
      const geminiResponse = response.response.text();
      return geminiResponse;
    }
  }
};
