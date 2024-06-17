import { Card } from "@nextui-org/react";
import { useContext } from "react";
import { AppContext } from "../App";

export default function UnpaidCard({ balance, distance }: { balance: number; distance: number }) {
	const { userSettings } = useContext(AppContext);

	return (
		<Card className="p-4 w-fit min-w-80">
			<div className="flex gap-8 items-end">
				<div>
					<p className="text-base">Unpaid balance</p>
					<p className="text-5xl">
						{userSettings.currencySymbol}
						{balance.toFixed(2)}
					</p>
				</div>
				<div>
					<p className="text-base">Unpaid distance</p>
					<p className="text-2xl">
						{distance.toFixed(userSettings.distanceDecimals)}
						{userSettings.distanceSymbol}
					</p>
				</div>
			</div>
		</Card>
	);
}
