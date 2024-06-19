import PeopleList from "../components/PeopleList";
import UnpaidCard from "../components/UnpaidCard";
import { DistanceData } from "../types";

export default function DashboardPage({
	distanceData,
	setDistanceData,
}: {
	distanceData: DistanceData;
	setDistanceData: React.Dispatch<React.SetStateAction<DistanceData>>;
}) {
	return (
		<>
			<div className="flex justify-center w-full">
				<div className="p-4 flex flex-col gap-2">
					<UnpaidCard balance={10.4} distance={46} />
					<PeopleList />
				</div>
			</div>
		</>
	);
}
