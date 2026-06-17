import SearchableLayout from "@/components/searchable-layout";
import styles from "./index.module.css";

export default function Home() {
	return (
		<>
			<header className={styles.header}>Hello World</header>
		</>
	);
}

// Next.js에서 "특정 페이지에 커스텀 레이아웃"을 적용하는 패턴 - getLayout 이름도 일종의 관습
// 1️⃣ 페이지별로 다른 레이아웃 적용 가능
// 2️⃣ 공통 레이아웃을 유지하면서 특정 페이지만 다르게 설정 가능
// 3️⃣ Next.js의 getServerSideProps와 함께 사용 가능
Home.getLayout = (page: React.ReactNode) => {
	return <SearchableLayout>{page}</SearchableLayout>;
}; 
// 왜 일반 SPA 에서는 이렇게 안할까?
// -> 컴포넌트 트리 전체를 router가 직접 소유하기 때문에 레이아웃을 페이지 컴포넌트에서 직접 제어할 수 있음 - 더 직관적인 중첩 라우트로 해결
// -> Next.js Pages Router에서는 렌더링의 최상단을 내가 소유하지 않음
// "이 페이지는 이 레이아웃을 써라"는 정보를 페이지 컴포넌트에 메타데이터처럼 얹어서 Next.js에게 전달
// 각 페이지가 자기 레이아웃을 스스로 판단해서 app(완벽한 전역 공통 레이아웃만 적용)에게 책임을 주지 않는 효과