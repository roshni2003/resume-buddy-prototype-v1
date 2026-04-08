# Complete Revert Guide: Removing API Key Dialog Feature

## Overview
This guide will help you revert all changes related to the temporary API Key dialog feature and restore the application to use only environment variables for the Gemini API key.

---

## 📋 Table of Contents
1. [Files to Modify](#files-to-modify)
2. [Files to Delete](#files-to-delete)
3. [Step-by-Step Instructions](#step-by-step-instructions)
4. [Verification Checklist](#verification-checklist)
5. [Quick Commands](#quick-commands)

---

## 📂 Files to Modify

### Modified Files (Need to be reverted):
1. `src/routes/dashboard/route.tsx` - Remove API Key button, restore Resumes tab
2. `src/routes/builder/$resumeId/-components/top-tray.tsx` - Remove getApiKey() function
3. `src/components/ui/ai-generate-button.tsx` - Remove getApiKey() function
4. `src/dialogs/resume/import.tsx` - Remove getApiKey() function
5. `src/utils/ai-service.ts` - Remove localStorage checks
6. `src/integrations/orpc/services/ai.ts` - Remove localStorage checks

### Files to Delete:
1. `src/routes/dashboard/-components/api-key-dialog.tsx` - API Key dialog component
2. `test-api-key.html` - API key testing tool
3. `check-api-key.html` - Simple localStorage checker
4. `public/debug-api-key.html` - Debug tool
5. `API_KEY_DEBUGGING_GUIDE.md` - Debugging documentation
6. `API_KEY_FEATURE_IMPLEMENTATION.md` - Implementation guide
7. `LOCALSTORAGE_FIX_GUIDE.md` - localStorage troubleshooting
8. `QUOTA_EXCEEDED_SOLUTION.md` - Quota solution guide
9. `FIXED_ENV_API_KEY_ISSUE.md` - Fix documentation

---

## 🔧 Step-by-Step Instructions

### Step 1: Revert Dashboard Route

**File:** `src/routes/dashboard/route.tsx`

**Remove these imports:**
```typescript
import { Key } from "@phosphor-icons/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ApiKeyDialog } from "./-components/api-key-dialog";
```

**Restore to original:**
```typescript
import { t } from "@lingui/core/macro";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { BaseTabsList, BaseTabs, BaseTabsTrigger } from "@/components/ui/base-tabs";
import { Header } from "@/components/ui/header";
import { UserDropdownMenu } from "@/components/user/dropdown-menu";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex h-screen flex-col">
      <Header>
        <BaseTabs value="resumes">
          <BaseTabsList className="flex-1">
            <BaseTabsTrigger value="resumes" asChild>
              <Link to="/dashboard/resumes">{t`Resumes`}</Link>
            </BaseTabsTrigger>
            <BaseTabsTrigger value="settings" asChild>
              <Link to="/dashboard/settings">{t`Settings`}</Link>
            </BaseTabsTrigger>
          </BaseTabsList>
        </BaseTabs>
        <UserOptions />
      </Header>

      <Outlet />
    </div>
  );
}
```

**What to remove:**
- State: `const [apiKeyDialogOpen, setApiKeyDialogOpen] = useState(false);`
- API Key button in the navigation
- Dialog component at the end: `<ApiKeyDialog open={apiKeyDialogOpen} onOpenChange={setApiKeyDialogOpen} />`

---

### Step 2: Revert Top Tray Component

**File:** `src/routes/builder/$resumeId/-components/top-tray.tsx`

**Find lines 76-92** and replace with:
```typescript
const [reviewStartTime, setReviewStartTime] = useState<number>(0);
const fallbackTimeoutRef = useRef<NodeJS.Timeout | null>(null);

const provider = import.meta.env.VITE_AI_PROVIDER || "gemini";
const model = import.meta.env.VITE_AI_MODEL || "gemini-2.0-flash-exp";
const apiKey = import.meta.env.VITE_AI_API_KEY || "";
const baseURL = import.meta.env.VITE_AI_BASE_URL || undefined;
const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
const [showLastAttemptConfirm, setShowLastAttemptConfirm] = useState(false);
```

**Remove entirely:**
```typescript
// Helper function to get API key from localStorage or environment
const getApiKey = () => {
  if (typeof localStorage !== "undefined") {
    const localKey = localStorage.getItem("gemini_api_key");
    if (localKey) {
      console.log("🔑 Using API key from localStorage for Final Review:", localKey.substring(0, 15) + "...");
      return localKey;
    }
  }
  const envKey = import.meta.env.VITE_AI_API_KEY || "";
  console.log("🔑 Using API key from environment for Final Review:", envKey ? envKey.substring(0, 15) + "..." : "NONE");
  return envKey;
};
```

---

### Step 3: Revert AI Generate Button

**File:** `src/components/ui/ai-generate-button.tsx`

**Find around lines 30-56** and replace with:
```typescript
  isWordCountValid = true,
  onRoundComplete,
}: AIGenerateButtonProps) {
  const isMounted = useRef(true);

  // Use environment variables for AI configuration (optional, server provides defaults)
  const provider = import.meta.env.VITE_AI_PROVIDER as AIProvider | undefined;
  const model = import.meta.env.VITE_AI_MODEL as string | undefined;
  const apiKey = import.meta.env.VITE_AI_API_KEY as string | undefined;
  const baseURL = import.meta.env.VITE_AI_BASE_URL as string | undefined;

  const { mutate: generateContent, isPending } = useMutation(orpc.ai.generateContent.mutationOptions());
```

**Remove the entire getApiKey() function:**
```typescript
// Remove this:
const getApiKey = (): string | undefined => {
  if (typeof localStorage !== "undefined") {
    const localKey = localStorage.getItem("gemini_api_key");
    if (localKey) {
      console.log("🔑 Using API key from localStorage for AI Generate:", localKey.substring(0, 15) + "...");
      return localKey;
    }
  }
  const envKey = import.meta.env.VITE_AI_API_KEY as string | undefined;
  if (envKey) {
    console.log("🔑 Using API key from environment for AI Generate:", envKey.substring(0, 15) + "...");
  }
  return envKey;
};
```

---

### Step 4: Revert Import Dialog

**File:** `src/dialogs/resume/import.tsx`

**Find around lines 67-88** and replace with:
```typescript
type FormValues = z.infer<typeof formSchema>;

export function ImportResumeDialog(_: DialogProps<"resume.import">) {
  // Use environment variables for AI configuration
  const provider = (import.meta.env.VITE_AI_PROVIDER || "gemini") as AIProvider;
  const model = import.meta.env.VITE_AI_MODEL || "gemini-1.5-flash";
  const apiKey = import.meta.env.VITE_AI_API_KEY || "";
  const baseURL = import.meta.env.VITE_AI_BASE_URL;
  const isAIEnabled = !!apiKey && !!model;

  const closeDialog = useDialogStore((state) => state.closeDialog);
```

**Remove the entire getApiKey() function:**
```typescript
// Remove this:
const getApiKey = (): string => {
  if (typeof localStorage !== "undefined") {
    const localKey = localStorage.getItem("gemini_api_key");
    if (localKey) {
      console.log("🔑 Using API key from localStorage for Import:", localKey.substring(0, 15) + "...");
      return localKey;
    }
  }
  const envKey = import.meta.env.VITE_AI_API_KEY || "";
  if (envKey) {
    console.log("🔑 Using API key from environment for Import:", envKey.substring(0, 15) + "...");
  }
  return envKey;
};
```

---

### Step 5: Revert AI Service

**File:** `src/utils/ai-service.ts`

**Replace the top section (lines 1-25) with:**
```typescript
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_AI_API_KEY || "";
const MODEL_NAME = import.meta.env.VITE_AI_MODEL || "models/gemini-2.0-flash-exp";

const genAI = new GoogleGenerativeAI(API_KEY);

interface ExperienceData {
  position: string;
  company: string;
  location: string;
  period: string;
}

interface SummaryData {
  name: string;
  headline: string;
  experience: Array<{ position: string; company: string }>;
  skills: string[];
  currentSummary?: string;
}
```

**Remove these functions:**
```typescript
// Remove this:
function getApiKey(): string {
  const localKey = typeof localStorage !== "undefined" ? localStorage.getItem("gemini_api_key") : null;
  if (localKey) {
    console.log("Using API key from localStorage:", localKey.substring(0, 10) + "...");
    return localKey;
  }
  const envKey = import.meta.env.VITE_AI_API_KEY || "";
  console.log("Using API key from environment:", envKey ? envKey.substring(0, 10) + "..." : "NONE");
  return envKey;
}

// Remove this:
function getGenAI(): GoogleGenerativeAI {
  const apiKey = getApiKey();
  return new GoogleGenerativeAI(apiKey);
}
```

**In the export functions, change:**
```typescript
// FROM:
export async function generateExperienceDescription(data: ExperienceData): Promise<string> {
  try {
    const currentApiKey = getApiKey();
    console.log("🔑 generateExperienceDescription - Using API key:", currentApiKey ? currentApiKey.substring(0, 15) + "..." : "NONE");
    const genAI = getGenAI();
    const model = genAI.getGenerativeModel({

// TO:
export async function generateExperienceDescription(data: ExperienceData): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({
```

**Do the same for `generateProfessionalSummary` function.**

---

### Step 6: Revert Server-Side AI Service

**File:** `src/integrations/orpc/services/ai.ts`

**Find the getModel function (around lines 29-51) and replace with:**
```typescript
function getModel(input: GetModelInput) {
  const provider = input.provider || env.AI_PROVIDER || "gemini";
  const model = input.model || env.AI_MODEL || "gemini-1.5-flash";
  const apiKey = input.apiKey || env.AI_API_KEY || "";
  const baseURL = input.baseURL || env.AI_BASE_URL || undefined;

  return match(provider)
    .with("openai", () => createOpenAI({ apiKey, baseURL }).languageModel(model))
    .with("ollama", () => createOllama({ apiKey, baseURL }).languageModel(model))
    .with("anthropic", () => createAnthropic({ apiKey, baseURL }).languageModel(model))
    .with("vercel-ai-gateway", () => createGateway({ apiKey, baseURL }).languageModel(model))
    .with("gemini", () => createGoogleGenerativeAI({ apiKey, baseURL }).languageModel(model))
    .exhaustive();
}
```

**Remove the localStorage check:**
```typescript
// Remove this entire block:
// Check localStorage for user-provided API key first (for Gemini provider)
let apiKey = input.apiKey || env.AI_API_KEY || "";
if (provider === "gemini" && typeof localStorage !== "undefined") {
  const localKey = localStorage.getItem("gemini_api_key");
  if (localKey) {
    console.log("Using Gemini API key from localStorage:", localKey.substring(0, 10) + "...");
    apiKey = localKey;
  } else {
    console.log("Using Gemini API key from environment:", apiKey ? apiKey.substring(0, 10) + "..." : "NONE");
  }
}
```

---

### Step 7: Delete API Key Dialog Component

**Command:**
```bash
rm src/routes/dashboard/-components/api-key-dialog.tsx
```

Or manually delete the file `src/routes/dashboard/-components/api-key-dialog.tsx`

---

### Step 8: Delete All Test/Debug Files

**Command:**
```bash
rm test-api-key.html
rm check-api-key.html
rm public/debug-api-key.html
```

---

### Step 9: Delete All Documentation Files

**Command:**
```bash
rm API_KEY_DEBUGGING_GUIDE.md
rm API_KEY_FEATURE_IMPLEMENTATION.md
rm LOCALSTORAGE_FIX_GUIDE.md
rm QUOTA_EXCEEDED_SOLUTION.md
rm FIXED_ENV_API_KEY_ISSUE.md
```

---

### Step 10: Clean Up localStorage (Optional)

You can add a one-time cleanup to remove the API key from users' browsers:

**Option 1: Manual cleanup (users can do this)**
```javascript
// Open browser console and run:
localStorage.removeItem("gemini_api_key");
```

**Option 2: Add cleanup code temporarily**

Create a file `src/utils/cleanup-api-key.ts`:
```typescript
// Run once to cleanup localStorage
export const cleanupApiKeyFeature = () => {
  if (typeof localStorage !== "undefined") {
    localStorage.removeItem("gemini_api_key");
    console.log("✅ Cleaned up temporary API key feature");
  }
};
```

Call it from your app initialization, then delete this file after a few weeks.

---

## ✅ Verification Checklist

After completing all steps, verify:

- [ ] Dashboard shows "Resumes" tab (not "API Key" button)
- [ ] No API Key dialog component exists
- [ ] All test/debug HTML files are deleted
- [ ] All documentation files are deleted
- [ ] `src/utils/ai-service.ts` uses `import.meta.env.VITE_AI_API_KEY` directly
- [ ] `src/integrations/orpc/services/ai.ts` uses `env.AI_API_KEY` directly
- [ ] `top-tray.tsx` uses `import.meta.env.VITE_AI_API_KEY` directly
- [ ] `ai-generate-button.tsx` uses `import.meta.env.VITE_AI_API_KEY` directly
- [ ] `import.tsx` uses `import.meta.env.VITE_AI_API_KEY` directly
- [ ] No console logs showing "Using API key from localStorage"
- [ ] AI features work with environment variable API key
- [ ] No TypeScript errors
- [ ] Application builds successfully

---

## 🚀 Quick Commands

### Delete All Extra Files at Once
```bash
rm -f \
  src/routes/dashboard/-components/api-key-dialog.tsx \
  test-api-key.html \
  check-api-key.html \
  public/debug-api-key.html \
  API_KEY_DEBUGGING_GUIDE.md \
  API_KEY_FEATURE_IMPLEMENTATION.md \
  LOCALSTORAGE_FIX_GUIDE.md \
  QUOTA_EXCEEDED_SOLUTION.md \
  FIXED_ENV_API_KEY_ISSUE.md
```

### Verify Files are Deleted
```bash
# Check if any of the files still exist
ls -la src/routes/dashboard/-components/api-key-dialog.tsx 2>/dev/null && echo "⚠️ Dialog still exists!" || echo "✅ Dialog deleted"
ls -la test-api-key.html 2>/dev/null && echo "⚠️ Test file still exists!" || echo "✅ Test files deleted"
```

### Check for localStorage References
```bash
# Search for any remaining localStorage.getItem("gemini_api_key") references
grep -r "gemini_api_key" src/
# Should return no results (or only in excluded files)
```

### Build and Test
```bash
# Build the application
npm run build
# or
pnpm build

# Run the application
npm run dev
# or
pnpm dev
```

---

## 📝 Summary

### What Was Added (Now Being Removed):
1. ✅ API Key dialog component
2. ✅ API Key button in dashboard header
3. ✅ localStorage checks in 6 different files
4. ✅ Debug/test HTML files
5. ✅ Documentation files

### What Will Be Restored:
1. ✅ "Resumes" tab in dashboard
2. ✅ Direct use of environment variables
3. ✅ No localStorage dependencies
4. ✅ Original codebase state

### Files Modified: 6
1. `src/routes/dashboard/route.tsx`
2. `src/routes/builder/$resumeId/-components/top-tray.tsx`
3. `src/components/ui/ai-generate-button.tsx`
4. `src/dialogs/resume/import.tsx`
5. `src/utils/ai-service.ts`
6. `src/integrations/orpc/services/ai.ts`

### Files Deleted: 9+
1. `src/routes/dashboard/-components/api-key-dialog.tsx`
2. `test-api-key.html`
3. `check-api-key.html`
4. `public/debug-api-key.html`
5. `API_KEY_DEBUGGING_GUIDE.md`
6. `API_KEY_FEATURE_IMPLEMENTATION.md`
7. `LOCALSTORAGE_FIX_GUIDE.md`
8. `QUOTA_EXCEEDED_SOLUTION.md`
9. `FIXED_ENV_API_KEY_ISSUE.md`

---

## 🎯 Final Result

After completing all steps, your application will:
- ✅ Use only environment variables for API keys
- ✅ Have no localStorage dependencies
- ✅ Show the original "Resumes" tab in the dashboard
- ✅ Have no API Key dialog feature
- ✅ Be in the same state as before the temporary feature was added

---

**Created:** April 3, 2026  
**Purpose:** Complete guide to revert temporary API Key dialog feature  
**Estimated Time:** 15-20 minutes

---

## ⚠️ Important Notes

1. **Backup First:** Consider creating a git branch before making changes
2. **Test Thoroughly:** Test all AI features after reverting
3. **Environment Variables:** Make sure `VITE_AI_API_KEY` is set in your `.env` file
4. **Clean Build:** Run a clean build after all changes: `npm run build` or `pnpm build`
5. **Clear Browser Cache:** Users may need to clear their browser cache/localStorage manually

---

## 🆘 Troubleshooting

**Issue:** TypeScript errors after reverting  
**Solution:** Run `npm run type-check` or `pnpm type-check` to find remaining issues

**Issue:** Build fails  
**Solution:** Make sure all imports are correct and no references to deleted components remain

**Issue:** AI features not working  
**Solution:** Verify `VITE_AI_API_KEY` is set in your environment variables

**Issue:** Console still showing localStorage logs  
**Solution:** Search for `gemini_api_key` in your codebase and remove any remaining references

---

**END OF GUIDE**
