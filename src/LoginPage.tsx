import { Button } from "@nextui-org/button";
import { IconBrandGoogleFilled } from "@tabler/icons-react";
import { signInFirebaseGoogle } from "./firestore/firebase";

export default function LoginPage() {
	return (
		<>
			<div className="w-full flex justify-center p-10">
				<Button
					color="primary"
					variant="flat"
					startContent={<IconBrandGoogleFilled />}
					onClick={signInFirebaseGoogle}
					size="lg"
					radius="full"
				>
					Sign in with Google
				</Button>
			</div>
		</>
	);
}
