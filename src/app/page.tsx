"use client";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {getAuthorizationUrl} from "@/lib/getAuthorizationUrl";
import {getAuthorizationUrlSdk} from "@/hooks/auth/getAuthorizationUrlSdk";
import {useLoginIfSession} from "@/lib/loginIfSession";
import {LoginTypes} from "@/utils/types";
import {useEffect, useState} from "react";
import { useSearchParams } from "next/navigation";
import { Select, Option } from "@mui/joy";
import { AuthProvider } from '@brillionfi/wallet-infra-sdk'
import { useRouter } from 'next/navigation';
  
export default function Home() {
  const [appId, setAppId] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [provider, setProvider] = useState<AuthProvider>(AuthProvider.GOOGLE);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    setAppId(searchParams?.get("appId") ?? "")
  }, [])
  
  useLoginIfSession();

  const getLink = () => {
    if (process.env.NEXT_PUBLIC_USE_SDK === "true") {
      router.push(getAuthorizationUrlSdk(provider, appId, email));
    } else {
      router.push(getAuthorizationUrl({loginType: LoginTypes.WalletUser, provider, appId, email}).toString());
    }
  };

  return (
    <main className="flex min-h-screen items-center gap-6 p-24">
      <Input
        placeholder={"App id"}
        type="text"
        value={appId}
        onChange={(e) => setAppId(e.target.value)}
      />
      <Select defaultValue={AuthProvider.GOOGLE} sx={{width: 300}} onChange={(_event, arg)=> setProvider(arg as AuthProvider)}>
        {Object.values(AuthProvider).map((provider) => 
          <Option value={provider}>{provider}</Option>
        )}
      </Select>
      {provider === AuthProvider.EMAIL && 
        <Input
          placeholder={"Email"}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      }
      <Button disabled={!appId || (provider === AuthProvider.EMAIL && email === "")} onClick={getLink}>
        Log into wallet app
      </Button>
    </main>
  );
}
