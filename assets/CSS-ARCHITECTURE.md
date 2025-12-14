# Centralized CSS Architecture

## Overview
The CSS has been refactored to use a centralized approach, eliminating redundancy and ensuring consistency across all pages.

## File Structure

### 1. **common-styles.css** (NEW - Centralized)
**Location**: `/assets/css/common-styles.css`

**Purpose**: Contains all shared styles that apply to custom pages (Publications, CV)

**What it contains**:
- Mobile responsive text colors (prevents light grey on mobile devices)
- Dark mode text colors (ensures consistent white text matching main theme)
- Common dark mode styling (links, borders, backgrounds)
- Webkit font rendering fixes for mobile

**Used by**: All custom pages (publications.html, cv-layout.html, cv-json.md)

### 2. **publications.css** (Simplified)
**Location**: `/assets/css/publications.css`

**Purpose**: Publication-specific layout and styling only

**What it contains**:
- Publication item layout
- Publication-specific components (badges, abstract, bibtex)
- Mobile layout adjustments (spacing, sizing)
- Print styles

**What was removed**:
- ❌ Mobile text color overrides (moved to common-styles.css)
- ❌ Dark mode styles (moved to common-styles.css)

### 3. **cv-layout.css** (Simplified)
**Location**: `/assets/css/cv-layout.css`

**Purpose**: CV page layout and styling only

**What it contains**:
- CV container and section layouts
- CV-specific components (headers, items, skills)
- Download button styling
- Mobile layout adjustments (spacing, sizing)

**What was removed**:
- ❌ Mobile text color overrides (moved to common-styles.css)
- ❌ Dark mode styles (moved to common-styles.css)

### 4. **cv-style.css** (Simplified)
**Location**: `/assets/css/cv-style.css`

**Purpose**: CV template styles (used by cv-json page)

**What was removed**:
- ❌ Mobile text color overrides (moved to common-styles.css)

### 5. **dark-mode.css** (Simplified)
**Location**: `/assets/css/dark-mode.css`

**Purpose**: Page-specific dark mode adjustments only

**What it contains**:
- Global dark mode overrides for main layout
- Page-specific background adjustments
- Border color adjustments for specific components

**What was removed**:
- ❌ Most dark mode text colors (moved to common-styles.css)
- ❌ Common dark mode link styling (moved to common-styles.css)

## Loading Order

All pages now load CSS in this order:
1. `main.css` (theme styles)
2. **`common-styles.css`** ← NEW (shared styles)
3. Page-specific CSS (publications.css, cv-layout.css, or cv-style.css)
4. `dark-mode.css` (page-specific dark mode adjustments)

## Benefits

### ✅ Reduced Redundancy
- Mobile text color fixes defined once in `common-styles.css`
- Dark mode colors defined once in `common-styles.css`
- No more duplicate code across multiple files

### ✅ Easier Maintenance
- Change mobile colors once → applies to all pages
- Change dark mode colors once → applies to all pages
- Individual page CSS files only contain layout-specific code

### ✅ Consistency
- All pages use identical colors from centralized file
- Main theme colors (#ffffff for text, #0ea1c5 for links) used everywhere
- No more conflicting color definitions

### ✅ Better Organization
- Clear separation of concerns:
  - `common-styles.css`: Cross-page styling
  - Page CSS: Page-specific layout
  - `dark-mode.css`: Special dark mode adjustments

## Color Reference

### Light Mode (Mobile)
- **Headings/Titles**: `#1a1a1a` (dark black)
- **Body text**: `#1a1a1a` (dark black)
- **Secondary text**: `#333` (dark grey)
- **Links**: `#374151` (medium grey)

### Dark Mode
- **All text**: `#ffffff` (pure white, matches main theme)
- **Secondary text**: `#bdc1c4` (light grey)
- **Links**: `#0ea1c5` (cyan, matches main theme)
- **Link hover**: `#0b7c9a` (darker cyan)

## Making Changes

### To change colors site-wide:
Edit `/assets/css/common-styles.css`

### To change publication layout:
Edit `/assets/css/publications.css`

### To change CV layout:
Edit `/assets/css/cv-layout.css` or `/assets/css/cv-style.css`

### To add dark mode adjustments:
Edit `/assets/css/dark-mode.css` (for page-specific overrides only)
