import { ReactNode } from "react";
import Searchbar from "../components/searchbar";

// 해당하는 경로의 레이아웃으로 자동 설정이 된다. (이 경로 아래 중첩 경로 - search/setting가 있다고 해도)
// 지금처럼 라우트그룹 내에 레이아웃을 두면 경로 상의 아무런 영향을 주지 않으면서 하나의 관심사로 묶을 수 있다.
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Searchbar />
      {children}
    </div>
  );
}
