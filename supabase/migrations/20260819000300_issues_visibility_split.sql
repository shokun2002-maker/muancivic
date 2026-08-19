-- Migration: Separate visibility (draft/published) and progress status (대응 중/모니터링/해결/종료) for public.issues

ALTER TABLE public.issues
  ADD COLUMN IF NOT EXISTS visibility TEXT NOT NULL DEFAULT 'published' CHECK (visibility IN ('draft', 'published'));

-- Migration logic for existing data:
-- 1. Any existing issue with status = 'published' gets status = '대응 중' and visibility = 'published'
UPDATE public.issues
SET status = '대응 중', visibility = 'published'
WHERE status = 'published';

-- 2. Any existing issue with status = 'draft' gets visibility = 'draft' and status = '대응 중'
UPDATE public.issues
SET status = '대응 중', visibility = 'draft'
WHERE status = 'draft';

-- Update RLS Policy for public SELECT
DROP POLICY IF EXISTS "public_can_select_published_issues" ON public.issues;
DROP POLICY IF EXISTS "Allow public select on issues" ON public.issues;

CREATE POLICY "public_can_select_published_issues"
  ON public.issues FOR SELECT
  USING (visibility = 'published');
