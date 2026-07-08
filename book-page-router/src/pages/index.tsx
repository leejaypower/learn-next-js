import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import { ReactNode } from "react";
import books from "@/mock/books.json";
import BookItem from "@/components/book-item";
import { InferGetServerSidePropsType, InferGetStaticPropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books";

// export const getServerSideProps = async () => {
//   // 컴포넌트보다 먼저 실행되어서(서버에서 실행), 컴포넌트에 필요한 데이터를 불러오는 함수
//   // const data = "hello";
//   // console.log("서버사이드"); // 터미널에서만 찍힌다.

//   const [allBooks, recoBooks] = await Promise.all([
//     fetchBooks(),
//     fetchRandomBooks(),
//   ]);

//   return {
//     // 무조건 props property가 있는 객체여야한다.
//     props: {
//       allBooks,
//       recoBooks,
//     },
//   };
// };

export const getStaticProps = async () => {
  console.log("static");
  const [allBooks, recoBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks(),
  ]);

  return {
    props: {
      allBooks,
      recoBooks,
    },
  };
};

export default function Home({
  allBooks,
  recoBooks,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  //  console.log(allBooks); // 여기서 브라우저 콘솔에 찍힌다.

  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서 </h3>
        {recoBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {allBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </div>
  );
}

// Next.js에서 "특정 페이지에 커스텀 레이아웃"을 적용하는 패턴 - getLayout 이름도 일종의 관습
// 1️⃣ 페이지별로 다른 레이아웃 적용 가능
// 2️⃣ 공통 레이아웃을 유지하면서 특정 페이지만 다르게 설정 가능
// 3️⃣ Next.js의 getServerSideProps와 함께 사용 가능
// ⚠️ 이런 패턴을 사용안하고 그냥 각 페이지에 레이아웃 컴포넌트를 불러와서 조합하게 되면, 페이지 변경시 새로 마운트되므로
// 여러 페이지가 같은 레이아웃 인스턴스를 공유하며 상태를 유지할 수 없음 (이건 spa도 마찬가지 - 다만 react router로 유지하도록 설정할 수 있음)
Home.getLayout = (page: React.ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
// 왜 일반 SPA 에서는 이렇게 안할까?
// -> 컴포넌트 트리 전체를 router가 직접 소유하기 때문에 레이아웃을 페이지 컴포넌트에서 직접 제어할 수 있음 - 더 직관적인 중첩 라우트로 해결
// -> Next.js Pages Router에서는 렌더링의 최상단을 내가 소유하지 않음
// "이 페이지는 이 레이아웃을 써라"는 정보를 페이지 컴포넌트에 메타데이터처럼 얹어서 Next.js에게 전달
// 각 페이지가 자기 레이아웃을 스스로 판단해서 app(완벽한 전역 공통 레이아웃만 적용)에게 책임을 주지 않는 효과
