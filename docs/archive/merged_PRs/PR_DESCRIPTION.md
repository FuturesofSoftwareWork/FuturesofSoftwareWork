# 🚀 Feature: Comprehensive Website Rehaul (React + Tailwind + TS)

## 📝 Summary

This PR executes a complete migration of the `FuturesofSoftwareWork` website from static HTML/CSS to a modern **Vite + React + TypeScript** architecture. It introduces a premium "Midnight" design system, high-fidelity animations, and new interactive content sections.

## ✨ Key Changes

### 🏗 Architecture

- **Migrated to Vite + React**: Optimized build process and component-based structure.
- **TypeScript**: Added type safety for better maintainability (e.g., `WhatIfSlideData` interfaces).
- **Tailwind CSS**: Implemented a custom configuration with a specific color palette (`midnight`, `neon-gold`, `hologram-cyan`, `electric-blue`).
- **Framer Motion**: Integrated for smooth entrance animations and scroll-triggered reveals.

### 🎨 Visual & UI Updates

- **Hero Section**: Full-screen parallax effect with a corrected single-line title and "Read more" indicator.
- **"What If" Provocations**: A new custom carousel component displaying strategic questions.
  - _Features_: Autoplay (9s), pause on hover/focus, smooth transitions, and deep linking to content sections.
- **Content Stream**: Split-view layout distinguishing "AI Signal" (Automated) from "Expert Insights" (Human).
- **About Section**: Enhanced typography and glassmorphism styling.
- **Partner Logos**: Added VTT, Business Finland, and University of Helsinki logos with specific "screen" blend modes for dark theme integration.

### 🛠️ Infrastructure

- **GitHub Actions**: Added `.github/workflows/deploy.yml` for automated deployment to GitHub Pages on push.
- **Git Configuration**: Added proper `.gitignore` to exclude build artifacts and dependencies.

## 📸 visual Verification

- **Logos**: VTT (Original color), Business Finland (stacked with "Funded by"), UH (Original color).
- **Responsive**: Verified layout on desktop and mobile viewpoints.
- **Aesthetics**: Confirmed "premium/futuristic" vibe with new typography (`Inter` + `Merriweather`).

## 🔗 Related Issues

- Addresses the need for a scalable, visually stunning single-page application.
- Fixes previous static layout limitations.

## 🚀 How to Test

1.  Clone the branch `feature/website-rehaul`.
2.  Run `npm install`.
3.  Run `npm run dev` to view locally.
4.  Run `npm run build` to verify production build success.
