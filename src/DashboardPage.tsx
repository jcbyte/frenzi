import { Button } from "@nextui-org/button";
import toast from "react-hot-toast";
import PeopleList from "./PeopleList";
import UnpaidCard from "./UnpaidCard";
import { testfb } from "./firestore/db";
import { signOutFirebase } from "./firestore/firebase";

export default function DashboardPage() {
	return (
		<>
			<div className="flex justify-center w-full">
				<div className="p-4 flex flex-col gap-2">
					<UnpaidCard balance={10.4} distance={46} />
					<PeopleList />
				</div>
			</div>

			<Button onClick={testfb} color="primary">
				test fb
			</Button>

			<Button onClick={() => toast.success("Here is your toast.")} color="primary">
				test toaster
			</Button>

			<Button onClick={signOutFirebase} color="primary">
				test logout
			</Button>
		</>
	);
}
