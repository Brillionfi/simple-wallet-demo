"use client";

import HomePageWagmi from "@/components/HomePageWagmi";
import { jwtDecode } from "@/utils/jwt-decode";
import { brillionWagmi } from "@brillionfi/waas-react-sdk";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { createConfig, WagmiProvider } from 'wagmi';
import { mainnet, polygon, sepolia, polygonAmoy } from 'wagmi/chains'

const queryClient = new QueryClient();

const { brillionConnector, brillionTransport } = brillionWagmi({
  appId: process.env.NEXT_PUBLIC_DEFAULT_APPID ?? "7cd8e911-cb89-4bdf-9fa0-d5bb9563158b",
  baseUrl: process.env.NEXT_PUBLIC_API_URL as string,
  defaultNetwork: sepolia.id,
  WcProjectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID as string
})

const config = createConfig({
  chains: [mainnet, polygon, sepolia, polygonAmoy],
  transports: {
    [mainnet.id]: brillionTransport(mainnet.id),
    [polygon.id]: brillionTransport(polygon.id),
    [sepolia.id]: brillionTransport(sepolia.id),
    [polygonAmoy.id]: brillionTransport(polygonAmoy.id),
  },
  connectors: [brillionConnector]
})

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
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        <HomePageWagmi />
      </WagmiProvider>
    </QueryClientProvider>
  );
}
