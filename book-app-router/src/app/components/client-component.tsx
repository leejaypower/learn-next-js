"use client";

import { ReactNode } from "react";
// ⚠️ 주의: 클라이언트 컴포넌트에서는 서버 컴포넌트를 import하면 안된다. 왜? 브라우저에서 한번 더 실행되는 시점에서 서버 컴포넌트는 없는 코드이다.
// 왜? js 번들에 포함되지 않고, 서버에서만 실행된 컴포넌트이기 때문에.

// (참고) 서버 컴포넌트는 JS 번들에 안 들어가고, 렌더 결과가 RSC payload로 전달된다.
//        오히려 이 RSC payload 형식 덕분에 클라이언트 라우팅(부분 교체)이 가능하다.

import ServerComponent from "./server-component";
// 그럼에도 불구하고 이렇게 서버 컴포넌트를 import하게 되면 해당 서버 컴포넌트를 next가 client 컴포넌트로 바꾼다.
// 이런 상황은 최대한 피하자. 불필요하게 js 번들을 크게 만들어서 좋을게 없기 때문이다.

export default function ClientComponent({ children }: { children: ReactNode }) {
  console.log("클라 컴포넌트");
  //   return <ServerComponent />;

  // children으로 받아서 렌더링하는 방향으로 우회할 수 있다.
  return <div>{children}</div>;
}
