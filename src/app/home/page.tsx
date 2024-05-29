"use client";

import { useSearchParams } from "next/navigation";
import { jwtDecode } from "@/utils/jwt-decode";
import { LoginTypes } from "@/utils/types";
import { CreateOrganization } from "@/components/CreateOrganization";
import { Dashboard } from "@/components/Dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";

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
    document.cookie = `session=${jwt}`;
  }, [searchParams, setJwt, setPayload, setJson]);
  return jwt && json && payload ? (
    payload?.role !== LoginTypes.ApiUser ? (
      <QueryClientProvider client={queryClient}>
        <Dashboard json={json} jwt={jwt} role={payload.role as LoginTypes} />
      </QueryClientProvider>
    ) : (
      <CreateOrganization jwt={jwt} />
    )
  ) : null;
}
