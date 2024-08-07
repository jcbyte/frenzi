import { Card, Skeleton } from "@nextui-org/react";
import { useContext } from "react";
import { UserSettingsContext } from "../globalContexts";
import { readableSignedBalance, readableSignedDistance } from "../tools/utils";
import { UserSettings } from "../types";

// Component displaying an unpaid balance and distance
export default function UnpaidCard({
	asSkeleton = false,
	distance,
	overrideSettings,
}: {
	asSkeleton?: boolean;
	distance: number;
	overrideSettings?: UserSettings;
}) {
	const { userSettings: currentUserSettings } = useContext(UserSettingsContext);
	// (derived state)
	let userSettings: UserSettings = overrideSettings ?? currentUserSettings;

	return (
		<Card className="p-4 w-fit min-w-80">
			<div className="flex gap-8 items-end">
				<div>
					<p className="text-base mb-1">Unpaid balance</p>

					<Skeleton isLoaded={!asSkeleton} className="rounded-lg">
						<p className="text-5xl">
							{readableSignedBalance(distance * userSettings.costPerDistance, userSettings.currency)}
						</p>
					</Skeleton>
				</div>
				<div>
					<p className="text-base mb-1">Unpaid distance</p>
					<Skeleton isLoaded={!asSkeleton} className="rounded-lg">
						<p className="text-2xl">
							{readableSignedDistance(distance, userSettings.distanceUnit, userSettings.distanceDecimals)}
						</p>
					</Skeleton>
				</div>
			</div>
		</Card>
	);
}
