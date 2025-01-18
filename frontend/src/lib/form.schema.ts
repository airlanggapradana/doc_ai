import { z } from "zod";

export const registerFormSchema = z.object({
  email: z.string().email("Invalid email"),
  name: z.string().min(3, "Min 3 characters").max(255, "Max character reached"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const loginFormSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const diagnosaFormSchema = z.object({
  usia: z
    .string()
    .min(1, "usia must be greater than 0")
    .max(100, "usia must be less than 100"),
  gender: z.enum(["LAKI_LAKI", "PEREMPUAN"]),
  riwayat_penyakit: z.array(z.string()),
  berat_badan: z.string().min(1, "berat_badan must be greater than 0"),
  tinggi_badan: z.string().min(1, "tinggi_badan must be greater than 100"),
  rutinitas_olahraga: z.enum(["TIDAK", "KURANG", "CUKUP", "BANYAK"]),
  golongan_darah: z.enum(["A", "B", "AB", "O"]),
});
