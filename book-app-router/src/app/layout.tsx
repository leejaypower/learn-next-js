import "./globals.css";
import Link from "next/link";
import style from "./layout.module.css";
import { BookData } from "@/types";

async function Footer() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    {
      cache: "force-cache", // 캐시 강제 - 북을 등록하는 기능이 없기 때문에
    },
    // request memoization: next가 한 페이지를 렌더링할때 중복 호출되는 api를 자동으로 캐싱한다.
    // 렌더링이 종료되면 캐싱이 소멸된다.
  );
  if (!response.ok) {
    return <footer>제작 @leejay</footer>;
  }

  const books: BookData[] = await response.json();
  const bookCount = books.length;

  return (
    <footer>
      <div>제작 @leejay</div>
      <div>{bookCount} 개의 도서가 등록되어 있습니다.</div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className={style.container}>
          <header>
            <Link href={"/"}>📚 ONEBITE BOOKS</Link>
          </header>
          <main>{children}</main>
          <Footer></Footer>
        </div>
      </body>
    </html>
  );
}
