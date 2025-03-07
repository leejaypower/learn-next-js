import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  // 모든 페이지에 공통적으로 적용되어야하는 html 코드 설정 컴포넌트
  // react의 index.html 역할
  // meta tag 설정, 폰트 로딩, charset 설정, global css 적용 등 전역적으로 적용되어야하는 코드 작성
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
