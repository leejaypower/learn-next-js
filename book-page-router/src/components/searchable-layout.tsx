import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./searchable-layout.module.css";

export default function SearchableLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const q = router.query.q as string | undefined;
  const [search, setSearch] = useState(q || "");

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    if (!search || q === search) return;
    router.push(`/search?q=${search}`);
  };

  useEffect(() => {
    setSearch(q || "");
  }, [q]);

  return (
    <div>
      <div className={styles["search-container"]}>
        <input
          placeholder="검색어를 입력하세요"
          value={search}
          onChange={onChangeSearch}
          onKeyDown={(e) => e.key === "Enter" && onSubmit()}
        />
        <button type="button" onClick={onSubmit}>
          검색
        </button>
      </div>
      {children}
    </div>
  );
}
