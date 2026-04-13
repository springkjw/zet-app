# Component Compatibility Surface Removal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the remaining compatibility-only flat family entrypoints under `frontend/components/*/index.ts` after consumers are fully migrated to the canonical role-first shared surface.

**Architecture:** Keep the current role-first canonical surface (`controls`, `display`, `overlay`, `navigation`, `layout`, `typography`) unchanged and treat this round as a cleanup-only migration. First prove which legacy flat entrypoints are still consumed, then migrate those consumers, then delete the compatibility-only barrels, then update `frontend/DESIGN.md` and verification evidence so the codebase exposes only the canonical surface.

**Tech Stack:** Expo Router, React Native, TypeScript, ESLint, root `@/components` aggregator

---

### Task 1: Audit remaining compatibility-only imports

**Files:**
- Modify: `frontend/**/*.ts`, `frontend/**/*.tsx` (read-only audit)
- Create: `.sisyphus/evidence/compat-surface-audit.txt`

- [x] **Step 1: Audit remaining flat family imports**

Run:
```bash
grep -R "@/components/(Button|Checkbox|Toggle|Menu|Modal|Nav|Screen|Text)" frontend --include="*.ts" --include="*.tsx"
```
Expected: exact list of remaining consumers.

- [x] **Step 2: Write audit evidence**

Record each remaining compatibility-only import path and consumer file in:
```text
.sisyphus/evidence/compat-surface-audit.txt
```

- [x] **Step 3: Commit**

```bash
git add .sisyphus/evidence/compat-surface-audit.txt
git commit -m "chore(frontend): audit compatibility-only component imports"
```

### Task 2: Migrate remaining consumers to canonical imports

**Files:**
- Modify: exact consumer files found in Task 1
- Test: `frontend/DESIGN.md`

- [x] **Step 1: Replace flat family imports**

For each consumer using a flat family entrypoint like:
```ts
import { BaseNav } from "@/components/Nav";
```
replace with canonical root-surface import:
```ts
import { BaseNav } from "@/components";
```

- [x] **Step 2: Verify no compatibility imports remain**

Run:
```bash
grep -R "@/components/(Button|Checkbox|Toggle|Menu|Modal|Nav|Screen|Text)" frontend --include="*.ts" --include="*.tsx"
```
Expected: no matches.

- [x] **Step 3: Run lint**

Run:
```bash
cd frontend && yarn lint
```
Expected: exit 0.

- [x] **Step 4: Commit**

```bash
git add frontend
git commit -m "refactor(frontend): remove compatibility-only family imports"
```

### Task 3: Delete compatibility-only flat barrels

**Files:**
- Delete: `frontend/components/Button/index.ts`
- Delete: `frontend/components/Checkbox/index.ts`
- Delete: `frontend/components/Toggle/index.ts`
- Delete: `frontend/components/Menu/index.ts`
- Delete: `frontend/components/Modal/index.ts`
- Delete: `frontend/components/Nav/index.ts`
- Delete: `frontend/components/Screen/index.ts`
- Delete: `frontend/components/Text/index.ts`

- [x] **Step 1: Remove compatibility-only barrels**

Delete the eight compatibility-only `index.ts` files listed above.

- [x] **Step 2: Verify only canonical role-first barrels remain**

Run:
```bash
find frontend/components -maxdepth 2 -name index.ts | sort
```
Expected: role-first folders remain; compatibility-only flat family barrels are gone.

- [x] **Step 3: Run lint again**

Run:
```bash
cd frontend && yarn lint
```
Expected: exit 0.

- [x] **Step 4: Commit**

```bash
git add frontend/components
git commit -m "refactor(frontend): remove compatibility-only component barrels"
```

### Task 4: Update documentation and verification surface

**Files:**
- Modify: `frontend/DESIGN.md`
- Modify: `.sisyphus/evidence/task-7-final-verification.txt`

- [x] **Step 1: Remove compatibility-only guidance from DESIGN.md**

Update `frontend/DESIGN.md` so it no longer documents flat family entrypoints as compatibility-only. The document should describe only the canonical role-first surface and root `@/components` aggregator.

- [x] **Step 2: Update verification evidence**

Update `.sisyphus/evidence/task-7-final-verification.txt` so the final state is recorded as:
- canonical role-first paths only
- no compatibility-only family barrels
- no `Chip` family on disk or in code

- [x] **Step 3: Verify documentation matches code**

Run:
```bash
grep -R "@/components/(Button|Checkbox|Toggle|Menu|Modal|Nav|Screen|Text)" frontend/DESIGN.md .sisyphus/evidence/task-7-final-verification.txt
```
Expected: no matches.

- [x] **Step 4: Commit**

```bash
git add frontend/DESIGN.md .sisyphus/evidence/task-7-final-verification.txt
git commit -m "docs(frontend): remove compatibility surface guidance"
```

### Task 5: Final verification

**Files:**
- Modify: `.sisyphus/evidence/compat-surface-final.txt`

- [x] **Step 1: Run final checks**

Run:
```bash
grep -R "@/components/(Button|Checkbox|Toggle|Menu|Modal|Nav|Screen|Text)" frontend --include="*.ts" --include="*.tsx"
grep -R "@/components/Chip|ItemChip|ItemChipType|MarketChip" frontend --include="*.ts" --include="*.tsx"
cd frontend && yarn lint
```
Expected:
- no compatibility-only flat family imports
- no legacy Chip names
- lint exit 0

- [x] **Step 2: Write final evidence**

Record the exact command outputs in:
```text
.sisyphus/evidence/compat-surface-final.txt
```

- [x] **Step 3: Commit**

```bash
git add .sisyphus/evidence/compat-surface-final.txt
git commit -m "chore(frontend): verify canonical component surface"
```
