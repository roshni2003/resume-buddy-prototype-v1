import { useEffect, useState } from "react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { UNAUTHORIZED_EVENT, UNAUTHORIZED_FLAG_KEY } from "@/utils/api";
import { clearAuthToken } from "@/utils/auth-token";
import { redirectToZuvyLogin } from "@/utils/zuvy-redirect";

export function UnauthorizedDialog() {
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const openUnauthorizedDialog = () => {
			// This handler is only invoked from the backend 401 signal (event/flag),
			// meaning a token *was sent* and *was rejected*.
			setIsOpen(true);
		};

		// 1) If an unauthorized happened before this component mounted, show it immediately.
		try {
			if (window.sessionStorage.getItem(UNAUTHORIZED_FLAG_KEY) === "1") {
				openUnauthorizedDialog();
			}
		} catch {
			// ignore
		}

		// Note: we *don't* auto-open just because a token is syntactically invalid.
		// We only open after the backend rejects a sent token (event/flag). Otherwise we'd show
		// the modal even before any request happens.

		window.addEventListener(UNAUTHORIZED_EVENT, openUnauthorizedDialog);
		return () => {
			window.removeEventListener(UNAUTHORIZED_EVENT, openUnauthorizedDialog);
		};
	}, []);

	const handleAction = () => {
		setIsOpen(false);
		try {
			window.sessionStorage.removeItem(UNAUTHORIZED_FLAG_KEY);
		} catch {
			// ignore
		}
		// Clear stored token so we don't keep sending a rejected token.
		clearAuthToken();
		redirectToZuvyLogin();
	};

	return (
		<AlertDialog open={isOpen} onOpenChange={setIsOpen}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Session Expired</AlertDialogTitle>
					<AlertDialogDescription>
						Your session has expired. To continue creating and saving your resume, please sign in again.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogAction onClick={handleAction}>Sign in with Zuvy</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
