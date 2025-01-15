"use client";

import HomePage from "@/components/HomePage";
import { jwtDecode } from "@/utils/jwt-decode";
import { BrillionProvider } from "@brillionfi/waas-react-sdk";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function () {
  const [appId, setAppId] = useState<string>("");
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams?.get("error");
    if(error){
      alert("Error: " + error);
      window.location.href = "/";
      return;
    }
    
    const jwt = searchParams?.get("code");
    if(!jwt) return;

    const info = JSON.parse(jwtDecode(jwt.split(".")[1]));
    setAppId(info.appId && process.env.NEXT_PUBLIC_DEFAULT_APPID);
  }, [])
  
  return (
    <BrillionProvider appId={appId} baseUrl={process.env.NEXT_PUBLIC_API_URL as string} WCProjectId={process.env.NEXT_PUBLIC_WC_PROJECT_ID as string}>
      <HomePage />
    </BrillionProvider>
  );
}
