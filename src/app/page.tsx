import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-around p-24">
      <div className="flex justify-center flex-col items-center gap-3">
        <h1>CMS Login</h1>
        <Button>Log in with Google</Button>
      </div>
      <div className="flex justify-center flex-col items-center gap-3">
        <h1>Wallet Login</h1>
        <Button>Log in with Google</Button>
      </div>
    </main>
  );
}
