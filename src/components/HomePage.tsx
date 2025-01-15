import { useSearchParams } from "next/navigation";
import { jwtDecode } from "@/utils/jwt-decode";
import { Dashboard } from "@/components/Dashboard";
import { useEffect, useState } from "react";
import { useBrillionContext, useUser } from "@brillionfi/waas-react-sdk";
import { logOut } from "@/lib/logOut";

export default function Page() {
  const [jwt, setJwt] = useState<string>("");
  const [appId, setAppId] = useState<string>("");
  const searchParams = useSearchParams();
  const { authenticateUser } = useUser();
  const { isReady } = useBrillionContext();

  useEffect(() => {
    const login = async () => {
      const jwt = searchParams?.get("code");     
  
      if (jwt && isReady) {
        try {
          await authenticateUser(jwt);
          setJwt(jwt);
          const info = JSON.parse(jwtDecode(jwt.split(".")[1]));
          document.cookie = `session-wallet=${jwt}`;
          setAppId(info.appId);
        } catch (error) {
          console.error("Error decoding JWT:", error);
          logOut(jwt)
        }
      }
    }

    void login();
  }, [isReady, searchParams]);

  if (
    !jwt ||
    !appId
  ) {
    return null;
  }

  return (
    <Dashboard jwt={jwt}/>
  );
}
