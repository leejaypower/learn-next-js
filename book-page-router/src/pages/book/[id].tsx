// optional catch all segment [[...id]]
// id가 없어도(index.tsx 만들기 싫을때), id가 몇개가 있어도 모두 캐치
// 주의: catch all segment와 같은 레벨에 둘 수 없음!

// import { useRouter } from 'next/router'; // 페이지 라우터에서는 next/router 사용

// export default function Book() {
//   const router = useRouter();
//   console.log(router.query);
//   return <div>Book {router.query.id}</div>;
// }

// [...id].tsx
// catch all segment: 모든 경로를 캐치하는 세그먼트
// 예를 들어, /book/1/2/3 이렇게 경로가 있으면 1, 2, 3 모두 캐치
// 캐치 하는 것은 무제한 가능
// 하지만 경로가 없다면 404!!

// import { useRouter } from "next/router"; // 페이지 라우터에서는 next/router 사용

// export default function Book() {
//   const router = useRouter();
//   console.log(router.query);
//   return <div>Book {router.query.id}</div>;
// }

import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
} from "next";
import style from "./[id].module.css";
import fetchOneBook from "@/lib/fetch-one-book";
import { useRouter } from "next/router";
import { notFound } from "next/navigation";
import Head from "next/head";

// export const getServerSideProps = async (
//   context: GetServerSidePropsContext,
// ) => {
//   const id = context.params!.id; // 무조건 params가 있어야 접근할 수 있는 사이트이기 때문에 단언해도 괜찮다.
//   const book = await fetchOneBook(Number(id));
//   return {
//     props: { book },
//   };
// };

// 어떤 경로(id)들을 미리 정적 생성할지 알려주는 함수
export const getStaticPaths = async () => {
  return {
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
    // false: paths에 없는 경로로 접근하면 404를 반환 = {notFound: true}
    // true: 일단 props가 없는 페이지를 빠르게 생성해서 반환 (레이아웃만) -> 그 이후 props를 따로 반환
    // 'blocking' : paths에 없는 경로로 접근하면 즉각적으로 페이지를 생성(사전렌더링)해서 리턴 - 페이지의 크기에 따라 대기시간이 오래걸릴 수 있다.
    fallback: true,
  };
};

// 각 경로마다 실제로 넣을 데이터(props)를 가져오는 함수
export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;
  const book = await fetchOneBook(Number(id));

  if (!book) {
    return {
      // next서버가 notFound로 리다이렉팅하도록 하기
      notFound: true,
    };
  }

  return {
    props: { book },
  };
};

export default function Page({
  book,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) {
    // fallback이 true인 경우 첫 진입시 메타 태그가 안나와 SEO 설정이 안되는 경우가 생긴다.
    return (
      <>
        <Head>
          <title>한입북스</title>
          <meta property="og:image" content="/thumbnail.png"></meta>
          <meta property="og:title" content="한입북스"></meta>
          <meta
            property="og:description"
            content="한입북스에 등록된 도서들을 만나보세요!"
          ></meta>
        </Head>
        <div>로딩중입니다</div>
      </>
    );
  }

  if (!book) {
    return "문제가 발생했습니다. 다시 시도해주세요.";
  }

  const { id, title, subTitle, description, author, publisher, coverImgUrl } =
    book;

  return (
    <>
      <Head>
        <title>한입북스 - 검색결과</title>
        <meta property="og:image" content={coverImgUrl}></meta>
        <meta property="og:title" content={title}></meta>
        <meta property="og:description" content={description}></meta>
      </Head>
      <div className={style.container}>
        <div
          className={style.cover_img_container}
          style={{ backgroundImage: `url('${coverImgUrl}')` }}
        >
          <img src={coverImgUrl} />
        </div>
        <div className={style.title}>{title}</div>
        <div className={style.subTitle}>{subTitle}</div>
        <div className={style.author}>
          {author} | {publisher}
        </div>
        <div className={style.description}>{description}</div>
      </div>
    </>
  );
}
