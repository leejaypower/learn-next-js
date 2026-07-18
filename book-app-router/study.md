### Next 서버가 런타임에 하는것 (요청~ 서빙 사이)
```
요청 →
  라우팅 매칭
  ├─ static 라우트 → Full Route Cache에서 미리 만든 HTML/RSC 서빙 (빠른 길)
  └─ dynamic 라우트 → 그 자리에서 서버 컴포넌트 렌더 → HTML/RSC 생성
  fetch 만나면 → Request Memoization / Data Cache 확인
  Server Action / Route Handler 있으면 실행
  Suspense 있으면 → 스트리밍으로 조각조각 전송
→ 서빙
```