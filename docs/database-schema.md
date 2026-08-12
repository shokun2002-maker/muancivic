# 무안 자치주권시민연대 - 데이터베이스 스키마 명세서 (Database Schema Documentation)

본 문서는 무안 자치주권시민연대 공식 홈페이지의 Supabase PostgreSQL 데이터베이스 스키마 및 보안 권한 구조를 설명합니다.

---

## 1. 테이블 전체 목록 (14대 데이터 테이블)

### 🟢 공개 콘텐츠 테이블 (Public Read Allowed)
다음 테이블은 방문자 누구나 열람(SELECT)할 수 있으며, RLS(Row Level Security)를 통해 읽기 전용으로 보호됩니다.

1. **`posts`**: 게시글 테이블 (활동소식, 공지사항, 성명·논평 통합 저장)
   * `type`: `'activity'`, `'notice'`, `'statement'`
   * `status`: `'published'`, `'draft'`, `'hidden'`
2. **`issues`**: 무안 주요 현안 테이블 (광주 군공항, 의료폐기물, 송전선로 등)
3. **`issue_principles`**: 주요 현안별 핵심 원칙 (1:N 관계)
4. **`issue_updates`**: 주요 현안 진행 경과 타임라인 (1:N 관계)
5. **`monitoring_posts`**: 정책·행정 모니터링 리포트 테이블
6. **`citizen_voices`**: 시민의 목소리 제안 테이블 (`is_public = true`인 항목만 열람 가능)
7. **`policy_resources`**: 정책자료실 파일 및 연구서 테이블
8. **`media_albums`**: 사진·영상 앨범 테이블
9. **`media_items`**: 앨범 내 개별 사진/영상 URL 테이블 (1:N 관계)
10. **`events`**: 시민참여 행사 및 봉사 모집 테이블

---

### 🔴 비공개 보안 테이블 (Public Read FORBIDDEN)
다음 테이블은 일반 익명(Anonymous) 사용자의 열람(SELECT)이 엄격하게 금지되며, 향후 관리자 권한(Super Admin / Manager) 및 본인 로그인 계정에서만 접근 가능합니다.

11. **`member_profiles`**: 회원가입 프로필 정보 (정회원, 준회원, 후원회원)
12. **`donations`**: 후원금 결제 및 후원자 기록
13. **`inquiries`**: 1:1 민감 현안 및 제보 메시지 (비밀 보장)
14. **`admin_profiles`**: 관리자 시스템 승인 권한 표 (`role`: `super_admin`, `content_admin` 등)

---

## 2. 주요 컬럼 및 데이터 관계 (ERD 구조)

* `issues.id` ──(1:N)──> `issue_principles.issue_id`
* `issues.id` ──(1:N)──> `issue_updates.issue_id`
* `media_albums.id` ──(1:N)──> `media_items.album_id`
* `member_profiles.id` ──(1:N)──> `donations.member_id`

---

## 3. RLS (Row Level Security) 정책 요약

```sql
-- 공개 콘텐츠 테이블 RLS 활성화
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public select on published posts" ON public.posts FOR SELECT USING (status = 'published');

-- 개인정보 보안 테이블 RLS 활성화 및 익명 읽기 금지
ALTER TABLE public.member_profiles ENABLE ROW LEVEL SECURITY;
-- (Public SELECT Policy 없음 => 익명 접근 자동 차단)
```
