import { Button } from "@nextui-org/button";
import { IconBrandGoogleFilled } from "@tabler/icons-react";
import toast from "react-hot-toast";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { signInFirebaseGoogle } from "../firestore/firebase";

function tryGoogleSignIn(navigate: NavigateFunction) {
	var signInPromise = signInFirebaseGoogle();
	toast.promise(signInPromise, {
		loading: "Signing in",
		success: "Signed in",
		error: (err) => `Could not sign in: ${err}`,
	});
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
			</div>
		</>
	);
}
