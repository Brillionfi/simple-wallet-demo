import {B2B_API_URL} from "@/utils/constants";
import type {TChain} from "@/utils/types";
import {v4 as uuidv4} from "uuid";
import {getWebAuthnAttestation} from "@turnkey/http";

export async function createWallet(chain: TChain, token: string) {
  const walletName = `Wallet-${chain}-${Math.round(Math.random() * 1000000)}`;

  const generateRandomBuffer = (): ArrayBuffer => {
    const arr = new Uint8Array(32);
    crypto.getRandomValues(arr);
    return arr.buffer;
  };

  const base64UrlEncode = (challenge: ArrayBuffer): string => {
    return Buffer.from(challenge)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "");
  };

  const challenge = generateRandomBuffer();
  const authenticatorUserId = generateRandomBuffer();

  const attestation = await getWebAuthnAttestation({
    publicKey: {
      rp: {
        id: "localhost",
        name: "Turnkey Federated Passkey Demo",
      },
      challenge,
      pubKeyCredParams: [
        {
          type: "public-key",
          alg: -7,
        },
      ],
      user: {
        id: authenticatorUserId,
        name: walletName,
        displayName: walletName,
      },
    },
  });

  const response = await fetch(`${B2B_API_URL}/wallets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Idempotency-Key": uuidv4(),
    },
    body: JSON.stringify({
      walletType: {
        eoa: {
          walletName,
          walletFormat: chain,
          authenticationType: {
            challenge: base64UrlEncode(challenge),
            attestation,
          },
        },
      },
    }),
  }).then((res) => res.json());
  console.log(response);
}
