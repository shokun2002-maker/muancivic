-- Migration: Clean up development test data

DELETE FROM public.monitoring_posts WHERE id = 'daf27ea8-9ade-4dc4-a0cb-0cbed7b9f3ef' OR title = '테스트';
DELETE FROM public.policy_resources WHERE id = '625985e9-3168-4794-b51b-5c017e439ce6' OR title = '테스트';
DELETE FROM public.media_albums WHERE id = '395fe349-6ee3-42ba-90f9-a5fa291f3078' OR title = '테스트';
DELETE FROM public.citizen_voices WHERE id IN ('2a89511e-55bc-474b-bf71-08fca06643ff', 'aa666b90-7f66-441a-a8ae-7dcd2bdaf009') OR title LIKE '%테스트%';
