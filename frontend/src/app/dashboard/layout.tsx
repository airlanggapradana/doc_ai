"use server";
import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = (await cookies()).get("token");

  if (!token) {
    redirect("/login");
  }

  const decoded = jwt.decode(token.value);
  if (!decoded) {
    redirect("/login");
  }

  return <main>{children}</main>;
}
