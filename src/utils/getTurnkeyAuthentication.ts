import { getWebAuthnAttestation } from "@turnkey/http";

const generateRandomBuffer = (): ArrayBuffer => {
  const arr = new Uint8Array(32);
  crypto.getRandomValues(arr);
  return arr.buffer;
};

const base64UrlEncode = (challenge: ArrayBuffer): string => {
  return Buffer.from(challenge).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
};

export const getAuthentication = async (walletName: string) => {
  const challenge = generateRandomBuffer();
  const authenticatorUserId = generateRandomBuffer();

  const attestation = await getWebAuthnAttestation({
    publicKey: {
      rp: {
        id: "brillion.finance",
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

  return {
    challenge: base64UrlEncode(challenge),
    attestation,
  };
};
