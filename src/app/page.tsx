"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAuthorizationUrl } from "@/lib/getAuthorizationUrl";
import { getAuthorizationUrlSdk } from "@/lib/getAuthorizationUrlSdk";
import { loginIfSession } from "@/lib/loginIfSession";
import { LoginTypes } from "@/utils/types";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [appId, setAppId] = useState("");
  loginIfSession();
  const getLink = () => {
    if (process.env.NEXT_PUBLIC_USE_API === "true") {
      return getAuthorizationUrlSdk(appId);
    } else {
      console.log(1);
      return getAuthorizationUrl(LoginTypes.ApiUser, appId);
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
