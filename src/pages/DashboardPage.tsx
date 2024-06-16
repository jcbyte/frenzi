import { Button } from "@nextui-org/button";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import PeopleList from "../components/PeopleList";
import UnpaidCard from "../components/UnpaidCard";
import { getDistanceData } from "../firestore/db";
import { signOutFirebase } from "../firestore/firebase";

export default function DashboardPage() {
	const navigate = useNavigate();

	return (
		<>
			<div className="flex justify-center w-full">
				<div className="p-4 flex flex-col gap-2">
					<UnpaidCard balance={10.4} distance={46} />
					<PeopleList />
				</div>
			</div>

			<Button
				onClick={() => {
					getDistanceData()
						.then((data) => {
							console.log(data);
						})
						.catch((err) => {
							console.log(err);
						});
				}}
				color="primary"
			>
				test fb
			</Button>

			<Button onClick={() => toast.success("Here is your toast.")} color="primary">
				test toaster
			</Button>

			<Button onClick={signOutFirebase} color="primary">
				test logout
			</Button>

			<Button
				onClick={() => {
					navigate("/login");
				}}
				color="primary"
			>
				goto login
			</Button>
		</>
	);
}
