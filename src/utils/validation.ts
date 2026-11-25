/**
 * Validation utilities for contact and resume fields
 */

// Email regex: standard RFC 5322 compatible pattern allowing realistic email formats
export const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

/**
 * Checks if the given string is a valid email address.
 */
export function isValidEmail(email: string): boolean {
	if (!email) return false;
	const trimmed = email.trim();
	return trimmed.length > 3 && EMAIL_REGEX.test(trimmed);
}

/**
 * Validates optional email. If provided and non-empty, must be valid.
 */
export function isValidOptionalEmail(email: string): boolean {
	if (!email || !email.trim()) return true;
	return isValidEmail(email);
}

/**
 * Phone number validation:
 * Allows standard domestic and international numbers:
 * - Digits: 7 to 15 digits (ITU-T E.164 recommends up to 15 digits).
 * - Optional leading '+' for international country code.
 * - Allows common formatting characters: spaces, hyphens, parentheses, dots.
 */
export function isValidPhone(phone: string): boolean {
	if (!phone) return false;
	const trimmed = phone.trim();
	if (trimmed.length < 7) return false;

	if (!/^[+]?[\d\s\-().]+$/.test(trimmed)) {
		return false;
	}

	const digits = trimmed.replace(/\D/g, "");
	return digits.length >= 7 && digits.length <= 15;
}

/**
 * Validates optional phone number. If provided and non-empty, must be valid.
 */
export function isValidOptionalPhone(phone: string): boolean {
	if (!phone || !phone.trim()) return true;
	return isValidPhone(phone);
}

export function getEmailValidationError(email: string, required = false): string | null {
	const trimmed = email ? email.trim() : "";
	if (!trimmed) {
		return required ? "Email address is required." : null;
	}
	if (!isValidEmail(trimmed)) {
		return "Please enter a valid email address (e.g. name@example.com).";
	}
	return null;
}

export function getPhoneValidationError(phone: string, required = false): string | null {
	const trimmed = phone ? phone.trim() : "";
	if (!trimmed) {
		return required ? "Phone number is required." : null;
	}
	if (!isValidPhone(trimmed)) {
		return "Please enter a valid phone number (7-15 digits, e.g. +91 98765 43210).";
	}
	return null;
}

/**
 * Generic text field validation:
 * Validates minimum and maximum length.
 */
export function isValidTextField(text: string, minLength = 2, maxLength = 150): boolean {
	if (!text) return false;
	const trimmed = text.trim();
	return trimmed.length >= minLength && trimmed.length <= maxLength;
}

export function getTextValidationError(text: string, fieldName = "Field", minLength = 2, required = true): string | null {
	const trimmed = text ? text.trim() : "";
	if (!trimmed) {
		return required ? `${fieldName} is required.` : null;
	}
	if (trimmed.length < minLength) {
		return `${fieldName} must be at least ${minLength} characters.`;
	}
	return null;
}

/**
 * Name field validation:
 * Only characters (letters), spaces, hyphens, and apostrophes are allowed (no numbers or special symbols).
 */
export function isValidName(name: string): boolean {
	if (!name || !name.trim()) return false;
	const trimmed = name.trim();
	// Unicode letter support: \p{L}, spaces, hyphens, apostrophes, dots
	return /^[\p{L}\s'.-]+$/u.test(trimmed);
}

export function getNameValidationError(name: string, required = false): string | null {
	const trimmed = name ? name.trim() : "";
	if (!trimmed) {
		return required ? "Name is required." : null;
	}
	if (trimmed.length < 2) {
		return "Name must be at least 2 characters.";
	}
	if (!isValidName(trimmed)) {
		return "Name should only contain letters, spaces, hyphens, or apostrophes.";
	}
	return null;
}

/**
 * Helper to sanitize input to only allow character/letter-based text
 * (letters, spaces, hyphens, apostrophes, commas, dots, slashes, ampersands, parentheses).
 */
export function sanitizeToCharactersOnly(value: string, allowExtendedPunctuation = false): string {
	if (!value) return "";
	if (allowExtendedPunctuation) {
		// For titles/degrees/organizations (e.g. "B.Tech", "AT&T", "R&D", "VP (Design)")
		return value.replace(/[^\p{L}\s'.,&/()\-]/gu, "");
	}
	// For names (letters, spaces, hyphens, apostrophes, dots)
	return value.replace(/[^\p{L}\s'.-]/gu, "");
}

/**
 * Checks if a string contains numbers or prohibited characters when only characters are allowed.
 */
export function hasNoNumbers(value: string): boolean {
	if (!value) return true;
	return !/\d/.test(value);
}

/**
 * Validates text fields that should only contain characters/letters (no numbers).
 */
export function getCharacterOnlyValidationError(text: string, fieldName = "Field", minLength = 2, required = true): string | null {
	const trimmed = text ? text.trim() : "";
	if (!trimmed) {
		return required ? `${fieldName} is required.` : null;
	}
	if (trimmed.length < minLength) {
		return `${fieldName} must be at least ${minLength} characters.`;
	}
	if (/\d/.test(trimmed)) {
		return `${fieldName} should only contain letters/characters (no numbers).`;
	}
	return null;
}

/**
 * Date / Period validation:
 * Checks for common sensible formats, e.g. "2020 - 2024", "Jul 2023 - Present", "2022", "May 2021", etc.
 */
export function isValidDatePeriod(period: string): boolean {
	if (!period || !period.trim()) return true; // optional
	const trimmed = period.trim();
	// Must contain at least a 4-digit year or standard month/year representation and sensible length
	if (trimmed.length < 4 || trimmed.length > 50) return false;
	const hasYear = /\b(19\d{2}|20\d{2})\b/.test(trimmed);
	const hasPresent = /\b(present|current|ongoing)\b/i.test(trimmed);
	return hasYear || hasPresent;
}

export function getDatePeriodValidationError(period: string, required = false): string | null {
	const trimmed = period ? period.trim() : "";
	if (!trimmed) {
		return required ? "Date / Period is required." : null;
	}
	if (!isValidDatePeriod(trimmed)) {
		return "Please enter a valid date or period (e.g. 2021 - 2024 or Jul 2023 - Present).";
	}
	return null;
}

/**
 * CGPA / Percentage score validation for education:
 */
export function isValidScore(score: string): boolean {
	if (!score || !score.trim()) return true;
	const trimmed = score.trim();
	// Extract numerical part
	const numMatch = trimmed.match(/(\d+(\.\d+)?)/);
	if (!numMatch) return false;
	const val = parseFloat(numMatch[1]);
	// Range: 0 to 100 for percentages, or 0 to 10 for CGPA
	return val >= 0 && val <= 100;
}

export function getScoreValidationError(score: string): string | null {
	const trimmed = score ? score.trim() : "";
	if (!trimmed) return null;
	if (!isValidScore(trimmed)) {
		return "Please enter a valid score (e.g. 8.5 CGPA or 85%).";
	}
	return null;
}
