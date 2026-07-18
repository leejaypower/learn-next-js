import { ReactNode, Suspense } from "react";
import Searchbar from "../../components/searchbar";

// 해당하는 경로의 레이아웃으로 자동 설정이 된다. (이 경로 아래 중첩 경로 - search/setting가 있다고 해도)
// 지금처럼 라우트그룹 내에 레이아웃을 두면 경로 상의 아무런 영향을 주지 않으면서 하나의 관심사로 묶을 수 있다.
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      {/* 클라이언트 라우터 캐시: 레이아웃은 한번 만들어지면 next가 클라이언트 js메모리(페이지의 js)에 캐시로 들고 재사용된다. */}
      <div>{new Date().toLocaleString()}</div>
      {/* Searchbar는 useSearchParams(요청 시점에만 아는 URL 쿼리)를 읽는 클라 컴포넌트다.
         Suspense로 안 감싸면 페이지 전체가 static을 포기(deopt)하고 클라 렌더로 떨어진다.
         Suspense로 격리하면: 나머지는 static 유지 + 빌드타임엔 fallback을 static HTML에 넣어두고,
         실제 Searchbar는 브라우저(클라이언트)에서 렌더된다.
         (PPR처럼 "서버가 요청 시점에 그 구멍을 채우는" 게 아님 — 여긴 클라에서 채움) */}
      <Suspense fallback={<div>Loading ... </div>}>
        <Searchbar />
      </Suspense>
      {children}
    </div>
  );
}
