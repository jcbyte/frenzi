import { Button } from "@nextui-org/button";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import PeopleList from "../components/PeopleList";
import UnpaidCard from "../components/UnpaidCard";
import { getDistanceData } from "../firestore/db";
import { UserSettingsContext } from "../globalContexts";

export default function DashboardPage() {
	const navigate = useNavigate();

	const { userSettings, setUserSettings } = useContext(UserSettingsContext);

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

			<Button
				onClick={() => {
					setUserSettings({ ...userSettings, distanceDecimals: userSettings.distanceDecimals + 1 });
				}}
			>
				{userSettings.distanceDecimals}
			</Button>
		</>
	);
}
