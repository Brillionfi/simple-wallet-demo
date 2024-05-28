"use client";

import { Button } from "@/components/ui/button";
import { getAuthorizationUrl } from "@/lib/getAuthorization";
import { loginIfSession } from "@/lib/loginIfSession";
import { LoginTypes } from "@/utils/types";
import Link from "next/link";

export default function Home() {
  loginIfSession();
  return (
    <main className="flex min-h-screen items-center gap-6 p-24">
      <Button>
        <Link href={getAuthorizationUrl(LoginTypes.ApiUser)}>Dashboard</Link>
      </Button>
      <Button>
        <Link href={getAuthorizationUrl(LoginTypes.WalletUser)}>Wallet</Link>
      </Button>
    </main>
  );
}
