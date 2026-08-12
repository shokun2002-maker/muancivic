# 무안 자치주권시민연대 - 최초 관리자 계정 생성 가이드 (Admin Bootstrap)

본 문서는 코딩 초보자도 쉽게 따라 할 수 있도록 Supabase Dashboard에서 최초 관리자(Super Admin) 계정을 생성하고 권한을 부여하는 방법을 단계별로 설명합니다.

---

## 1. 🔑 1단계: Supabase Auth에서 관리자 사용자 생성하기

1. [Supabase 공식 콘솔](https://supabase.com/dashboard)에 접속하여 **`muan-citizen`** 프로젝트를 선택합니다.
2. 좌측 메뉴에서 **`Authentication`** (열쇠 아이콘) -> **`Users`** 탭을 클릭합니다.
3. 우측 상단의 **`Add User`** -> **`Create User`** 버튼을 누릅니다.
4. 다음 정보를 입력합니다:
   * **Email**: 관리자로 사용할 이메일 (예: `admin@muancivic.or.kr`)
   * **Password**: 사용할 보안 비밀번호 입력
   * **Auto Confirm User**: `ON` (체크 설정)
5. **`Create User`** 버튼을 눌러 계정을 생성합니다.
6. 생성된 사용자 목록에서 방금 만든 이메일 옆의 **`User UID`** (36자리 UUID 값, 예: `f81d4fae-7dec-11d0-a765-00a0c91e6bf6`)를 복사합니다.

---

## 2. 🛡️ 2단계: `public.admin_profiles` 테이블에 관리자 권한 부여하기

1. Supabase 대시보드 좌측 메뉴에서 **`SQL Editor`** (▶️ 아이콘)로 이동합니다.
2. **`New Query`** 버튼을 누릅니다.
3. 복사한 **`User UID`**를 사용하여 아래 SQL을 편집기 창에 붙여넣습니다:

```sql
-- 복사한 User UID를 아래 'your-auth-user-uuid-here' 위치에 넣으세요.
INSERT INTO public.admin_profiles (auth_user_id, role, display_name)
VALUES (
  'your-auth-user-uuid-here',  -- 예: 'f81d4fae-7dec-11d0-a765-00a0c91e6bf6'
  'super_admin',               -- 권한: super_admin / content_admin / member_admin / operator
  '최고 관리자'                 -- 화면에 표시될 관리자 이름
);
```

4. 우측 하단의 **`Run`** 버튼을 누릅니다.
5. `Success. 1 row affected` 메시지가 나오면 관리자 권한 등록이 완벽하게 처리된 것입니다.

---

## 3. 🧪 3단계: 관리자 로그인 및 접속 테스트

1. 브라우저에서 홈페이지의 관리자 로그인 주소 **`/admin/login`** (예: `https://muancivic.or.kr/admin/login` 또는 `http://localhost:3000/admin/login`)으로 접속합니다.
2. 1단계에서 생성한 **이메일**과 **비밀번호**를 입력하고 **`[관리자 로그인]`** 버튼을 누릅니다.
3. 세션 인증 및 `admin_profiles` 테이블 권한이 확인된 후 자동으로 **`/admin` 대시보드**로 이동하는지 확인합니다.

---

## 💡 관리자 역할(Role) 종류 및 참고사항

* **`super_admin`**: 최고 관리자 (전체 시스템 및 회원/권한 관리)
* **`content_admin`**: 콘텐츠 관리자 (활동소식, 공지사항, 성명, 현안 등록)
* **`member_admin`**: 회원 관리자 (회원 승인 및 후원 내역 점검)
* **`operator`**: 단순 운영진 (제보 확인 및 기본 모니터링)
