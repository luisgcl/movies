import { loadingUrl } from "@/helpers/config";
import React from "react";

const Loading = () => {
  return (
    <>
      <div className="h-screen">
        <img className="w-full h-full" src={loadingUrl} alt="loading..." />
      </div>
    </>
  );
};

export default Loading;
