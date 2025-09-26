# CV Files Location

## Where to Place Your CV Files

Place your CV files in this `assets` folder with the following names:

- **`cv.pdf`** - PDF version of your CV (primary download link)
- **`cv.docx`** - Word version of your CV (optional secondary link)

## File Naming Convention

The CV template expects these exact filenames:
- `assets/cv.pdf` 
- `assets/cv.docx`

## How It Works

The CV page will automatically show download links that point to:
- `{{ site.baseurl }}/assets/cv.pdf`
- `{{ site.baseurl }}/assets/cv.docx`

## Download Button Locations

1. **Header Section**: A single "Download CV (PDF)" button in the CV header
2. **Footer Section**: Both PDF and Word download options at the bottom of the CV

## Updating Your CV

Whenever you update your CV:
1. Replace the `cv.pdf` and/or `cv.docx` files in this folder
2. The download links will automatically point to the updated files
3. The "Last updated" date will show the current month/year automatically

## If You Don't Have a Word Version

If you only have a PDF version, you can:
1. Remove the Word download button by editing `_includes/cv-template.html`
2. Or just place only the `cv.pdf` file - the Word button will show but link to a non-existent file

## File Size Recommendations

- Keep PDF files under 2MB for faster loading
- Optimize images and formatting for web viewing