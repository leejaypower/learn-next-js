// loading.tsx - page.tsx가 로딩중일때는 얘가 보인다.
// 현재 경로에 있는 페이지 컴포넌트뿐만 아니라, 해당 경로 아래에 있는 모든 비동기 페이지 컴포넌트들을 다 스트리밍되도록 설정해준다. (layout.tsx와 비슷)
// 비동기 컴포넌트에서만 적용되며, 페이지 단위로 적용된다.
export default function Loading() {
  return <div>Loading ....</div>;
}
