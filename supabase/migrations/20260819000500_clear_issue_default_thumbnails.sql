-- Migration: Clear inaugural_assembly.jpg default thumbnail for issues to enable default SVG placeholder

UPDATE public.issues
SET thumbnail_url = NULL
WHERE slug IN (
  'gwangju-airport',
  'medical-waste',
  'power-transmission',
  'environment-development'
) AND thumbnail_url = '/inaugural_assembly.jpg';
