import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { BorderBeam } from "@/components/ui/border-beam";

export default function Dashboard() {
  return (
    <div className="h-full w-full p-4">
      <div className="flex h-full w-full items-center justify-center">
        <Link href={"/dashboard/diagnosa"} className="max-w-lg">
          <Card className="relative w-full">
            <CardHeader>
              <CardTitle>Fitur Diagnosa</CardTitle>
              <CardDescription>
                Disini anda dapat melakukan diagnosa terhadap diri anda.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <p className="text-base font-normal leading-normal text-gray-700">
                Diagnosa berdasarkan gender, usia, tinggi badan, berat badan,
                pola hidup, dan riwayat penyakit.
              </p>
            </CardContent>
            <CardFooter className="text-sm text-gray-500">
              *fitur mungkin masih ada beberapa bug karena dalam tahap
              pengembangan.
            </CardFooter>
            <BorderBeam
              size={250}
              duration={3}
              delay={5}
              colorFrom="#4f46e5"
              colorTo="#0ea5e9"
            />
          </Card>
        </Link>
      </div>
    </div>
  );
}
