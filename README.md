# 2조 팀 프로젝트 Alyac Market

> 중고거래 기능과 SNS 피드를 결합한 모바일 중심 소셜 마켓 웹 애플리케이션

---

## 목차

- [프로젝트 소개](#프로젝트-소개)
- [팀원](#팀원)
- [주요 기능](#주요-기능)
- [기술 스택](#기술-스택)
- [아키텍처](#아키텍처)
- [시작하기](#시작하기)
- [환경 변수](#환경-변수)
- [스크립트](#스크립트)
- [배포](#배포)

---

## 프로젝트 소개

**Alyac Market**은 피드형 커뮤니티와 중고거래 기능을 결합한 웹 애플리케이션입니다.  
사용자는 회원가입 및 로그인 후 게시글을 작성하고, 이미지와 함께 일상을 공유하며, 좋아요와 댓글로 상호작용할 수 있습니다. 또한 상품 등록 기능을 통해 판매 상품을 올리고 프로필 페이지에서 자신의 활동과 판매 목록을 함께 관리할 수 있습니다.

- 배포 URL: [https://alyac-carrot.github.io/alyac-market-2/](https://alyac-carrot.github.io/alyac-market-2/)
- 개발 기간: `2026.02.13 ~ 2026.03.16`
- 프로젝트 형태: 팀 프로젝트
- 저장소 범위: 프론트엔드 애플리케이션

### 주요 사용자 흐름

1. 회원가입 또는 로그인 후 피드에 진입합니다.
2. 피드에서 다른 사용자의 게시글을 확인하고 좋아요나 댓글로 반응할 수 있습니다.
3. 직접 게시글을 작성하여 이미지와 함께 공유할 수 있습니다.
4. 상품을 등록하고 프로필 페이지에서 자신의 게시글과 상품을 함께 관리할 수 있습니다.
5. 관심 있는 사용자를 팔로우하고 프로필을 탐색할 수 있습니다.

---

## 팀원

| 이름 | 역할 | GitHub |
| --- | --- | --- |
| 조준환 | 팀장 / 공통 UI, 프로필, 상품 기능 구현 | [JunHwanJo](https://github.com/JunHwanJo) |
| 고은표 | 팀원 / 랜딩, 피드, 검색 기능 구현 | [goeunpyo8-debug](https://github.com/goeunpyo8-debug) |
| 신지수 | 팀원 / 게시글, 회원가입, 테마 기능 구현 | [Anyarzy](https://github.com/Anyarzy) |

### 역할 분담 요약

- 조준환: 공통 UI 구조를 정리하고 프로필과 상품 관련 사용자 흐름을 구현했습니다.
- 고은표: 서비스 첫 진입 화면과 피드 탐색 흐름을 구현하고 검색 기능을 담당했습니다.
- 신지수: 게시글 작성 및 상세 흐름을 중심으로 회원가입과 테마 기능을 구현했습니다.

---

## 주요 기능

### 1. 인증

- 회원가입, 로그인, 로그아웃
- 토큰 기반 인증 상태 유지
- 인증이 필요한 라우트 접근 제어

### 2. 피드 / 게시글

- 피드 조회
- 게시글 작성, 수정, 삭제
- 이미지 업로드 게시글 작성
- 게시글 좋아요 및 댓글 작성
- 게시글 상세 조회

### 3. 상품 등록

- 상품 등록, 수정, 삭제
- 이미지 업로드 지원
- 프로필 페이지에서 등록 상품 관리

### 4. 프로필 / 팔로우

- 내 프로필 및 다른 사용자 프로필 조회
- 작성 게시글 및 판매 상품 모아보기
- 팔로우 및 언팔로우
- 팔로워 및 팔로잉 목록 조회

### 5. 사용자 경험

- 모바일 우선 UI
- 공통 헤더, 푸터, 바텀시트, 다이얼로그 구성
- 다크 모드 지원

---

## 기술 스택

### 프론트엔드

| 분류 | 기술 |
| --- | --- |
| 프레임워크 | React 19 |
| 언어 | TypeScript 5 |
| 빌드 도구 | Vite 7 |
| 라우팅 | React Router DOM v7 |
| 서버 상태 관리 | TanStack Query (React Query) v5 |
| 폼 및 검증 | React Hook Form + Zod |
| HTTP 클라이언트 | Axios |
| 스타일링 | Tailwind CSS v4 + shadcn/ui |
| 아이콘 | Lucide React |
| SVG 처리 | vite-plugin-svgr |

### 개발 도구

| 분류 | 기술 |
| --- | --- |
| 린트 | ESLint 9 (TypeScript-ESLint) |
| 포맷팅 | Prettier + prettier-plugin-tailwindcss |
| 타입 검사 | TypeScript (`tsc --noEmit`) |
| 배포 자동화 | GitHub Actions, GitHub Pages |

### 백엔드

백엔드는 별도 저장소에서 관리됩니다.

- 백엔드 저장소: [https://github.com/KDT-10/alyac-market-server](https://github.com/KDT-10/alyac-market-server)

| 분류 | 기술 |
| --- | --- |
| 런타임 | Node.js |
| 프레임워크 | Express v5 |
| 데이터베이스 | json-server v0.17 (lowdb 기반) |
| 인증 | JWT, Access Token (1h), Refresh Token (1d) |
| 파일 업로드 | Multer |
| API 문서 | Swagger (swagger-jsdoc + swagger-ui-express) |
| 개발 서버 | nodemon |

---

## 아키텍처

### 폴더 구조 (FSD: Feature-Sliced Design)

```text
src/
├─ app/          # 앱 진입점, 라우터, 전역 설정
├─ pages/        # 페이지 단위 컴포넌트
├─ widgets/      # 여러 기능을 조합한 UI 블록
├─ features/     # 사용자 행동 중심 기능
├─ entities/     # 도메인 모델과 API
├─ shared/       # 공통 유틸, UI, API 클라이언트
└─ assets/       # 정적 리소스
```

### 라우트

| 경로 | 페이지 | 인증 필요 |
| --- | --- | --- |
| `/` | 스플래시 | 아니오 |
| `/auth/landing` | 랜딩 | 아니오 |
| `/auth/signin` | 로그인 | 아니오 |
| `/auth/signup` | 회원가입 | 아니오 |
| `/feed` | 피드 | 예 |
| `/search` | 검색 | 예 |
| `/post-create` | 게시글 작성 | 예 |
| `/post/:postId` | 게시글 상세 | 예 |
| `/post/:postId/edit` | 게시글 수정 | 예 |
| `/product/create` | 상품 등록 | 예 |
| `/product/:productId/edit` | 상품 수정 | 예 |
| `/profile` | 내 프로필 | 예 |
| `/profile/:userId` | 사용자 프로필 | 예 |
| `/profile-update` | 프로필 수정 | 예 |
| `/followers/:accountname` | 팔로워 목록 | 예 |
| `/followings/:accountname` | 팔로잉 목록 | 예 |
| `/chat` | 채팅 목록 | 예 |
| `/chat/:roomId` | 채팅방 | 예 |

---

## 시작하기

### 사전 요구사항

- Node.js 20 이상
- npm

### 1. 백엔드 서버 실행

이 저장소는 프론트엔드 저장소이므로, 로컬 실행 시 백엔드 서버를 별도로 실행해야 합니다.

```bash
git clone https://github.com/KDT-10/alyac-market-server.git
cd alyac-market-server
npm install
npm start
```

- 기본 포트: `3000`
- Swagger API 문서: `http://localhost:3000/api-docs`

### 2. 프론트엔드 실행

```bash
npm install
```

`.env.example` 파일을 복사해 `.env` 파일을 생성한 뒤 아래 값을 확인합니다.

```env
VITE_API_BASE_URL=http://localhost:3000
VITE_IMAGE_BASE_URL=http://localhost:3000
VITE_APP_BASE_PATH=/
```

그다음 개발 서버를 실행합니다.

```bash
npm run dev
```

---

## 환경 변수

`.env` 파일에 아래 값을 설정합니다.

```env
# API Base URLs (development)
VITE_API_BASE_URL=http://localhost:3000
VITE_IMAGE_BASE_URL=http://localhost:3000

# App base path
VITE_APP_BASE_PATH=/
```

프로덕션 환경에서는 GitHub Actions Repository Variables에 `VITE_API_BASE_URL`, `VITE_IMAGE_BASE_URL`, `VITE_APP_BASE_PATH`를 설정해 사용합니다.

---

## 스크립트

| 명령어 | 설명 |
| --- | --- |
| `npm run dev` | 개발 서버 실행 (HMR) |
| `npm run build` | 프로덕션 빌드 |
| `npm run build:pages` | GitHub Pages 배포용 빌드 |
| `npm run preview` | 프로덕션 빌드 미리보기 |
| `npm run type-check` | TypeScript 타입 검사 |
| `npm run lint` | ESLint 실행 |
| `npm run format` | Prettier 포맷팅 |
| `npm run format:check` | Prettier 포맷 검사 |

---

## 배포

`main` 브랜치에 push 하면 GitHub Actions가 자동으로 빌드 후 **GitHub Pages**에 배포합니다.

```text
.github/workflows/deploy-pages.yml
```

- 빌드 환경: Node.js 20, `ubuntu-latest`
- 배포 대상: `./dist`
- 배포 URL: [https://alyac-carrot.github.io/alyac-market-2/](https://alyac-carrot.github.io/alyac-market-2/)

---
