import Link from "next/link";
import styles from "@/components/global-layout.module.css";

export default function GlobalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        {/* prefetch: 서버 왕복 없이, URL만 바꾸고 필요한 페이지 청크를 받아 화면 교체 */}
        <Link href="/" prefetch={false}>
          {/* false로 해서 명시적으로 프리패칭을 막을 수 있음 (기본값 true) */}
          {/* 청크(코드)와 데이터를 구분해야 한다. 해당 페이지의 "코드"를 미리 받는 타이밍에만 영향을 주고, 데이터는 매번 새로 가져온다. */}
          {/* 한번 받은 이후에는 캐시된다. 보통 첫 진입 페이지니까 false로 해도 괜찮다. */}
          📚 JAY BOOKS
        </Link>
      </header>
      <main>{children}</main>
      <footer className={styles.footer}>제작 @leejaypower</footer>
    </div>
  );
}
