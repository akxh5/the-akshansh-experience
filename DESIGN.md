---
name: Literary Cinematic Editorial
colors:
  surface: '#0f131d'
  surface-dim: '#0f131d'
  surface-bright: '#353944'
  surface-container-lowest: '#0a0e17'
  surface-container-low: '#171c25'
  surface-container: '#1b2029'
  surface-container-high: '#262a34'
  surface-container-highest: '#31353f'
  on-surface: '#dfe2f0'
  on-surface-variant: '#c5c6ce'
  inverse-surface: '#dfe2f0'
  inverse-on-surface: '#2c303b'
  outline: '#8f9098'
  outline-variant: '#44474d'
  surface-tint: '#b7c7e8'
  primary: '#c4d4f5'
  on-primary: '#21314a'
  primary-container: '#a8b8d8'
  on-primary-container: '#394964'
  inverse-primary: '#4f5f7b'
  secondary: '#b1c8ed'
  on-secondary: '#1a314f'
  secondary-container: '#344a69'
  on-secondary-container: '#a3bade'
  tertiary: '#f0cd9b'
  on-tertiary: '#412d08'
  tertiary-container: '#d3b282'
  on-tertiary-container: '#5b441e'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#b7c7e8'
  on-primary-fixed: '#0a1c34'
  on-primary-fixed-variant: '#384762'
  secondary-fixed: '#d4e3ff'
  secondary-fixed-dim: '#b1c8ed'
  on-secondary-fixed: '#011c39'
  on-secondary-fixed-variant: '#324866'
  tertiary-fixed: '#ffddae'
  tertiary-fixed-dim: '#e3c190'
  on-tertiary-fixed: '#281800'
  on-tertiary-fixed-variant: '#5a431d'
  background: '#0f131d'
  on-background: '#dfe2f0'
  surface-variant: '#31353f'
typography:
  display-lg:
    fontFamily: Bodoni Moda
    fontSize: 72px
    fontWeight: '400'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-md:
    fontFamily: Bodoni Moda
    fontSize: 48px
    fontWeight: '400'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Bodoni Moda
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.3'
  headline-lg-mobile:
    fontFamily: Bodoni Moda
    fontSize: 28px
    fontWeight: '400'
    lineHeight: '1.3'
  body-reading:
    fontFamily: EB Garamond
    fontSize: 21px
    fontWeight: '400'
    lineHeight: '2.1'
    letterSpacing: 0.01em
  body-standard:
    fontFamily: EB Garamond
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.8'
  label-caps:
    fontFamily: DM Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.15em
  metadata:
    fontFamily: DM Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.4'
    letterSpacing: 0.02em
spacing:
  unit: 4px
  container-max: 1120px
  gutter: 32px
  margin-mobile: 24px
  margin-desktop: 64px
  section-gap: 128px
---

## Brand & Style

This design system is anchored in the intersection of high-end editorial publishing and cinematic solitude. It evokes the quiet, focused atmosphere of a flagship magazine at midnight—blending the prestige of *The Paris Review* with the atmospheric lighting of a Makoto Shinkai film. 

The aesthetic identity is defined by:
- **Cinematic Minimalism:** A focus on "the frame" and "the word," stripping away functional clutter in favor of atmospheric depth.
- **Old Money Intellectualism:** Eschewing modern SaaS trends for a timeless, structured, and restrained visual language.
- **Architectural Rigor:** Sharp edges, ample whitespace (the "breath" between the lines), and strict typographic hierarchies.
- **Atmospheric Lighting:** UI depth is conveyed through subtle tonal shifts and temperature rather than shadows or physical metaphors.

## Colors

The palette is bifurcated into two distinct atmospheric conditions: **Midnight Snowfall** and **Winter Ivory**.

### Midnight Snowfall (Default)
A deep, cold midnight navy serves as the canvas. Accents are limited to "moonlight" tones—desaturated blues and silvers—to maintain a sense of solitary focus. Avoid any pure blacks; the depth comes from the interplay of dark navy tones.

### Winter Ivory
A warm, intellectual light mode that mimics aged high-quality paper. The lighting shifts to "morning frost," using pale blues and ivory to create a soft, non-fatiguing reading experience.

**Implementation Note:** Contrast must be maintained through tonal shifts. Interaction states (hover/active) should utilize subtle opacity changes or a shift to the accent color rather than aggressive glows.

## Typography

Typography is the "soul" of this design system. It relies on the dramatic contrast between high-fashion serifs and utilitarian sans-serifs.

- **Display & Titles:** Use **Bodoni Moda** with tight tracking. These should feel like magazine mastheads—commanding yet elegant.
- **The Reading Experience:** **EB Garamond** is used for all long-form content. The line height is intentionally generous (up to 2.1) to create a rhythmic, breathable flow that encourages slow, deep reading.
- **System/UI Metadata:** **DM Sans** provides a modern, functional counterpoint. Labels must be uppercase with wide letter spacing to denote "utility" without breaking the literary aesthetic.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy inspired by premium print journals. 

- **Grid:** A 12-column grid with wide 32px gutters. Content is often centered with significant lateral margins to focus the eye.
- **The "Breath":** Large vertical gaps (section-gap) are used to separate different thoughts or chapters, mimicking the page breaks in a book.
- **Asymmetry:** For cinematic effect, utilize intentional asymmetry (e.g., a headline occupying 5 columns on the left, with body text occupying 6 columns on the right).
- **Responsive Behavior:** On mobile, margins remain generous (24px) to maintain the "framed" look, and typography scales down only slightly to preserve the editorial impact.

## Elevation & Depth

This system rejects physical shadows and neomorphism. Depth is achieved through **Tonal Layering** and **Ghosting**:

- **Tonal Layers:** Surfaces are defined by slight deviations in background hex codes (`bg-base` to `bg-surface`).
- **Outlines:** Use 1px borders with low opacity (`border` color) to define containers. Do not use shadows to separate elements.
- **Interaction Depth:** Instead of "lifting" an element on hover, use a subtle shift in background tone or a thin, high-contrast internal stroke.
- **Glassmorphism (Restricted):** Occasionally use a heavy backdrop blur (60px+) on navigation overlays to simulate a frosted winter window, but keep the overlay color strictly tied to the theme's `bg-surface`.

## Shapes

The shape language is **Sharp and Architectural**. 

- **Corner Radius:** Use a strict 0px radius for all primary containers, buttons, and images to maintain a sophisticated, print-like appearance. 
- **Exception:** A maximum of 4px radius is permitted only for small interactive components like checkboxes or tags to provide a hint of "UI affordance," though 0px is always preferred.
- **Borders:** All borders must be 1px. Avoid thick or heavy strokes.

## Components

### Buttons
- **Ghost Primary:** No background, 1px border, `label-caps` typography. High-contrast text.
- **Ghost Secondary:** No background, no border, `text-secondary` color. Transitions to `text-primary` on hover with a subtle underline.

### Input Fields
- **Underline Style:** Inputs are defined only by a bottom border (1px). Focus state shifts the border color to the `accent`.
- **Labels:** Always use `label-caps` positioned above the input.

### Cards
- **Editorial Card:** Flat background (`bg-surface`), 0px corners, no shadow. 1px border.
- **Image Treatment:** Images should have a slight desaturation or a cool-toned overlay to match the "Midnight" or "Winter" atmosphere.

### Navigation
- **The Masthead:** Centered, high-contrast Bodoni Moda logo. Navigation links are `label-caps` with 24px spacing.

### Lists & Metadata
- **Separators:** Use thin, horizontal rules (1px) that don't span the full width of the container to separate list items, creating a "notched" editorial look.