import { ReactNode } from "react";

// 루트 레이아웃 - 상위 경로 레이아웃 - 이 레이아웃으로 중첩이 된다.
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div>세팅 헤더</div>
      {children}
    </div>
  );
}
