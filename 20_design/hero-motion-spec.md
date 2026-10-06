# Hero Motion Spec

## Goal
Make the supplied dome image feel inhabited and alive without changing its meaning or forcing the visitor to wait.

## Base layer
`/public/nannys/hero-dome.webp` is the static source of truth and poster/fallback.

## Current implemented ambient layers
1. Brass/purple environmental glow: low opacity, slow breathing scale.
2. Green growing-tower glow: separate slow pulse.
3. Steam: two blurred radial plumes rising from the cooking area.
4. Fireflies: twelve deterministic points, small travel range, staggered timing.

## HyperFrames hook
If a verified HyperFrames/HeyGen-generated ambient video is produced later, set:
`VITE_NANNY_HERO_VIDEO_URL=<public video URL>`

The component automatically uses the video with the static hero as poster. The video must preserve the image composition and may animate only environmental details: practical lights, fireflies, steam, leaf movement, faint reflections. No camera warping, text morphing, invented people, or changed food.

## Reduced motion
When `prefers-reduced-motion: reduce` is active, ambient CSS layers stop and the static image remains fully understandable.

## Performance rule
The hero works without video. Video is progressive enhancement, not a required dependency.
