"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getDiagnosa } from "@/actions/helperFunctions";
import { Diagnosa } from "@/types/diagnosa";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Link from "next/link";

const HistoriDiagnosa = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["historiDiagnosa"],
    queryFn: async () => {
      const res = await getDiagnosa();
      if (!res) return null;
      if (res.status === 200) {
        return res.result.result.diagnosa;
      }
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>Data not found</div>;
  return (
    <div className="grid grid-cols-1 gap-4">
      {data.map((diagnosa, index) => (
        <Link href={`/dashboard/diagnosa/${diagnosa.id}`} key={index}>
          <HistoriCard diagnosa={diagnosa} />
        </Link>
      ))}
    </div>
  );
};

const HistoriCard = ({ diagnosa }: { diagnosa: Diagnosa }) => {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>{diagnosa.gender}</CardTitle>
        <CardDescription>
          {format(diagnosa.createdAt, "PPPP", { locale: id })}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default HistoriDiagnosa;
