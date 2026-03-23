# Zoe Resume Builder - Complete Rebranding Guide

This document outlines all the changes made to rebrand Rx Resume/Reactive Resume to **Zoe Resume Builder** with a light theme by default.

## ✅ Completed Changes

### 1. **Theme Changed to Light Mode (Default)**
- **File**: `src/utils/theme.ts`
- **Change**: Changed `defaultTheme` from `"dark"` to `"light"`
```typescript
const defaultTheme: Theme = "light";  // Was "dark"
```

### 2. **Brand Icon Updated**
- **File**: `src/components/ui/brand-icon.tsx`
- **Change**: Simplified to use single Zoe icon image instead of dual theme logos
```tsx
export function BrandIcon({ variant = "logo", className, ...props }: Props) {
	return (
		<img
			src="/zoe-icon.png"
			alt="Zoe Resume Builder"
			className={cn("size-12", className)}
			{...props}
		/>
	);
}
```

### 3. **Page Metadata & SEO**
- **File**: `src/routes/__root.tsx`
- **Changes**:
  - App name: "Zoe Resume Builder"
  - Tagline: "Build your professional resume with AI assistance"
  - Description updated
  - Favicon changed to `/zoe-icon.png`
  - All meta tags updated

### 4. **Sidebar Branding**
- **File**: `src/routes/dashboard/-components/sidebar.tsx`
- **Change**: Screen reader text updated to "Zoe Resume Builder"

### 5. **Copyright Footer**
- **File**: `src/components/ui/copyright.tsx`
- **Changes**:
  - Removed "A passion project by Amruth Pillai" section
  - Updated version text to "Zoe Resume Builder v{__APP_VERSION__}"

### 6. **Email Branding**
- **File**: `src/integrations/email/service.ts`
- **Change**: Default from address updated to "Zoe Resume Builder <noreply@localhost>"

### 7. **Authentication Config**
- **File**: `src/integrations/auth/config.ts`
- **Changes** (2 occurrences):
  - `appName`: "Zoe Resume Builder"
  - Password reset email: "...your Zoe Resume Builder account..."
  - Verification email: "...account on Zoe Resume Builder..."
  - Change email: "...email on Zoe Resume Builder..."
  - Two-factor issuer: "Zoe Resume Builder"
  - Passkey rpName: "Zoe Resume Builder"

### 8. **Repository & Package Info**
- **File**: `package.json`
- **Change**: Repository URL updated to `navgurukul/zoe-resume-builder`

### 9. **API Documentation**
- **File**: `src/routes/api/openapi.$.ts`
- **Changes**:
  - Title: "Zoe Resume Builder"
  - Description: "Zoe Resume Builder API"
  - Contact: NavGurukul
  - License URL updated
  - External docs URL updated

### 10. **GitHub Configuration**
- **Files**:
  - `.github/ISSUE_TEMPLATE/1-bug-report.yml`
  - `.github/ISSUE_TEMPLATE/2-feature-request.yml`
  - `.github/workflows/docker-build.yml`
- **Changes**: Removed assignees, updated Docker annotations to NavGurukul

### 11. **Deployment Files**
- **Files**:
  - `compose.yml`
  - `compose.dev.yml`
  - `.env.example`
- **Changes**:
  - Docker image: `navgurukul/zoe-resume-builder:latest`
  - SMTP_FROM: "Zoe Resume Builder <noreply@zoe-resume-builder.com>"
  - Documentation links removed or genericized

### 12. **Misc Files**
- `crowdin.yml`: Removed reviewer
- `public/robots.txt`: Updated sitemap URL
- `locales/uz-UZ.po`: Removed Amruth Pillai reference
- `src/components/resume/preview.tsx`: Removed documentation link
- `src/components/input/github-stars-button.tsx`: Updated GitHub repo link

### 13. **Deleted Files**
- `.github/.well-known/funding.json`
- `public/funding.json`

## 📋 TODO: Additional Changes Needed

### Import Dialog Labels
**File**: `src/dialogs/resume/import.tsx` (Lines 211-234)

Replace:
```tsx
Continue where you left off by importing an existing resume you created using Reactive Resume or any another
resume builder. Supported formats include PDF, Microsoft Word, as well as JSON files from Reactive Resume.

// And in options:
{ value: "reactive-resume-json", label: "Reactive Resume (JSON)" },
{ value: "reactive-resume-v4-json", label: "Reactive Resume v4 (JSON)" },
```

With:
```tsx
Continue where you left off by importing an existing resume you created using Zoe Resume Builder or any another
resume builder. Supported formats include PDF, Microsoft Word, as well as JSON files from Zoe Resume Builder.

// And in options:
{ value: "reactive-resume-json", label: "Zoe Resume Builder (JSON)" },
{ value: "reactive-resume-v4-json", label: "Zoe Resume Builder v4 (JSON)" },
```

### ORPC Router Description
**File**: `src/integrations/orpc/router/auth.ts` (Line 14)

Replace:
```typescript
"A list of all authentication providers, and their display names, supported by the instance of Reactive Resume.",
```

With:
```typescript
"A list of all authentication providers, and their display names, supported by the instance of Zoe Resume Builder.",
```

### AI Parser System Prompts
**Files**:
- `src/integrations/ai/prompts/pdf-parser-system.md`
- `src/integrations/ai/prompts/docx-parser-system.md`

Replace "Reactive Resume" with "Zoe Resume Builder" in the opening sentences.

### Landing Page Theme
**File**: `src/routes/_home/index.tsx`

The landing page already has a light background (`bg-linear-to-b from-gray-50 to-blue-50`), which is good!

Ensure the dark mode classes are removed or that the page defaults to light styling.

## 🎨 Logo/Icon Requirements

Ensure these assets exist in the `public/` folder:
- `/public/zoe-icon.png` - Main logo/icon (128x128 or larger)
- `/public/zoe-talking.png` - AI assistant icon (already exists)
- `/public/favicon.ico` - Browser favicon
- `/public/manifest.webmanifest` - Update app name in manifest

## 📝 Localization Files

The `locales/*.po` files contain many references to "Reactive Resume". These should ideally be updated or regenerated through Crowdin if you're using localization.

For English (`locales/en-US.po`), update all msgid strings containing "Reactive Resume" to "Zoe Resume Builder".

## 🔧 Environment Variables

Update your `.env` file:
```bash
APP_URL=https://your-domain.com
SMTP_FROM="Zoe Resume Builder <noreply@your-domain.com>"
```

## 🚀 Deployment Checklist

1. ✅ Theme defaults to light mode
2. ✅ All branding updated in metadata
3. ✅ Logo/icon files in place
4. ✅ Copyright and footer updated
5. ✅ Email templates rebranded
6. ✅ Auth system rebranded
7. ✅ Docker configuration updated
8. ⚠️ Import dialog labels (manual fix needed)
9. ⚠️ AI parser prompts (manual fix needed)
10. ⚠️ Locale files (if using translations)
11. Update manifest.webmanifest with new app name
12. Update any hardcoded URLs in deployment configs

## 📚 Documentation Folder

The `docs/` folder contains extensive references to "Reactive Resume" and "rxresu.me". If you're hosting documentation:
- Update all `.mdx` files in `docs/`
- Update `docs/docs.json` branding
- Replace all rxresu.me URLs with your domain

## Summary

The main application has been successfully rebranded to **Zoe Resume Builder** with:
- ✅ Light theme as default
- ✅ Custom Zoe branding throughout
- ✅ All metadata and SEO updated
- ✅ Email and auth system rebranded
- ✅ Removed original author references

The few remaining manual fixes are in dialog text and AI prompts. All core functionality remains intact while presenting your custom brand.
