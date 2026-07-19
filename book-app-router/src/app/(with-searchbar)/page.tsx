import BookItem from "@/components/book-item";
import style from "./page.module.css";
import { BookData } from "@/types";
import { delay } from "@/util/delay";
import { Suspense } from "react";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";

// 특정 페이지의 유형을 강제로 static, dynamic 페이지로 설정하는 옵션
// 1. auto : 기본값, 아무것도 강제하지 않음
// 2. force-dynamic: 강제로 dynamic 페이지로 설정
// 3. force-static: 강제로 static 페이지로 설정
// 4. error: 강제로 static 페이지 설정 (설정하면 안되는 이유가 있으면 빌드 오류 발생)
// export const dynamic = "";

async function AllBooks() {
  await delay(1500);

  const url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`;
  const response = await fetch(url, { cache: "force-cache" }); // 캐시 강제 - 북은 고정된 데이터이기 때문

  if (!response.ok) {
    return <div>오류가 발생했습니다.</div>;
  }

  const allBooks: BookData[] = await response.json();
  return (
    <section>
      <h3>등록된 모든 도서</h3>
      {allBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </section>
  );
}

async function RecoBooks() {
  await delay(3000);

  const url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`;
  // const response = await fetch(url, { cache: "force-cache" }); // 캐시 강제 - 한번 응답한 이후로 계속 캐싱된 값
  // const response = await fetch(url, { next: { tags: ['a'] } });
  const response = await fetch(url, { next: { revalidate: 3 } }); // 특정 시간을 주기로 캐시 업데이트 (stale 상태)

  if (!response.ok) {
    return <div>오류가 발생했습니다.</div>;
  }

  const recoBooks: BookData[] = await response.json();

  return (
    <section>
      <h3>지금 추천하는 도서</h3>
      {recoBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </section>
  );
}

export const dynamic = "force-dynamic"; // suspense test를 위해 강제로 dynamic 설정

export default async function Home() {
  return (
    <div className={style.container}>
      <Suspense
        fallback={
          <>
            <BookListSkeleton count={3} />
          </>
        }
      >
        <RecoBooks />
      </Suspense>

      <Suspense
        fallback={
          <>
            <BookListSkeleton count={10} />
          </>
        }
      >
        <AllBooks />
      </Suspense>
    </div>
  );
}
