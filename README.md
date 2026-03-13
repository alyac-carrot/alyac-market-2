# 💊 2조 당근🥕 Alyac Market 💊

> **알약마켓 프로젝트** — 상품 거래 및 SNS 피드 기능을 갖춘 모바일 웹 앱

---

## 📋 목차

- [프로젝트 소개](#-프로젝트-소개)
- [팀원](#-팀원)
- [주요 기능](#-주요-기능)
- [기술 스택](#-기술-스택)
- [아키텍처](#-아키텍처)
- [시작하기](#-시작하기)
- [환경 변수](#-환경-변수)
- [스크립트](#-스크립트)
- [배포](#-배포)

---

## 📖 프로젝트 소개

**Alyac Market**은 상품 거래 플랫폼 프로젝트입니다.  
사용자는 SNS 피드를 통해 게시물을 올리고, 팔로우 기반의 소셜 기능을 통해 소통하며, 상품을 등록·거래할 수 있습니다.

- 🔗 **배포 URL**: [https://alyac-carrot.github.io/alyac-market-2/](https://alyac-carrot.github.io/alyac-market-2/)
- 🗓️ **개발 기간**: 2026.02.13 ~ 2026.03.16

## 👥 팀원

<<<<<<< HEAD
| 이름 | 역할 | GitHub |
| ---- | ---- | ---- |
| 조준환 | 팀장 / 공통 UI, 프로필, 상품등록, 로그인 | [https://github.com/JunHwanJo](https://github.com/JunHwanJo) |
| 고은표 | 팀원 / 피드페이지, 채팅, 검색, 회의록 작성 | [https://github.com/goeunpyo8-debug](https://github.com/goeunpyo8-debug) |
| 신지수 | 팀원 / 게시물, 회원가입, 테마 | [https://github.com/Anyarzy](https://github.com/Anyarzy) |
=======
| 이름   | 역할                                       | GitHub                                                                   |
| ------ | ------------------------------------------ | ------------------------------------------------------------------------ |
| 조준환 | 팀장 / 공통 UI, 프로필, 상품등록, 로그인   | [https://github.com/JunHwanJo](https://github.com/JunHwanJo)             |
| 고은표 | 팀원 / 랜딩페이지, 피드, 검색, 회의록 작성 | [https://github.com/goeunpyo8-debug](https://github.com/goeunpyo8-debug) |
| 신지수 | 팀원 / 게시물, 회원가입, 테마              | [https://github.com/Anyarzy](https://github.com/Anyarzy)                 |
>>>>>>> main

---

## ✨ 주요 기능

| 기능             | 설명                                  |
| ---------------- | ------------------------------------- |
| 🔐 **인증**      | 회원가입(2단계), 로그인, 소셜 로그인  |
| 📰 **SNS 피드**  | 게시물 작성, 수정, 삭제, 좋아요, 검색 |
| 🛒 **상품 거래** | 상품 등록, 수정, 삭제                 |
| 👤 **프로필**    | 프로필 조회, 수정, 팔로워/팔로잉 목록 |
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

| 분류             | 기술                                                        |
| ---------------- | ----------------------------------------------------------- |
| **Runtime**      | Node.js                                                     |
| **Framework**    | Express v5                                                  |
| **데이터베이스** | json-server v0.17 (lowdb 기반)                              |
| **인증**         | JWT (jsonwebtoken) — Access Token (1h) + Refresh Token (1d) |
| **파일 업로드**  | Multer (로컬 디스크 저장, 최대 10MB)                        |
| **API 문서**     | Swagger (swagger-jsdoc + swagger-ui-express)                |
| **개발 서버**    | nodemon                                                     |

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

#### 1. 백엔드 서버 실행

```bash
# 프로젝트 루트(alyac-project/)에서
cd alyac-project  # 상위 백엔드 폴더로 이동
npm install
npm start         # nodemon으로 서버 실행 (기본 포트: 3000)
```

> Swagger API 문서: `http://localhost:3000/api-docs`

#### 2. 프론트엔드 개발 서버 실행

```bash
# alyac-market/ 폴더에서
npm install

# 환경 변수 설정
cp .env.example .env
# .env의 VITE_API_BASE_URL=http://localhost:3000 확인

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
- 🔗 **배포 URL**: [https://alyac-carrot.github.io/alyac-market-2/](https://alyac-carrot.github.io/alyac-market-2/)

---
