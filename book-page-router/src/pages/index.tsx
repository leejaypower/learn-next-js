import SearchableLayout from '@/components/searchable-layout';
import styles from './index.module.css'

export default function Home() {
  return (
    <>
      <header className={styles.header}>Hello World</header>
    </>
  );
}

// Next.js에서 특정 페이지에 커스텀 레이아웃을 적용하는 패턴
// 1️⃣ 페이지별로 다른 레이아웃 적용 가능
// 2️⃣ 공통 레이아웃을 유지하면서 특정 페이지만 다르게 설정 가능
// 3️⃣ Next.js의 getServerSideProps와 함께 사용 가능
Home.getLayout = (page: React.ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
} 