"use client";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {getAuthorizationUrl} from "@/lib/getAuthorizationUrl";
import {getAuthorizationUrlSdk} from "@/hooks/auth/getAuthorizationUrlSdk";
import {useLoginIfSession} from "@/lib/loginIfSession";
import {LoginTypes} from "@/utils/types";
import Link from "next/link";
import {useEffect, useState} from "react";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const [appId, setAppId] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    setAppId(searchParams?.get("appId") ?? "")
  }, [])
  
  useLoginIfSession();

  const getLink = () => {
    if (process.env.NEXT_PUBLIC_USE_SDK === "true") {
      return getAuthorizationUrlSdk(appId);
    } else {
      return getAuthorizationUrl(LoginTypes.WalletUser, appId);
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
      <Button disabled={!appId} asChild={!!appId}>
        <Link href={getLink()}>Log into wallet app</Link>
      </Button>
    </main>
  );
}
