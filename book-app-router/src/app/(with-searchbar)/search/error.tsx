"use client"; // 에러 발생지가 서버, 클라 모두일 수 있기 때문에 다 대응할 수 있도록 클라이언트 컴포넌트로 만든다.
// error boundary 역할

import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error; // next가 발생한 에러 객체를 전달해준다
  reset: () => void; // 에러가 발생한 페이지를 복구하기 위해 컴포넌트를 다시 렌더링시도하는 함수
  // 다만, 서버에서 받은 데이터로 다시 한번 클라이언트가 렌더링 시도 해보는 함수임(다시 fetch 하지는 않음)
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  const [isPending, startTransition] = useTransition(); // startTransition을 사용해도 되지만 ispending 값을 얻으려면 useTransition이 더 좋음

  return (
    <div>
      <h3>검색에 실패했습니다.</h3>
      <button
        onClick={() => {
          // refresh는 비동기로 처리된다! 다만 promise 반환을 안함... 그래서 ui를 변경시키는 것들을 하나로 묶어 처리하기 위해 아래와 같이한다.
          startTransition(() => {
            router.refresh(); // 현재 페이지에 필요한 서버컴포넌트들을 다시 불러옴 (rsc payload를 다시 돌려달라) - fetch 다시 호출됨
            reset(); // 에러 상태 초기화, 컴포넌트 다시 렌더링 (error 컴포넌트가 클라이언트 컴포넌트이므로)
          });
        }}
      >
        {isPending ? "다시 시도중" : "다시 시도"}
      </button>
    </div>
  );
}
