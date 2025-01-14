"use client";
import { LogOut } from "lucide-react";
import React from "react";
import { removeCookie } from "@/actions/helperFunctions";

const Logout = () => {
  return (
    <LogOut
      size={25}
      color="#4f46e5"
      onClick={() => removeCookie()}
      className="hover:cursor-pointer"
    />
  );
};

export default Logout;
