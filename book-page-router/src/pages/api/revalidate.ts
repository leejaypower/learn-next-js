import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest, // 일반 페이지 컴포넌트에서는 이런 req,res를 못만진다. 이것들은 "next안의 백엔드"
  res: NextApiResponse, // 순수 node.js 응답 객체가 아니라 next가 편의 메서드를 얹어서 확장한 객체
) {
  try {
    // on-demand ISR에서 사용: api routes를 받아서 revalidate라는 next 함수를 실행함으로써 특정 페이지를 다시 생성하도록 만들 수 있다.
    await res.revalidate("/");
    return res.json({ revalidate: true });
  } catch (err) {
    res.status(500).send("revalidation failed");
  }
}
