# 무안 자치주권시민연대 - Supabase 설정 및 데이터베이스 연결 가이드

본 문서는 코딩 초보자도 쉽게 따라 할 수 있도록 Supabase 무료 클라우드 프로젝트 생성부터 데이터베이스 구축, 환경변수 설정, 샘플 데이터(Seed) 입력까지 단계별로 안내합니다.

---

## 1. Supabase 가입 및 프로젝트 생성

1. [Supabase 공식 홈페이지(supabase.com)](https://supabase.com)에 접속하여 회원가입(Sign Up) 또는 로그인합니다.
2. 메인 화면에서 **`New Project`** (새 프로젝트) 버튼을 클릭합니다.
3. 프로젝트 생성 창에서 다음과 같이 입력합니다:
   * **Organization**: 본인 계정 선택
   * **Name**: `muan-civic-alliance` (무안 시민연대)
   * **Database Password**: 잊어버리지 않도록 안전한 비밀번호 입력
   * **Region**: `Northeast Asia (Seoul)` (서울 리전 선택)
4. **`Create new project`**를 누른 뒤 1~2분 정도 프로젝트가 생성되기를 기다립니다.

---

## 2. Supabase API 키 및 URL 확인

1. 프로젝트가 생성되면 왼쪽 메뉴 맨 아래 **`Project Settings`** (톱니바퀴 아이콘) -> **`API`** 탭으로 이동합니다.
2. 다음 두 가지 값을 복사합니다:
   * **Project URL**: (예: `https://xyzxyz.supabase.co`)
   * **Project API keys** -> **`anon` `public`** (Publishable Key)

---

## 3. 내 컴퓨터(프로젝트)에 환경변수 입력하기

1. 무안 자치주권시민연대 웹 프로젝트 루트 폴더에 `.env.local` 파일이 있는지 확인합니다.
2. `.env.local` 파일을 열고 복사한 값으로 수정합니다:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-actual-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-actual-anon-publishable-key
```

> 💡 **참고**: `.env.local` 파일은 외부나 GitHub에 공개되지 않도록 `.gitignore`에 자동 등록되어 있으므로 안전합니다.

---

## 4. 데이터베이스 테이블 생성 (SQL Migration 실행)

1. Supabase 좌측 메뉴에서 **`SQL Editor`** 아이콘을 클릭합니다.
2. **`New Query`** 버튼을 누릅니다.
3. 프로젝트 내 `supabase/migrations/20260812000000_initial_schema.sql` 파일의 전체 내용을 복사하여 SQL Editor 붙여넣습니다.
4. 우측 하단의 **`Run`** (▶️ 실행) 버튼을 누릅니다.
5. `Success. No rows returned` 메시지가 나오면 14개 테이블과 보안 규칙(RLS)이 성공적으로 만들어진 것입니다.

---

## 5. 시연용 샘플 데이터 입력 (Seed 적용)

1. 다시 **`SQL Editor`** -> **`New Query`**를 클릭합니다.
2. 프로젝트 내 `supabase/seed.sql` 파일의 전체 내용을 복사하여 붙여넣습니다.
3. **`Run`** (▶️ 실행) 버튼을 누릅니다.
4. 좌측 메뉴 **`Table Editor`**로 이동하면 `issues`, `posts`, `monitoring_posts` 등의 테이블에 시연용 현안 및 소식 데이터가 저장된 것을 확인하실 수 있습니다.

---

## 6. 홈페이지 작동 확인

환경변수가 올바르게 설정되면 홈페이지에서 자동으로 Supabase 클라우드 데이터베이스의 현안 및 소식 데이터를 실시간 조회하여 화면에 보여줍니다!
만약 인터넷 연결이 끊기거나 환경변수가 없을 경우에는 자동으로 안전한 로컬 Fallback 데이터로 전환됩니다.
