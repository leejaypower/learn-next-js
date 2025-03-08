import { useRouter } from "next/router"; // 페이지 라우터에서는 next/router 사용
import SearchableLayout from "@/components/searchable-layout";
export default function Search() {
  const router = useRouter();
  
  console.log(router.query);

  return <div>Search {router.query.q}</div>;
}

Search.getLayout = (page: React.ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
}