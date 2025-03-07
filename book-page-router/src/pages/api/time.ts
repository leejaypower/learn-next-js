import type { NextApiRequest, NextApiResponse } from "next";

// Next.js는 API 라우트를 제공하는데, 이를 통해 API를 구축할 수 있다.
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const date = new Date();

  res.status(200).json({ time: date.toLocaleString() });
}
