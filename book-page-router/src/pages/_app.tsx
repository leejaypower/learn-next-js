import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import { useRouter } from "next/router";

// react의 app 컴포넌트 역할 - root 의 역할
export default function App({ Component, pageProps }: AppProps) {
  // 현재 페이지의 역할을 할 Component prop
  // pageProps는 현재 페이지의 속성값
  
  const router = useRouter();

  const onClickButton = () => {
    router.push("/search");
  }

  return (
    <>
      <header>
        <Link href="/">Home</Link>
        <br></br>
        <Link href="/search">Search</Link>
        <br></br>
        <Link href="/book/1">book/1</Link>
        <div>
          <button onClick={onClickButton}>search 페이지로 이동</button>
        </div>
      </header>
        <Component {...pageProps} />
    </>
  );
}
