import { Button } from "@nextui-org/button";
import PeopleList from "../components/PeopleList";
import UnpaidCard from "../components/UnpaidCard";
import { getUserSettings } from "../firestore/db";

export default function DashboardPage() {
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
					getUserSettings()
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
