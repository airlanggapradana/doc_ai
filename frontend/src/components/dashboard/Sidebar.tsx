import React from "react";
import Logout from "@/components/Logout";
import HistoriDiagnosa from "./HistoriDiagnosa";

const Sidebar = () => {
  return (
    <div className="h-full w-full border-r-2 border-indigo-300 bg-gray-50">
      <div className="relative h-full w-full space-y-5">
        <div className="flex items-center justify-between border-b-2 border-indigo-300 p-4">
          <h1 className="bg-gradient-to-r from-indigo-600 to-sky-300 bg-clip-text text-2xl font-extrabold text-transparent">
            Doc AI
          </h1>
          <Logout />
        </div>

        <div className="h-full w-full p-4">
          <HistoriDiagnosa />
        </div>
        <div className="absolute bottom-0 w-full border-t-2 border-indigo-300 p-4">
          <p className="mt-4 text-center text-sm text-gray-500 lg:mt-0">
            Created by Airlangga Pradana &copy; 2025. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
