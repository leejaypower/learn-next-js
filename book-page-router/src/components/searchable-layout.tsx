import styles from "@/components/searchable-layout.module.css"

export default function SearchableLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      나는야 검색바{children}
    </div>
  );
}