import { type NextApiRequest, type NextApiResponse } from "next";
import { generateAuthenticationOptions } from "@simplewebauthn/server";
import cookie from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { rpID } = JSON.parse(req.body as string) as {
    username: string;
    rpID: string;
  };

  const options = await generateAuthenticationOptions({
    timeout: 60000,
    allowCredentials: [],
    userVerification: "required",
    rpID,
  });

  res
    .setHeader(
      "set-cookie",
      cookie.serialize("current-challenge", options.challenge)
    )
    .status(200)
    .send(options);
}
