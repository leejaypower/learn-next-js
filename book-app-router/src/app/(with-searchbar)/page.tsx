import BookItem from "@/components/book-item";
import style from "./page.module.css";
import { BookData } from "@/types";

async function AllBooks() {
  const url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`;
  const response = await fetch(url);

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
  const url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`;
  const response = await fetch(url);

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

export default function Home() {
  return (
    <div className={style.container}>
      <RecoBooks></RecoBooks>
      <AllBooks></AllBooks>
    </div>
  );
}
