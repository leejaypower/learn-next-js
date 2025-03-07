import { useRouter } from "next/router"; // 페이지 라우터에서는 next/router 사용

export default function Search() {
  const router = useRouter();
  
  console.log(router.query);

  return <div>Search {router.query.q}</div>;
}
