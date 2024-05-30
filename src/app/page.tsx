"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAuthorizationUrl } from "@/lib/getAuthorization";
import { loginIfSession } from "@/lib/loginIfSession";
import { LoginTypes } from "@/utils/types";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [appId, setAppId] = useState("");
  loginIfSession();
  return (
    <main className="flex min-h-screen items-center gap-6 p-24">
      <Input
        placeholder={"App id"}
        type="text"
        value={appId}
        onChange={(e) => setAppId(e.target.value)}
      />
      <Button disabled={!appId} asChild={!!appId}>
        <Link href={getAuthorizationUrl(LoginTypes.WalletUser, appId)}>
          Log into wallet app
        </Link>
      </Button>
    </main>
  );
}
