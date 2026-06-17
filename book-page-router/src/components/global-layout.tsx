import Link from "next/link";
import styles from "@/components/global-layout.module.css"

export default function GlobalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/">📚 JAY BOOKS</Link>
      </header>
      <main>
        {children}
      </main>
      <footer className={styles.footer}>제작 @leejaypower</footer>
    </div>
  );
}