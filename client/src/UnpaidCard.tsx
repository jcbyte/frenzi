import { Card } from "@nextui-org/react";
import { currencyDecimals, currencySymbol, distanceDecimals, distanceSymbol } from "./globals";

export default function UnpaidCard({ balance, distance }: { balance: number; distance: number }) {
	return (
		<Card className="p-4">
			<div className="flex gap-8 items-end">
				<div>
					<p className="text-base">Unpaid balance</p>
					<p className="text-5xl">
						{currencySymbol}
						{balance.toFixed(currencyDecimals)}
					</p>
				</div>
				<div>
					<p className="text-base">Unpaid miles</p>
					<p className="text-2xl">
						{distance.toFixed(distanceDecimals)}
						{distanceSymbol}
					</p>
				</div>
			</div>
		</Card>
	);
}
