"use client";

import {useLoginIfSession} from "@/lib/loginIfSession";
import {useEffect, useState} from "react";
import { useSearchParams } from "next/navigation";
import { BrillionProvider, LoginForm, LoginMethods } from '@brillionfi/waas-react-sdk';
import { Modal } from "@mui/joy";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [appId, setAppId] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    setAppId(searchParams?.get("appId") ?? process.env.NEXT_PUBLIC_DEFAULT_APPID ?? "")
  }, [])
  
  useLoginIfSession();

  return (
    <main className="flex min-h-screen items-center gap-6 p-24">
      <BrillionProvider appId={appId} baseUrl={process.env.NEXT_PUBLIC_API_URL as string} WCProjectId={process.env.NEXT_PUBLIC_WC_PROJECT_ID as string}>
        <Button 
          onClick={()=>{setOpen(true)}}
        >
          Connect Wallet
        </Button>
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={open}
          onClose={()=>{setOpen(false)}}
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <LoginForm 
            loginMethods={[
              LoginMethods.Google, 
              LoginMethods.Discord, 
              LoginMethods.Twitter, 
              LoginMethods.Metamask, 
              LoginMethods.WalletConnect, 
              LoginMethods.Email
            ]} 
            onClose={()=>{setOpen(false)}}
            redirectUrl={process.env.NEXT_PUBLIC_REDIRECT_URL as string}
            config={{
              showClose: false,
              customClassNames: {
                // contentContainer: "bg-black p-8 rounded-lg",
                // footerContainer: "flex justify-center",
              }
            }}
          />
        </Modal>
      </BrillionProvider>
    </main>
  );
}
