"use client";

import { useSearchParams } from "next/navigation";
import { jwtDecode } from "@/utils/jwt-decode";
import { LoginTypes } from "@/utils/types";
import { CreateOrganization } from "@/components/CreateOrganization";
import { Dashboard } from "@/components/Dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function () {
  const searchParams = useSearchParams();
  const jwt = searchParams?.get("code") as string;
  document.cookie = `session=${jwt}`;
  const payload = JSON.parse(jwtDecode(jwt.split(".")[1]));
  const json = JSON.stringify(payload, undefined, 2);
  return payload.role !== LoginTypes.ApiUser ? (
    <QueryClientProvider client={queryClient}>
      <Dashboard json={json} jwt={jwt} role={payload.role} />
    </QueryClientProvider>
  ) : (
    <CreateOrganization jwt={jwt} />
  );
}
