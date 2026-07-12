import SearchableLayout from "@/components/searchable-layout";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import books from "@/mock/books.json";
import BookItem from "@/components/book-item";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetStaticPropsContext,
  InferGetServerSidePropsType,
} from "next";
import fetchBooks from "@/lib/fetch-books";
import { BookData } from "@/types";
import { useState } from "react";

import Head from "next/head";

// export const getServerSideProps = async (
//   context: GetServerSidePropsContext,
// ) => {
//   const q = context.query.q;
//   const books = await fetchBooks(q as string);

//   return {
//     props: { books },
//   };
// };

// export const getStaticProps = async (context: GetStaticPropsContext) => {
//   const q = context.query.q; // 빌드 타임에 생성되는 ssg 특성상 런타임의 쿼리 값을 알 수가 없다.
//   const books = await fetchBooks(q as string);

//   return {
//     props: { books },
//   };
// };

export default function Page() {
  const [books, setBooks] = useState<BookData[]>([]);

  const router = useRouter();
  const q = router.query.q;

  const fetchSearchResult = async () => {
    const data = await fetchBooks(q as string);
    setBooks(data);
  };

  useEffect(() => {
    if (q) {
      fetchSearchResult();
    }
  }, [q]);

  return (
    <div>
      <Head>
        <title>한입북스 - 검색결과</title>
        <meta property="og:image" content="/thumbnail.png"></meta>
        <meta property="og:title" content="한입북스 - 검색결과"></meta>
        <meta
          property="og:description"
          content="한입북스에 등록된 도서들을 만나보세요!"
        ></meta>
      </Head>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
