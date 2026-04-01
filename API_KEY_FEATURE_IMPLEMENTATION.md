# API Key Feature Implementation

## Summary
This document describes the temporary API Key feature added to the dashboard that allows users to input their own Gemini API key without needing to change the deployed environment variables.

## Changes Made

### 1. New Component Created
**File:** `/src/routes/dashboard/-components/api-key-dialog.tsx`
- Created a dialog component with an input field for users to enter their Gemini API key
- Stores the API key in browser's `localStorage` under the key `"gemini_api_key"`
- Includes a "Use This" button to save the key
- Shows success/error alerts

### 2. Dashboard Header Updated
**File:** `/src/routes/dashboard/route.tsx`
- Replaced the "Resumes" navigation tab with an "API Key" button
- Added state management for the API Key dialog (`apiKeyDialogOpen`)
- Added the Key icon from phosphor-icons
- Opens the dialog when the button is clicked

### 3. AI Service Updated
**File:** `/src/utils/ai-service.ts`
- Modified to check `localStorage` for a user-provided API key first
- Falls back to environment variable if no key is found in localStorage
- Creates GoogleGenerativeAI instance dynamically to pick up key changes

**File:** `/src/integrations/orpc/services/ai.ts`
- Updated `getModel()` function to check localStorage for Gemini API keys
- Only applies to the "gemini" provider
- Falls back to environment variable if no local key is found

## How It Works

1. User clicks "API Key" button in the dashboard header
2. A dialog opens with a password input field
3. User enters their Gemini API key and clicks "Use This"
4. The key is saved to `localStorage.setItem("gemini_api_key", apiKey)`
5. All AI service calls now check localStorage first before using the environment variable
6. The key persists across browser sessions but is device/browser-specific

## How to Revert This Feature

When you want to remove this temporary feature, follow these steps:

### Step 1: Delete the API Key Dialog Component
```bash
rm /src/routes/dashboard/-components/api-key-dialog.tsx
```

### Step 2: Revert Dashboard Route
In `/src/routes/dashboard/route.tsx`, replace the imports and button:

**Remove these imports:**
```typescript
import { Key } from "@phosphor-icons/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ApiKeyDialog } from "./-components/api-key-dialog";
```

**Add back:**
```typescript
import { ReadCvLogoIcon } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
```

**Remove this state:**
```typescript
const [apiKeyDialogOpen, setApiKeyDialogOpen] = useState(false);
```

**Replace the API Key button with the original Resumes tab:**
```typescript
<Link
  to="/dashboard/resumes"
  activeProps={{ className: "bg-emerald-50 text-emerald-700" }}
  className="flex items-center gap-2 rounded-lg px-3 py-2 font-medium text-gray-700 text-sm transition-all hover:bg-gray-100 sm:px-4"
>
  <ReadCvLogoIcon className="size-5" />
  <span>{i18n._(t`Resumes`)}</span>
</Link>
```

**Remove the dialog component at the end:**
```typescript
{/* API Key Dialog */}
<ApiKeyDialog open={apiKeyDialogOpen} onOpenChange={setApiKeyDialogOpen} />
```

### Step 3: Revert AI Service Files

**In `/src/utils/ai-service.ts`:**
```typescript
// Replace the helper function and initialization with:
const API_KEY = import.meta.env.VITE_AI_API_KEY || "";
const MODEL_NAME = import.meta.env.VITE_AI_MODEL || "models/gemini-2.0-flash-exp";

const genAI = new GoogleGenerativeAI(API_KEY);

// Remove getApiKey() and getGenAI() functions
// Change both functions to use genAI directly instead of getGenAI()
```

**In `/src/integrations/orpc/services/ai.ts`:**
```typescript
// In the getModel() function, replace with:
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

## Testing

To test the feature:
1. Go to the dashboard
2. Click the "API Key" button
3. Enter a valid Gemini API key
4. Click "Use This"
5. Try using an AI feature (like generating resume content)
6. The new key should be used instead of the environment variable

## Notes

- The API key is stored in browser's localStorage, so it's browser and device-specific
- Users need to re-enter the key if they clear browser data or use a different browser
- The key is stored as plain text in localStorage (visible in browser dev tools)
- This is a temporary solution for easier testing and should be removed before production deployment

---
**Created:** April 1, 2026
**Author:** GitHub Copilot
