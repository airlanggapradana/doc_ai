export interface RegisterResponse {
  message: string;
  result: Result;
}

export interface Result {
  id: string;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginResponse {
  message: string;
  result: Result;
}

export interface Result {
  rest: REST;
  token: string;
}

export interface REST {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PenyakitPrediksi {
  nama: string;
  sugesti: string;
}

export interface RekomendasiMakanan {
  nama: string;
  sugesti: string;
}

export interface RekomendasiMinuman {
  nama: string;
  sugesti: string;
}

export interface RekomendasiOlahraga {
  durasi: string;
  nama: string;
  rutinitas: string;
}

export interface MedicalRecommendation {
  diagnosa_umum: string;
  prediksi_penyakit: PenyakitPrediksi[];
  rekomendasi_makanan: RekomendasiMakanan[];
  rekomendasi_minuman: RekomendasiMinuman[];
  rekomendasi_olahraga: RekomendasiOlahraga[];
}

export interface Token {
  id: string;
  email: string;
  name: string;
  createdAt: string; // or Date if you're parsing the ISO string
  updatedAt: string; // or Date if you're parsing the ISO string
  iat: number; // issued at timestamp
  exp: number; // expiration timestamp
}
