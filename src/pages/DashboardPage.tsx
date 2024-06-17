import { Button } from "@nextui-org/button";
import { useNavigate } from "react-router-dom";
import PeopleList from "../components/PeopleList";
import UnpaidCard from "../components/UnpaidCard";
import { getDistanceData } from "../firestore/db";

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
		</>
	);
}
