"use server";
import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Sidebar from "@/components/dashboard/Sidebar";

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

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex h-full w-full items-center">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel>
            <Sidebar />
          </ResizablePanel>
          <ResizableHandle withHandle />
          {children}
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
