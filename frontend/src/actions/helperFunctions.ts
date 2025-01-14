"use server";
import axios from "axios";
import { env } from "@/env";
import { registerFormSchema } from "@/lib/form.schema";
import { z } from "zod";
import { LoginResponse, RegisterResponse } from "@/types/response";
import { loginFormSchema } from "@/lib/form.schema";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

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

const getToken = async () => {
  const cookie = (await cookies()).get("token");
  if (!cookie) return null;
  const token = cookie.value;

  const decoded = jwt.decode(token, { json: true });
  return decoded;
};

export const setCookie = async (data: string) => {
  const cookieStore = await cookies();
  cookieStore.set("token", data);
};

export const removeCookie = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("token");
};
