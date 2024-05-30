import { useSearchParams } from "next/navigation";
import { jwtDecode } from "@/utils/jwt-decode";
import { LoginTypes } from "@/utils/types";
import { Dashboard } from "@/components/Dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

export default function () {
  const [jwt, setJwt] = useState<string>();
  const [payload, setPayload] = useState<Record<string, string>>();
  const [json, setJson] = useState<string>();
  const searchParams = useSearchParams();
  useEffect(() => {
    const jwt = searchParams?.get("code") as string;
    setJwt(jwt);
    const info = JSON.parse(jwtDecode(jwt?.split(".")[1]));
    setPayload(info);
    setJson(JSON.stringify(info, undefined, 2));
    document.cookie = `session-wallet=${jwt}`;
  }, [searchParams, setJwt, setPayload, setJson]);
  console.log(payload);
  return (
    jwt &&
    json &&
    payload &&
    payload?.role === LoginTypes.WalletUser && (
      <QueryClientProvider client={queryClient}>
        <Dashboard json={json} jwt={jwt} payload={payload} />
      </QueryClientProvider>
    )
  );
}
