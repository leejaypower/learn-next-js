import { notFound } from "next/navigation";
import style from "./page.module.css";

// 빌드 타임에 next 서버가 자동으로 이 값을 읽어서 generateStaticParams가 반환하는 리스트에 없으면 그냥 404
// export const dynamicParams = false;

// 빌드 타임에 next 서버가 자동으로 이 파라미터를 읽어서 해당하는 북 페이지를 정적으로 만들게 된다. (= page router의 getStaticPath)
export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }]; // 문자열로만 명시해야함
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string | string[] }>;
}) {
  // await을 하는 이유는? 쿼리 스트링 값은 런타임에 정해지기 때문에 동적 처리를 해야한다.
  // promise로 주면 컴포넌트가 await params를 호출하는 순간을 next가 포착할 수 있다.
  // = params를 실제로 읽기 전까지의 부분을 미리 렌더링하고, 읽는 순간부터 동적으로 전환같은 최적화가 가능해짐.
  const { id } = await params;
  // 즉 awiat은 이 값은 요청 시점에 결정되는 값이니 지금부터 동적 렌더링이 필요하다는 신호를 next에 주는 장치

  const url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${id}`;
  const response = await fetch(url);
  // 동적 경로를 갖는 페이지에 한해 예외적으로 generateStaticParams가 있으면 static 페이지로 설정된다. (만약 여기에 coockies(), headers()같은 동적 api를 안쓴다면)

  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    return <div>오류가 발생했습니다.</div>;
  }

  const book = await response.json();

  const { title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
  );
}
