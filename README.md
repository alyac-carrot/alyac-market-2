# 💊 Alyac Market

> **알약마켓 프로젝트** — 상품 거래 및 SNS 피드 기능을 갖춘 모바일 웹 앱

<!-- TODO: 배지 (빌드 상태, 라이선스 등) 추가 -->

---

## 📋 목차

- [프로젝트 소개](#-프로젝트-소개)
- [주요 기능](#-주요-기능)
- [기술 스택](#-기술-스택)
- [아키텍처](#-아키텍처)
- [시작하기](#-시작하기)
- [환경 변수](#-환경-변수)
- [스크립트](#-스크립트)
- [배포](#-배포)
- [팀원](#-팀원)

---

## 📖 프로젝트 소개

**Alyac Market**은 상품 거래 플랫폼 프로젝트입니다.  
사용자는 SNS 피드를 통해 게시물을 올리고, 팔로우 기반의 소셜 기능과 실시간 채팅을 통해 소통하며, 상품을 등록·거래할 수 있습니다.

- 🔗 **배포 URL**: [https://alyac-market-2.vercel.app/](https://alyac-market-2.vercel.app/)
- 🗓️ **개발 기간**: <!-- TODO: 개발 기간 작성 -->

---

## ✨ 주요 기능

| 기능             | 설명                                  |
| ---------------- | ------------------------------------- |
| 🔐 **인증**      | 회원가입(2단계), 로그인, 소셜 로그인  |
| 📰 **SNS 피드**  | 게시물 작성, 수정, 삭제, 좋아요, 검색 |
| 🛒 **중고 거래** | 상품 등록, 수정, 삭제                 |
| 👤 **프로필**    | 프로필 조회, 수정, 팔로워/팔로잉 목록 |
| 💬 **채팅**      | 채팅방 목록, 1:1 채팅                 |
| 🌗 **다크 모드** | 라이트/다크 테마 전환                 |

---

## 🛠 기술 스택

### Frontend

| 분류                | 기술                            |
| ------------------- | ------------------------------- |
| **Framework**       | React 19                        |
| **Language**        | TypeScript 5                    |
| **Build Tool**      | Vite 7                          |
| **Routing**         | React Router DOM v7             |
| **서버 상태 관리**  | TanStack Query (React Query) v5 |
| **폼 관리**         | React Hook Form + Zod           |
| **HTTP 클라이언트** | Axios                           |
| **스타일링**        | Tailwind CSS v4 + shadcn/ui     |
| **아이콘**          | Lucide React                    |
| **SVG**             | vite-plugin-svgr                |

### Dev Tools

| 분류          | 기술                                   |
| ------------- | -------------------------------------- |
| **린터**      | ESLint 9 (TypeScript-ESLint)           |
| **포매터**    | Prettier + prettier-plugin-tailwindcss |
| **타입 체크** | TypeScript (`tsc --noEmit`)            |
| **CI/CD**     | GitHub Actions → GitHub Pages          |

### Backend

<!-- TODO: 백엔드 기술 스택 작성 (Firebase Cloud Functions, Firestore, Firebase Storage 등) -->

---

## 🏗 아키텍처

### 폴더 구조 (FSD — Feature-Sliced Design)

```
src/
├── app/            # 앱 진입점, 라우터, 전역 레이아웃, CSS
│   ├── layouts/
│   ├── providers/
│   ├── routes.tsx
│   └── index.css
├── pages/          # 페이지 단위 컴포넌트
│   ├── auth/       # splash, landing, signin, signup
│   ├── feed/       # 피드, 검색
│   ├── post/       # 게시물 상세, 작성, 수정
│   ├── product/    # 상품 등록, 수정
│   ├── profile/    # 프로필, 팔로워/팔로잉
│   ├── profile-update/
│   ├── chat/       # 채팅방, 채팅 목록
│   ├── home/
│   └── not-found/
├── widgets/        # 여러 페이지에서 공유되는 UI 블록
├── features/       # 독립적인 기능 단위
│   ├── auth/
│   ├── post/
│   ├── product-create/
│   ├── product-update/
│   ├── product-delete/
│   ├── profile/
│   ├── profile-update/
│   ├── follows/
│   ├── chat/
│   ├── search/
│   ├── theme/
│   └── upload/
├── entities/       # 비즈니스 엔티티
│   ├── auth/
│   ├── post/
│   ├── product/
│   ├── profile/
│   ├── user/
│   ├── chat/
│   └── upload/
├── shared/         # 공통 유틸리티, API 클라이언트, UI 기반 컴포넌트
│   ├── api/
│   ├── lib/
│   └── ui/
└── assets/         # 정적 자산 (이미지, 아이콘 등)
```

### 라우팅

| 경로                       | 페이지      | 인증 필요 |
| -------------------------- | ----------- | --------- |
| `/`                        | Splash      | ❌        |
| `/auth/landing`            | 랜딩        | ❌        |
| `/auth/signin`             | 로그인      | ❌        |
| `/auth/signup`             | 회원가입    | ❌        |
| `/feed`                    | 피드        | ✅        |
| `/search`                  | 검색        | ✅        |
| `/post-create`             | 게시물 작성 | ✅        |
| `/post/:postId`            | 게시물 상세 | ✅        |
| `/post/:postId/edit`       | 게시물 수정 | ✅        |
| `/product/create`          | 상품 등록   | ✅        |
| `/product/:productId/edit` | 상품 수정   | ✅        |
| `/profile`                 | 내 프로필   | ✅        |
| `/profile/:userId`         | 타인 프로필 | ✅        |
| `/profile-update`          | 프로필 수정 | ✅        |
| `/followers/:accountname`  | 팔로워 목록 | ✅        |
| `/followings/:accountname` | 팔로잉 목록 | ✅        |
| `/chat`                    | 채팅 목록   | ✅        |
| `/chat/:roomId`            | 채팅방      | ✅        |

---

## 🚀 시작하기

### 사전 요구사항

- Node.js **20** 이상
- npm

### 설치 및 실행

```bash
# 저장소 클론
git clone https://github.com/alyac-carrot/alyac-market-2.git
cd alyac-market-2

# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env
# .env 파일을 열어 값 입력 (아래 환경 변수 섹션 참고)

# 개발 서버 시작
npm run dev
```

---

## 🔐 환경 변수

`.env.example`을 복사해 `.env` 파일을 만들고 아래 값을 채워 넣으세요.

```env
# API Base URLs (development)
VITE_API_BASE_URL=http://localhost:3000
VITE_IMAGE_BASE_URL=http://localhost:3000

# App base path
VITE_APP_BASE_PATH=/
```

> **프로덕션** 환경에서는 GitHub Actions Repository Variables에 `VITE_API_BASE_URL`, `VITE_IMAGE_BASE_URL`, `VITE_APP_BASE_PATH`를 설정합니다.

---

## 📜 스크립트

| 명령어                 | 설명                        |
| ---------------------- | --------------------------- |
| `npm run dev`          | 개발 서버 실행 (HMR)        |
| `npm run build`        | 프로덕션 빌드               |
| `npm run build:pages`  | GitHub Pages 배포용 빌드    |
| `npm run preview`      | 프로덕션 빌드 미리 보기     |
| `npm run type-check`   | TypeScript 타입 검사        |
| `npm run lint`         | ESLint 실행                 |
| `npm run format`       | Prettier로 코드 자동 포매팅 |
| `npm run format:check` | Prettier 포매팅 검사        |

---

## 🚢 배포

`main` 브랜치에 push 되면 GitHub Actions가 자동으로 빌드 후 **GitHub Pages**에 배포합니다.

```
.github/workflows/deploy-pages.yml
```

- 빌드 환경: **Node.js 20**, `ubuntu-latest`
- 배포 대상: `./dist` 폴더 → GitHub Pages

---

## 👥 팀원

<!-- TODO: 팀원 정보 작성 -->

| 이름 | 역할 | GitHub |
| ---- | ---- | ------ |
|      |      |        |
|      |      |        |
