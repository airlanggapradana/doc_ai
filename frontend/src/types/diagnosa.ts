export interface SaveDiagnosa {
  message: string;
  result: Result;
}

export interface Result {
  id: string;
  usia: number;
  gender: string;
  riwayat_penyakit: string[];
  berat_badan: number;
  tinggi_badan: number;
  rutinitas_olahraga: string;
  golongan_darah: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  hasil_diagnosa: HasilDiagnosa;
}

export interface HasilDiagnosa {
  id: string;
  diagnosa_umum: string;
  createdAt: Date;
  updatedAt: Date;
  diagnoseId: string;
  prediksi_penyakit: PrediksiPenyakit[];
  rekomendasi_makanan: PrediksiPenyakit[];
  rekomendasi_minuman: PrediksiPenyakit[];
  rekomendasi_olahraga: RekomendasiOlahraga[];
}

export interface PrediksiPenyakit {
  id: string;
  nama: string;
  sugesti: string;
  createdAt: Date;
  updatedAt: Date;
  hasilDiagnosaId: string;
}

export interface RekomendasiOlahraga {
  id: string;
  nama: string;
  durasi: string;
  rutinitas: string;
  createdAt: Date;
  updatedAt: Date;
  hasilDiagnosaId: string;
}

export interface UserWithDiagnosa {
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
  diagnosa: Diagnosa[];
}

export interface Diagnosa {
  id: string;
  usia: number;
  gender: string;
  riwayat_penyakit: string[];
  berat_badan: number;
  tinggi_badan: number;
  rutinitas_olahraga: string;
  golongan_darah: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}
