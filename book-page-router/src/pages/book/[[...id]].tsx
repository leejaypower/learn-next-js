// optional catch all segment
// id가 없어도, id가 몇개가 있어도 모두 캐치

import { useRouter } from "next/router"; // 페이지 라우터에서는 next/router 사용

export default function Book() {
  const router = useRouter();
  console.log(router.query);
  return <div>Book {router.query.id}</div>;
}
