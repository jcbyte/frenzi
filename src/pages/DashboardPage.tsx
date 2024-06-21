import { useContext } from "react";
import PeopleList from "../components/PeopleList";
import UnpaidCard from "../components/UnpaidCard";
import { UserSettingsContext } from "../globalContexts";
import { FriendData } from "../types";

// Function to calculate the total distance by adding up each friends distance
function getTotalDistance(friendData: FriendData[]): number {
	return friendData.length > 0 ? friendData.map((friend) => friend.distance).reduce((acc, x) => acc + x) : 0;
}

export default function DashboardPage({
	asSkeleton = false,
	friendData,
}: {
	asSkeleton: boolean;
	friendData: FriendData[];
}) {
	const { userSettings } = useContext(UserSettingsContext);

	return (
		<>
			<div className="flex justify-center w-full">
				<div className="p-4 flex flex-col gap-2">
					<UnpaidCard
						asSkeleton={asSkeleton}
						balance={getTotalDistance(friendData) * userSettings.costPerDistance}
						distance={getTotalDistance(friendData)}
					/>
					<PeopleList asSkeleton={asSkeleton} friendData={friendData} />
				</div>
			</div>
		</>
	);
}
