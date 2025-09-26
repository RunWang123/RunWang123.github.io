# Publications Management System

## 📝 Overview

Your publications are now centrally managed in a single JSON file. This means you only need to update **ONE FILE** to keep all your publication information synchronized across your entire website.

## 📍 Single Source of Truth

**File:** `_data/publications.json`

This file contains all your publication data and automatically updates:
- Publications page (`/publications/`)
- About page recent highlights
- CV publications section
- Any other pages that reference publications

## 🔧 How to Add/Update Publications

### Adding a New Publication

1. Open `_data/publications.json`
2. Add a new publication object to the `publications` array:

```json
{
  "id": "unique-id-2025",
  "title": "Your Paper Title",
  "authors": "Your Name, Co-Author Name, et al.",
  "venue": "Full Conference/Journal Name",
  "venue_short": "Short Name",
  "date": "2025-MM-DD",
  "year": "2025",
  "month": "Month",
  "type": "conference",  // or "journal"
  "status": "published", // or "accepted", "under_review"
  "url": "https://link-to-paper.com",
  "pdf_url": "/files/paper.pdf",
  "slides_url": "/files/slides.pdf",
  "code_url": "https://github.com/...",
  "bibtex_key": "yourname2025title",
  "abstract": "Your abstract here...",
  "keywords": ["keyword1", "keyword2"],
  "featured": true,  // Set to true for important papers
  "award": "Best Paper Award",  // Optional
  "note": "Acknowledgement",     // Optional
  "volume": "147",              // For journals
  "pages": "1-15"              // For journals
}
```

### Updating Existing Publications

1. Find the publication in `_data/publications.json`
2. Update any field (title, venue, URLs, etc.)
3. Changes will automatically appear everywhere

### Setting Featured Publications

- Set `"featured": true` for papers you want highlighted
- Featured papers appear:
  - In the "Recent Highlights" section of your About page
  - With a special badge on the Publications page

## 🎨 Publication Display Features

### Publications Page Features:
- **Expandable abstracts** - Click to read full abstract
- **Multiple link types** - Paper, PDF, Slides, Code
- **BibTeX generation** - Automatic BibTeX entries
- **Featured badges** - Highlights important papers
- **Responsive design** - Works on mobile devices

### About Page Integration:
- Automatically shows featured publications in highlights
- No manual updating needed

### CV Integration:
- Publications appear in your CV automatically
- Proper academic formatting
- Clickable links to papers

## 📁 File Structure

```
_data/
  publications.json          # ← Your single source of truth
_includes/
  publications-template.html # Template for displaying publications
assets/css/
  publications.css          # Styling for publications
_pages/
  publications.html         # Publications page (uses template)
  about.md                 # About page (pulls featured pubs)
```

## 🔄 Migration Complete

Your publications have been migrated from multiple locations:
- ❌ Old: Manual entries in CV, About page, Publications page
- ✅ New: Single JSON file drives everything

## 📋 Current Publications

1. **MAPP** (Featured) - IWQoS 2025
2. **Component Segmentation** - Computers in Industry 2023

## 🚀 Benefits

1. **Single Point of Update** - Edit once, updates everywhere
2. **Rich Metadata** - Store abstracts, keywords, awards, etc.
3. **Flexible Display** - Show/hide different elements per page
4. **Automatic Formatting** - Consistent citation styles
5. **SEO Friendly** - Better structured data
6. **Easy Maintenance** - No more hunting for duplicates

## 💡 Tips

- Keep the `id` field unique for each publication
- Use consistent author name formatting
- Set `featured: true` for your most important papers
- Add PDF links to `/files/` folder for direct downloads
- Update `bibtex_key` for proper citations

Your publication management is now streamlined and maintenance-free! 🎉