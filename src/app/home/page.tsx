"use client";

import { useSearchParams } from "next/navigation";
import ReactJson from "react-json-view";

export default function () {
  const searchParams = useSearchParams();
  const code = searchParams.get("code") as string;
  const payload = code.split(".")[1];
  const decodedPayload = base64UrlDecode(payload);
  return (
    <div>
      <p>Here is the decoded jwt :</p>
      <br />
      <ReactJson src={JSON.parse(decodedPayload)} />
    </div>
  );
}

function base64UrlDecode(base64Url: string) {
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  const base64Padded = base64 + padding;
  const binary = atob(base64Padded);
  const binaryLength = binary.length;
  const bytes = new Uint8Array(binaryLength);
  for (let i = 0; i < binaryLength; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  const text = new TextDecoder().decode(bytes);
  return text;
}
