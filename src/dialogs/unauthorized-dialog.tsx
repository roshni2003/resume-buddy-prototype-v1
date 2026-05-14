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
import { redirectToZuvyLogin } from "@/utils/zuvy-redirect";

export function UnauthorizedDialog() {
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const handleUnauthorized = () => {
			setIsOpen(true);
		};

		window.addEventListener("app:unauthorized", handleUnauthorized);
		return () => {
			window.removeEventListener("app:unauthorized", handleUnauthorized);
		};
	}, []);

	const handleAction = () => {
		setIsOpen(false);
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
