import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ApiKeyDialogProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

export const ApiKeyDialog = ({ open, onOpenChange }: ApiKeyDialogProps) => {
	const { i18n } = useLingui();
	const [apiKey, setApiKey] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [currentKey, setCurrentKey] = useState<string | null>(null);

	// Load current key when dialog opens
	useEffect(() => {
		if (open) {
			const savedKey = localStorage.getItem("gemini_api_key");
			console.log(
				"Dialog opened - Current key in localStorage:",
				savedKey ? savedKey.substring(0, 15) + "..." : "NONE",
			);
			setCurrentKey(savedKey);
			// Clear the input field when opening
			setApiKey("");
		}
	}, [open]);

	const handleSubmit = async () => {
		if (!apiKey.trim()) {
			alert(
				i18n._(
					t({
						id: "dashboard.api-key.error.missing-key",
						message: "Please enter an API key",
					}),
				),
			);
			return;
		}

		setIsLoading(true);
		try {
			// Check if localStorage is available
			if (typeof localStorage === "undefined") {
				throw new Error("localStorage is not available");
			}

			// Store the API key in localStorage
			localStorage.setItem("gemini_api_key", apiKey);

			// Verify it was saved
			const savedKey = localStorage.getItem("gemini_api_key");
			if (!savedKey || savedKey !== apiKey) {
				throw new Error("Failed to save key to localStorage - verification failed");
			}

			// Log for debugging
			console.log("✅ API Key saved to localStorage:", apiKey.substring(0, 10) + "...");
			console.log("✅ Verification - Key in localStorage:", savedKey.substring(0, 10) + "...");

			// Close the dialog
			onOpenChange(false);

			// Reset the input
			setApiKey("");

			// Show success message and reload page to clear cached AI instances
			alert(
				i18n._(
					t({
						id: "dashboard.api-key.success.save",
						message: "API Key saved successfully! The page will reload to apply changes.",
					}),
				),
			);

			// Small delay before reload to ensure localStorage is updated
			setTimeout(() => {
				window.location.reload();
			}, 100);
		} catch (error) {
			console.error("❌ Error saving API key:", error);
			const errorMsg = error instanceof Error ? error.message : "Unknown error";
			alert(i18n._(t({ id: "dashboard.api-key.error.save", message: "Failed to save API key" })) + `: ${errorMsg}`);
		} finally {
			setIsLoading(false);
		}
	};

	const handleClearKey = () => {
		try {
			// Remove the API key
			localStorage.removeItem("gemini_api_key");

			// Verify it was removed
			const check = localStorage.getItem("gemini_api_key");
			console.log("After removal, key is:", check);

			// Update state
			setCurrentKey(null);

			// Show success message
			alert(
				i18n._(
					t({
						id: "dashboard.api-key.success.clear",
						message: "API Key cleared! The page will reload to apply changes.",
					}),
				),
			);

			// Small delay before reload to ensure localStorage is updated
			setTimeout(() => {
				window.location.reload();
			}, 100);
		} catch (error) {
			console.error("Error clearing API key:", error);
			alert(i18n._(t({ id: "dashboard.api-key.error.clear", message: "Failed to clear API key" })));
		}
	};

	const testLocalStorage = () => {
		try {
			// Test write
			localStorage.setItem("test_key", "test_value");
			const testRead = localStorage.getItem("test_key");
			localStorage.removeItem("test_key");

			if (testRead === "test_value") {
				alert("✅ localStorage is working correctly!");
				console.log("localStorage test passed");
			} else {
				alert("⚠️ localStorage read/write failed");
				console.error("localStorage test failed");
			}
		} catch (error) {
			alert("❌ localStorage is not available: " + error);
			console.error("localStorage error:", error);
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>
						{i18n._(t({ id: "dashboard.api-key.dialog.title", message: "Set Gemini API Key" }))}
					</DialogTitle>
				</DialogHeader>

				<div className="space-y-4">
					{currentKey && (
						<div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3">
							<p className="font-medium text-sm text-yellow-800">
								{i18n._(
									t({
										id: "dashboard.api-key.dialog.current-key",
										message: "Current API Key",
									}),
								)}
							</p>
							<p className="font-mono text-gray-600 text-xs">{currentKey.substring(0, 15)}...</p>
							<Button variant="outline" size="sm" onClick={handleClearKey} className="mt-2">
								{i18n._(
									t({
										id: "dashboard.api-key.dialog.clear-button",
										message: "Clear Current Key",
									}),
								)}
							</Button>
						</div>
					)}

					<div className="space-y-2">
						<Label htmlFor="api-key">
							{i18n._(
								t({
									id: "dashboard.api-key.dialog.input-label",
									message: "Enter your Gemini API Key",
								}),
							)}
						</Label>
						<Input
							id="api-key"
							type="password"
							placeholder="AIzaSy..."
							value={apiKey}
							onChange={(e) => setApiKey(e.target.value)}
							className="w-full"
						/>
						<p className="text-gray-500 text-xs">
							{i18n._(
								t({
									id: "dashboard.api-key.dialog.input-help",
									message: "This key will be stored locally in your browser and used for AI features.",
								}),
							)}
						</p>
					</div>
				</div>

				<DialogFooter>
					<Button variant="outline" onClick={() => onOpenChange(false)}>
						{i18n._(t`Cancel`)}
					</Button>
					<Button onClick={handleSubmit} disabled={!apiKey.trim() || isLoading}>
						{isLoading
							? i18n._(t({ id: "dashboard.api-key.dialog.saving", message: "Saving..." }))
							: i18n._(t({ id: "dashboard.api-key.dialog.use-button", message: "Use This" }))}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
