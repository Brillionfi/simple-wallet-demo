import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-around p-24">
      <div className="flex justify-center flex-col items-center gap-3">
        <h1>CMS Login</h1>
        <Button asChild>
          <Link href="https://2mrss608q8.execute-api.eu-west-1.amazonaws.com/majid-allianceblock/users/login?oAuthProvider=Google&loginType=API_USER&redirectUrl=http://localhost:3000/home">
            Log in with Google
          </Link>
        </Button>
      </div>
      <div className="flex justify-center flex-col items-center gap-3">
        <h1>Wallet Login</h1>
        <Button>Log in with Google</Button>
      </div>
    </main>
  );
}
