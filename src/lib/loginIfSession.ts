import { useEffect } from "react";

export function loginIfSession() {
  useEffect(() => {
    const cookies = document.cookie.split(";");
    const sessionCookie = cookies.find((strings) =>
      strings.includes("session")
    );
    const jwt = sessionCookie?.split("=")[1];
    if (jwt?.split(".").length === 3) {
      window.location.href = "http://localhost:3000/home?code=" + jwt;
    }
  }, []);
}
