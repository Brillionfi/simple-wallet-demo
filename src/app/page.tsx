"use client";

import {useLoginIfSession} from "@/lib/loginIfSession";
import {useEffect, useState} from "react";
import { useSearchParams } from "next/navigation";
import { BrillionProvider, LoginForm, LoginMethods, defaultStyles } from '@brillionfi/waas-react-sdk';

export default function Home() {
  const [appId, setAppId] = useState<string>("");
  const searchParams = useSearchParams();

  useEffect(() => {
    setAppId(searchParams?.get("appId") ?? process.env.NEXT_PUBLIC_DEFAULT_APPID!)
  }, [])
  
  useLoginIfSession();

  return (
    <main className="flex min-h-screen items-center gap-6 p-24">
      <BrillionProvider appId={appId} baseUrl={process.env.NEXT_PUBLIC_API_URL as string} WCProjectId={process.env.NEXT_PUBLIC_WC_PROJECT_ID as string}>
        <LoginForm 
          loginMethods={[
            LoginMethods.Google, 
            LoginMethods.Discord, 
            LoginMethods.Twitter, 
            LoginMethods.Metamask, 
            LoginMethods.WalletConnect, 
            LoginMethods.Email
          ]} 
          redirectUrl={process.env.NEXT_PUBLIC_REDIRECT_URL as string}
          customProps={{
            containerStyle: {
              ...defaultStyles.container,
            },
            tittleStyle: {
              ...defaultStyles.tittle,
            },
          }}
        />
      </BrillionProvider>
    </main>
  );
}
