import { Button } from "@/components/ui/button";
import { LoginTypes, getAuthorizationUrl } from "@/lib/url";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-around p-24">
      <div className="flex justify-center flex-col items-center gap-3">
        <h2>CMS Login</h2>
        <Button asChild>
          <Link href={getAuthorizationUrl(LoginTypes.ApiUser)}>
            Log in with Google
          </Link>
        </Button>
      </div>
      <div className="flex justify-center flex-col items-center gap-3">
        <h2>Wallet Login</h2>
        <Button>Log in with Google</Button>
      </div>
    </main>
  );
}
