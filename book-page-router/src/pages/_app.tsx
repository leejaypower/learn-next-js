import "@/styles/globals.css";
import type { NextPage } from "next";
import GlobalLayout from "@/components/global-layout";
import type { AppProps } from "next/app";

type NextPageWithLayout = NextPage & {
	getLayout?: (page: React.ReactNode) => React.ReactNode;
};

// react의 app 컴포넌트 역할 - root 의 역할
export default function App({ Component, pageProps }: AppProps & {
  Component: NextPageWithLayout;
}) {
  // 현재 페이지의 역할을 할 Component prop
  // pageProps는 현재 페이지의 속성값
  const getLayout = Component.getLayout ?? ((page: React.ReactNode) => page);
  
  // mount 될 때 한번만 실행해서 어떤 페이지를 prefetch 할지 결정할 수 있음
  // const router = useRouter();
  // useEffect(() => {
  //   router.prefetch("/test");
  // }, []);

  return (
    <GlobalLayout>
      {getLayout(<Component {...pageProps} />)} 
      {/* jsx 표현식은 컴파일 되면 그냥 객체 값이다. 그래서 함수 인수로 넣을수 있음 */}
    </GlobalLayout>
  ); 
}
