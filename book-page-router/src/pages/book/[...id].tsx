// catch all segment
// 모든 경로를 캐치하는 세그먼트
// 예를 들어, /book/1/2/3 이렇게 경로가 있으면 1, 2, 3 모두 캐치
// 캐치 하는 것은 무제한 가능
// 하지만 경로가 없다면 404!!

import { useRouter } from "next/router"; // 페이지 라우터에서는 next/router 사용

export default function Book() {
  const router = useRouter();
  console.log(router.query);
  return <div>Book {router.query.id}</div>;
}
