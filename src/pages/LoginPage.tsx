import { Button } from "@nextui-org/button";
import { IconBrandGoogleFilled } from "@tabler/icons-react";
import toast from "react-hot-toast";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { isAuth, signInFirebaseGoogle } from "../firestore/firebase";

// Function to try and sign in using google with toast feedback
function tryGoogleSignIn(navigate: NavigateFunction) {
	var signInPromise = signInFirebaseGoogle();
	toast.promise(signInPromise, {
		loading: "Signing in",
		success: "Signed in",
		error: (err) => `Could not sign in: ${err.message}`,
	});
	// Once logged in then redirect to dashboard
	signInPromise
		.then(() => {
			navigate("/");
		})
		.catch((err) => {});
}

export default function LoginPage() {
	const navigate = useNavigate();

	return (
		<>
			<div className="w-full flex justify-center p-10">
				{isAuth() ? (
					// If the user is already signed in then show a continue to app button
					<Button
						color="primary"
						onClick={() => {
							navigate("/");
						}}
						size="lg"
					>
						Continue to app
					</Button>
				) : (
					// If the user is not signed in show a sign in button
					<Button
						color="primary"
						variant="flat"
						startContent={<IconBrandGoogleFilled />}
						onClick={() => {
							tryGoogleSignIn(navigate);
						}}
						size="lg"
						radius="full"
					>
						Sign in with Google
					</Button>
				)}
			</div>
		</>
	);
}
