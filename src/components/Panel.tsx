import { Button } from "@nextui-org/react";
import { useContext } from "react";
import { UserSettingsContext } from "../globalContexts";
import { currencies, distanceUnits } from "../static";
import { PanelConfig } from "../types";

export default function Panel({ config }: { config: PanelConfig }) {
	const { userSettings } = useContext(UserSettingsContext);

	let buttonText: string = "";
	let colour: "primary" | "success" | "danger" = "primary";

	if (config.defined) {
		let sign: boolean = (config.value ?? 0) >= 0;
		let value: number = Math.abs(config.value ?? 0);

		if (config.type == "currency") {
			buttonText = `${sign ? "+" : "-"}${currencies[userSettings.currency]}${value.toFixed(2)}`;
			colour = sign ? "success" : "danger";
		} else if (config.type == "distance") {
			buttonText = `${sign ? "+" : "-"}${value.toFixed(userSettings.distanceDecimals)}${
				distanceUnits[userSettings.distanceUnit]
			}`;
			colour = sign ? "danger" : "success";
		}
	} else {
		buttonText = `Other ${
			config.type == "currency" ? currencies[userSettings.currency] : distanceUnits[userSettings.distanceUnit]
		}`;
		colour = "primary";
	}

	return (
		<div className="relative w-full aspect-square">
			<Button className="h-full w-full" color={colour} variant="flat">
				<p className="text-2xl">{buttonText}</p>
			</Button>
		</div>
	);
}
