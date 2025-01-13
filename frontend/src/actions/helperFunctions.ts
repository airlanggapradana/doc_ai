import axios from "axios";
import { env } from "@/env";
import { registerFormSchema } from "@/components/auth/Register";
import { z } from "zod";
import { RegisterResponse } from "@/types/response";

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
