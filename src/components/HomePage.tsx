import {useSearchParams} from "next/navigation";
import {jwtDecode} from "@/utils/jwt-decode";
import {LoginTypes} from "@/utils/types";
import {Dashboard} from "@/components/Dashboard";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {useEffect, useState} from "react";
import {WalletInfraProvider} from "@/contexts/WalletInfraContext";

const queryClient = new QueryClient();

export default function Page() {
  const [jwt, setJwt] = useState<string>("");
  const [payload, setPayload] = useState<Record<string, string> | null>(null);
  const [json, setJson] = useState<string>("");
  const [appId, setAppId] = useState<string>("");
  const searchParams = useSearchParams();

  useEffect(() => {
    const jwt = searchParams?.get("code");
    if (jwt) {
      setJwt(jwt);
      try {
        const info = JSON.parse(jwtDecode(jwt.split(".")[1]));
        setPayload(info);
        setJson(JSON.stringify(info, undefined, 2));
        document.cookie = `session-wallet=${jwt}`;
        setAppId(info.appId);
      } catch (error) {
        console.error("Error decoding JWT:", error);
      }
    }
  }, [searchParams]);

  const useSdk = process.env.NEXT_PUBLIC_USE_SDK === "true";

  if (
    !jwt ||
    !json ||
    !payload ||
    !appId ||
    payload.role !== LoginTypes.WalletUser
  ) {
    return null;
  }

  const content = (
    <QueryClientProvider client={queryClient}>
      <Dashboard json={json} jwt={jwt} payload={payload} />
    </QueryClientProvider>
  );

  if (useSdk) {
    return (
      <WalletInfraProvider
        appId={appId}
        baseUrl={process.env.NEXT_PUBLIC_API_URL as string}
        jwt={jwt}
      >
        {content}
      </WalletInfraProvider>
    );
  } else {
    return content;
  }
}
