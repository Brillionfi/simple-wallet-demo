import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.body);
  const { token, name } = req.body;
  const response = await fetch(`${process.env.HOST}/organizations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      monthlyBilling: true,
      active: true,
    }),
  }).then((res) => res.json());

  res.status(200).json(response);
}
