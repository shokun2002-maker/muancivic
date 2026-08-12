-- ========================================================
-- 1. Helper Function: Auto update updated_at timestamp
-- ========================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ========================================================
-- 2. Table: posts (활동소식, 공지사항, 성명·논평)
-- ========================================================
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN ('activity', 'notice', 'statement')),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  summary TEXT,
  content TEXT NOT NULL,
  category TEXT,
  thumbnail_url TEXT,
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'hidden')),
  published_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON public.posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ========================================================
-- 3. Table: issues (무안 주요 현안)
-- ========================================================
CREATE TABLE IF NOT EXISTS public.issues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT '대응 중',
  summary TEXT NOT NULL,
  overview TEXT,
  current_situation TEXT,
  key_points TEXT,
  position_text TEXT,
  thumbnail_url TEXT,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER update_issues_updated_at
  BEFORE UPDATE ON public.issues
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ========================================================
-- 4. Table: issue_principles (현안별 핵심원칙)
-- ========================================================
CREATE TABLE IF NOT EXISTS public.issue_principles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  issue_id UUID NOT NULL REFERENCES public.issues(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================================
-- 5. Table: issue_updates (현안 진행 경과 Timeline)
-- ========================================================
CREATE TABLE IF NOT EXISTS public.issue_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  issue_id UUID NOT NULL REFERENCES public.issues(id) ON DELETE CASCADE,
  event_date DATE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================================
-- 6. Table: monitoring_posts (정책·행정 모니터링)
-- ========================================================
CREATE TABLE IF NOT EXISTS public.monitoring_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  summary TEXT NOT NULL,
  overview TEXT,
  current_status TEXT,
  key_issue TEXT,
  position_text TEXT,
  proposal_text TEXT,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER update_monitoring_posts_updated_at
  BEFORE UPDATE ON public.monitoring_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ========================================================
-- 7. Table: citizen_voices (시민의 목소리)
-- ========================================================
CREATE TABLE IF NOT EXISTS public.citizen_voices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  author_name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT '접수',
  likes_count INTEGER DEFAULT 0,
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER update_citizen_voices_updated_at
  BEFORE UPDATE ON public.citizen_voices
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ========================================================
-- 8. Table: policy_resources (정책자료실)
-- ========================================================
CREATE TABLE IF NOT EXISTS public.policy_resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  summary TEXT,
  source TEXT NOT NULL,
  file_url TEXT,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER update_policy_resources_updated_at
  BEFORE UPDATE ON public.policy_resources
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ========================================================
-- 9. Table: media_albums (사진·영상 앨범)
-- ========================================================
CREATE TABLE IF NOT EXISTS public.media_albums (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL CHECK (type IN ('photo', 'video')),
  description TEXT,
  event_date DATE,
  thumbnail_url TEXT,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER update_media_albums_updated_at
  BEFORE UPDATE ON public.media_albums
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ========================================================
-- 10. Table: media_items (앨범 내 개별 미디어)
-- ========================================================
CREATE TABLE IF NOT EXISTS public.media_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  album_id UUID NOT NULL REFERENCES public.media_albums(id) ON DELETE CASCADE,
  media_type TEXT NOT NULL CHECK (media_type IN ('photo', 'video')),
  file_url TEXT,
  youtube_video_id TEXT,
  caption TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================================
-- 11. Table: events (시민참여 행사)
-- ========================================================
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  description TEXT,
  event_date TIMESTAMPTZ,
  location TEXT,
  status TEXT NOT NULL DEFAULT '모집예정' CHECK (status IN ('모집예정', '참여가능', '상시모집', '마감')),
  thumbnail_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON public.events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ========================================================
-- 12. Private Table: member_profiles (회원 프로필)
-- ========================================================
CREATE TABLE IF NOT EXISTS public.member_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id UUID,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  region TEXT,
  member_type TEXT NOT NULL CHECK (member_type IN ('정회원', '준회원', '후원회원')),
  status TEXT NOT NULL DEFAULT '대기' CHECK (status IN ('대기', '승인', '휴면', '탈퇴')),
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER update_member_profiles_updated_at
  BEFORE UPDATE ON public.member_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ========================================================
-- 13. Private Table: donations (후원 내역)
-- ========================================================
CREATE TABLE IF NOT EXISTS public.donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID REFERENCES public.member_profiles(id) ON DELETE SET NULL,
  donor_name TEXT NOT NULL,
  donation_type TEXT NOT NULL CHECK (donation_type IN ('정기후원', '일시후원')),
  amount INTEGER NOT NULL,
  donated_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT NOT NULL DEFAULT '완료',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================================
-- 14. Private Table: inquiries (문의·제보)
-- ========================================================
CREATE TABLE IF NOT EXISTS public.inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  status TEXT NOT NULL DEFAULT '접수',
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER update_inquiries_updated_at
  BEFORE UPDATE ON public.inquiries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ========================================================
-- 15. Private Table: admin_profiles (관리자 권한)
-- ========================================================
CREATE TABLE IF NOT EXISTS public.admin_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id UUID NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('super_admin', 'content_admin', 'member_admin', 'operator')),
  display_name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER update_admin_profiles_updated_at
  BEFORE UPDATE ON public.admin_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ========================================================
-- 16. INDEXES FOR PERFORMANCE & SEARCH
-- ========================================================
CREATE INDEX IF NOT EXISTS idx_posts_slug ON public.posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_type_status ON public.posts(type, status, published_at DESC);

CREATE INDEX IF NOT EXISTS idx_issues_slug ON public.issues(slug);
CREATE INDEX IF NOT EXISTS idx_issues_status ON public.issues(status);

CREATE INDEX IF NOT EXISTS idx_issue_principles_issue ON public.issue_principles(issue_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_issue_updates_issue ON public.issue_updates(issue_id, sort_order);

CREATE INDEX IF NOT EXISTS idx_monitoring_slug ON public.monitoring_posts(slug);
CREATE INDEX IF NOT EXISTS idx_voices_slug ON public.citizen_voices(slug);
CREATE INDEX IF NOT EXISTS idx_resources_slug ON public.policy_resources(slug);

CREATE INDEX IF NOT EXISTS idx_media_albums_slug ON public.media_albums(slug);
CREATE INDEX IF NOT EXISTS idx_media_items_album ON public.media_items(album_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_events_slug ON public.events(slug);

-- ========================================================
-- 17. ROW LEVEL SECURITY (RLS) POLICIES
-- ========================================================
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.issues ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.issue_principles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.issue_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.monitoring_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.citizen_voices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.policy_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.member_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;

-- Public SELECT policies for public content tables
CREATE POLICY "Allow public select on published posts"
  ON public.posts FOR SELECT
  USING (status = 'published');

CREATE POLICY "Allow public select on issues"
  ON public.issues FOR SELECT
  USING (true);

CREATE POLICY "Allow public select on issue principles"
  ON public.issue_principles FOR SELECT
  USING (true);

CREATE POLICY "Allow public select on issue updates"
  ON public.issue_updates FOR SELECT
  USING (true);

CREATE POLICY "Allow public select on monitoring posts"
  ON public.monitoring_posts FOR SELECT
  USING (true);

CREATE POLICY "Allow public select on public citizen voices"
  ON public.citizen_voices FOR SELECT
  USING (is_public = true);

CREATE POLICY "Allow public select on policy resources"
  ON public.policy_resources FOR SELECT
  USING (true);

CREATE POLICY "Allow public select on media albums"
  ON public.media_albums FOR SELECT
  USING (true);

CREATE POLICY "Allow public select on media items"
  ON public.media_items FOR SELECT
  USING (true);

CREATE POLICY "Allow public select on events"
  ON public.events FOR SELECT
  USING (true);

-- Member profiles, donations, inquiries, admin_profiles have NO PUBLIC SELECT policy.
-- Access is strictly denied to anonymous users.
