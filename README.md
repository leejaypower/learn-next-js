# learn-next-js
Next.js 학습용 프로젝트

## 실습 환경
### 백엔드 서버 실행
- https://github.com/winterlood/onebite-books-server 의 서버를 이용하여 실습합니다.
  - [SupaBase](https://supabase.com/)를 사용합니다.
  - 프로젝트 생성 후 prisma로 연결(connect -> .env 업데이트) 후 다음 명령어 실행
  ```
  npx prisma db push
  ```
  ```
  // 데이터 초기화 및 데이터 삽입
  npm run seed
  ```
  ```
  // 빌드
  npm run build
  ```
  ```
  // 서버 실행
  npm run start
  ```
  - http://localhost:12345/api 로 접속하면 swagger 문서를 확인 가능

  ```
  // 데이터 조회가 가능한 페이지 접속
  npx prisma studio 
  ```
  