import { useContext } from "react";
import PeopleList from "../components/PeopleList";
import UnpaidCard from "../components/UnpaidCard";
import { UserSettingsContext } from "../globalContexts";
import { DistanceData } from "../types";

function getTotalDistance(distanceData: DistanceData): number {
	var distances = Object.values(distanceData);
	return distances.length > 0 ? distances.reduce((acc, x) => acc + x) : 0;
}

export default function DashboardPage({
	distanceData,
	setDistanceData,
}: {
	distanceData: DistanceData;
	setDistanceData: React.Dispatch<React.SetStateAction<DistanceData>>;
}) {
	const { userSettings } = useContext(UserSettingsContext);

	return (
		<>
			<div className="flex justify-center w-full">
				<div className="p-4 flex flex-col gap-2">
					<UnpaidCard
						balance={getTotalDistance(distanceData) * userSettings.costPerDistance}
						distance={getTotalDistance(distanceData)}
					/>
					<PeopleList distanceData={distanceData} />
				</div>
			</div>
		</>
	);
}

// ! there is issue where it doesn't show values on first load?
