import BookItem from "@/components/book-item";
import { BookData } from "@/types";
import { delay } from "@/util/delay";
import { Suspense } from "react";

// export const dynamic = "error";

async function SearchResult({ q }: { q: string }) {
  const url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`;

  await delay(1500);
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

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>; // next 15부터 await을 읽기 전까지 static으로, 키워드를 만나면 dynamic으로 전환 -> 최적화의 기반
}) {
  const { q } = await searchParams;
  return (
    <Suspense key={q} fallback={<div>검색 중...</div>}>
      {/* SearchResult를 스트리밍으로 전환 -> 느린 fetch 를 안기다리고 먼저 응답 */}
      <SearchResult q={q || ""}></SearchResult>
    </Suspense>
  );
}
