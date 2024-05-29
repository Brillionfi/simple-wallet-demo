import { BASE_URL } from "@/utils/constants";
import type { TChain, TAuthType } from "@/utils/types";
import { v4 as uuidv4 } from "uuid";

export async function createWallet(
  chain: TChain,
  authType: TAuthType,
  token: string
) {
  const response = await fetch(`${BASE_URL}/wallets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Idempotency-Key": uuidv4(),
    },
    body: JSON.stringify({
      walletType: {
        eoa: {
          walletName: `Wallet-${authType}-${Math.round(
            Math.random() * 1000000
          )}`,
          walletFormat: authType,
          authenticationType: {
            challenge: "FsAxSlgRXHR7o-ePTrRreH8gm-OZVix8V3wlSqJQ50w",
            attestation: {
              credentialId: "_xC0tyqT8LYXQfz9hCQBTVbXS4I",
              clientDataJson:
                "eyJ0eXBlIjoid2ViYXV0aG4uY3JlYXRlIiwiY2hhbGxlbmdlIjoiRnNBeFNsZ1JYSFI3by1lUFRyUnJlSDhnbS1PWlZpeDhWM3dsU3FKUTUwdyIsIm9yaWdpbiI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzAwMCIsImNyb3NzT3JpZ2luIjpmYWxzZX0",
              attestationObject:
                "o2NmbXRkbm9uZWdhdHRTdG10oGhhdXRoRGF0YViYSZYN5YgOjGh0NBcPZHZgW4_krrmihjLHmVzzuoMdl2NdAAAAAAAAAAAAAAAAAAAAAAAAAAAAFP8QtLcqk_C2F0H8_YQkAU1W10uCpQECAyYgASFYIKOv0RbKMA4DyVDI_Er_-SqUY7an5o41_8X7ugxQHwIeIlggzuElSvkH1R9SP_XRwfsk2vM0Y4Fc_UdJQpyU8lLcytM",
              transports: [
                "AUTHENTICATOR_TRANSPORT_HYBRID",
                "AUTHENTICATOR_TRANSPORT_INTERNAL",
              ],
            },
          },
        },
      },
    }),
  }).then((res) => res.json());
  console.log(response);
}
