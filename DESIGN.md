---
name: "Linear / Vercel Aesthetic Minimalist Dark"
version: "1.0"
tokens:
  colors:
    background: "#08090A"
    surface: "rgba(255, 255, 255, 0.02)"
    surfaceHover: "rgba(255, 255, 255, 0.05)"
    border: "rgba(255, 255, 255, 0.1)"
    textPrimary: "#EDEDED"
    textSecondary: "#A0A0A0"
    accent: "#00E599" # Cyan/Emerald accent
  typography:
    sans: "Inter, sans-serif"
    mono: "'JetBrains Mono', 'Geist Mono', monospace"
  spacing:
    base: "8px"
  radii:
    small: "4px"
    medium: "6px"
    large: "8px"
    pill: "9999px"
  elevation:
    flat: "none"
---

# Design Rationale

This project uses a highly technical, dark-first, minimalist design system tailored for a Data Engineer portfolio.

## 1. Colors
- The background must be pure or near-black (`#08090A`). No heavy color gradients.
- Surfaces (like cards) should use barely-there transparency (`rgba(255,255,255,0.02)`) over flat colors.
- Borders are ultra-thin and subtle (`rgba(255,255,255,0.1)`).

## 2. Typography
- Rely on high-quality web fonts: `Inter` for all UI text, tracking tight on headers.
- Use `JetBrains Mono` or similar for code blocks, badges, and technical readouts.
- Typography drives the hierarchy, not heavy background boxes.

## 3. Shapes & Layout
- Radius is small and precise (4px-8px for cards, code blocks).
- Badges and primary buttons can use pill shapes.
- No heavy drop shadows. Rely on border contrast to define boundaries.

## 4. Animation
- Animations are instantaneous and purposeful.
- Fade opacities or shift border colors on hover.
- **DO NOT** use bouncy `translate-y` hover effects or pulsing blobs.
