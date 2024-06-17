import { Card } from "@nextui-org/react";
import { settings } from "../globals";

export default function UnpaidCard({ balance, distance }: { balance: number; distance: number }) {
	return (
		<Card className="p-4 w-fit min-w-80">
			<div className="flex gap-8 items-end">
				<div>
					<p className="text-base">Unpaid balance</p>
					<p className="text-5xl">
						{settings.currencySymbol}
						{balance.toFixed(2)}
					</p>
				</div>
				<div>
					<p className="text-base">Unpaid distance</p>
					<p className="text-2xl">
						{distance.toFixed(settings.distanceDecimals)}
						{settings.distanceSymbol}
					</p>
				</div>
			</div>
		</Card>
	);
}
