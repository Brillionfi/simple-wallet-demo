import { useEffect } from "react";

export function loginIfSession() {
  useEffect(() => {
    const cookies = document.cookie.split(";");
    const sessionCookie = cookies.find((strings) =>
      strings.includes("session-wallet")
    );
    const jwt = sessionCookie?.split("=")[1];
    if (jwt?.split(".").length === 3) {
      window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/home?code=` + jwt;
    }
  }, []);
}
