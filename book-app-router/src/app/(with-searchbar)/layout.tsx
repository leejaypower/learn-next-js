import { ReactNode, Suspense } from "react";
import Searchbar from "../../components/searchbar";

// 해당하는 경로의 레이아웃으로 자동 설정이 된다. (이 경로 아래 중첩 경로 - search/setting가 있다고 해도)
// 지금처럼 라우트그룹 내에 레이아웃을 두면 경로 상의 아무런 영향을 주지 않으면서 하나의 관심사로 묶을 수 있다.
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      {/* 클라이언트 라우터 캐시: 레이아웃은 한번 만들어지면 next가 클라이언트 js메모리(페이지의 js)에 캐시로 들고 재사용된다. */}
      <div>{new Date().toLocaleString()}</div>
      {/* next 에서 suspense 로 묶여있는 애들은 곧바로 렌더링하지 않는다.
       suspense 내의 비동기 작업이 끝날때까지 미결의 상태 */}
      <Suspense fallback={<div>Loading ... </div>}>
        <Searchbar />
      </Suspense>
      {children}
    </div>
  );
}
