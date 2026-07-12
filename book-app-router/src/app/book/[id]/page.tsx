export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // await을 하는 이유는? 쿼리 스트링 값은 런타임에 정해지기 때문에 동적 처리를 해야한다.
  // promise로 주면 컴포넌트가 await params를 호출하는 순간을 next가 포착할 수 있다.
  // = params를 실제로 읽기 전까지의 부분을 미리 렌더링하고, 읽는 순간부터 동적으로 전환같은 최적화가 가능해짐.
  const { id } = await params;
  // 즉 awiat은 이 값은 요청 시점에 결정되는 값이니 지금부터 동적 렌더링이 필요하다는 신호를 next에 주는 장치

  return <div>book/{id} 페이지입니다.</div>;
}
