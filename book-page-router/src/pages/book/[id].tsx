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
    // paths에 없는 경로로 접근하면 404를 반환 (true로 하면 대체 페이지 처리)
    fallback: false,
  };
};

// 각 경로마다 실제로 넣을 데이터(props)를 가져오는 함수
export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;
  const book = await fetchOneBook(Number(id));
  return {
    props: { book },
  };
};

export default function Page({
  book,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!book) {
    return "문제가 발생했습니다. 다시 시도해주세요.";
  }

  const { id, title, subTitle, description, author, publisher, coverImgUrl } =
    book;

  return (
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
  );
}
