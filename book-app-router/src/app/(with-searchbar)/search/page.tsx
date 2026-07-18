import BookItem from "@/components/book-item";
import { BookData } from "@/types";

export const dynamic = "error";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`;

  const response = await fetch(url, { cache: "force-cache" }); // 한번 검색이 된 페이지는 좀 더 빠르게 응답하기 위해 데이터 캐시 설정
  const result: BookData[] = await response.json();

  return (
    <div>
      {result.map((result) => (
        <BookItem key={result.id} {...result} />
      ))}
    </div>
  );
}
