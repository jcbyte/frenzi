import { Button } from "@nextui-org/button";
import { IconBrandGoogleFilled } from "@tabler/icons-react";
import MyNavbar from "./MyNavbar";
import { signInFirebaseGoogle } from "./firestore/firebase";

export default function LoginPage() {
	return (
		<>
			<MyNavbar settingsDisabled />
			<div className="w-full flex justify-center p-10">
				<Button
					color="primary"
					variant="flat"
					startContent={<IconBrandGoogleFilled />}
					onClick={signInFirebaseGoogle}
					size="lg"
					radius="full"
					// className="flex flex-row min-h-screen justify-center items-center"
				>
					Sign in with Google
				</Button>
			</div>
		</>
	);
}
