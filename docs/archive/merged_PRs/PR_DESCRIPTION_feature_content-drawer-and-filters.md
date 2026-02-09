# PR: feature/content-drawer-and-filters

## Summary

- Add a slide-over drawer for reading AI Signals and Expert Insights in a comfortable detail view
- Extend AI Signal schema with new fields (category, whyItMatters, recommendedActions, risksAndCaveats, decisionHorizon) visible only in the detail view
- Add category filter pills to the AI Signal column for quick filtering by topic
- Change signal card timestamp from time-of-day to date format
- Add CLAUDE.md project instruction file

## Changes

### New files
- `src/components/ContentDrawer.tsx` — Slide-over drawer component with Framer Motion animations, backdrop, scroll lock, Escape-to-close, and accessible markup (`role="dialog"`, `aria-modal`). Renders signal details or full expert insight articles.
- `CLAUDE.md` — Project conventions and context for Claude Code
- `public/content/ai-signals/2026-02-09-*.json` — New signal content files

### Modified files
- `src/types/content.ts` — Added `AISignalCategory`, `DecisionHorizon` types and new optional fields to `AISignal` interface. Added `DrawerContent` union type.
- `src/components/ContentStream.tsx` — Integrated drawer (state + click handlers), added category filter pills derived from loaded data, changed detected-at display from time to date format.
- `public/content/ai-signals/index.json` — Updated with new signal entries.
- `src/hooks/useContent.ts` — Minor cleanup.

## Test plan

- [ ] `npm run build` passes with no TypeScript errors
- [ ] Click an AI Signal card — drawer slides in from right showing full details (summary, tags, source link, and new fields when present: category badge, decision horizon, why it matters, recommended actions, risks & caveats)
- [ ] Click "Read Full Article" on an Expert Insight — drawer shows full article with all paragraphs
- [ ] Close drawer via X button, backdrop click, and Escape key
- [ ] Body scroll is locked when drawer is open, restored on close
- [ ] Category filter pills appear below "AI Signal" header when signals have categories
- [ ] Clicking a category pill filters signals; clicking "All" restores the full list
- [ ] Signal cards show date (e.g. "5 Feb 2026") instead of time
- [ ] Mobile: drawer takes full width, filter pills wrap correctly
