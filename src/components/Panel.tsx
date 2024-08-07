import { Button, Skeleton } from "@nextui-org/react";
import { useContext } from "react";
import { UserSettingsContext } from "../globalContexts";
import { getExtraPanelName, readableSignedBalance, readableSignedDistance } from "../tools/utils";
import { PanelConfig } from "../types";

export default function Panel({
	asSkeleton = false,
	config,
	onPress,
}: {
	asSkeleton?: boolean;
	config: PanelConfig;
	onPress: (config: PanelConfig) => void;
}) {
	const { userSettings } = useContext(UserSettingsContext);

	// Create the button text and colour from the config provided
	let buttonText: string = "";
	let colour: "primary" | "success" | "danger" | "default" = "default";
	let labelText: string | undefined = undefined;

	if (!asSkeleton) {
		if (config.extra) {
			buttonText = getExtraPanelName(config.type, userSettings.currency, userSettings.distanceUnit);
			colour = "primary";
		} else {
			let sign: boolean = config.value >= 0;

			if (config.type === "currency") {
				buttonText = readableSignedBalance(config.value, userSettings.currency, undefined, true);
				colour = sign ? "success" : "danger";
			} else if (config.type === "distance") {
				buttonText = readableSignedDistance(
					config.value,
					userSettings.distanceUnit,
					userSettings.distanceDecimals,
					true
				);
				colour = sign ? "danger" : "success";
			}

			labelText = config.label;
		}
	}

	return (
		<>
			{asSkeleton ? (
				// Skeleton around the button can cause issues so instead we make a standalone skeleton
				<Skeleton className="w-full aspect-square rounded-xl" />
			) : (
				<div className="relative w-full max-w-36 aspect-square">
					<Button
						className="h-full w-full"
						color={colour}
						variant="flat"
						onPress={() => {
							onPress(config);
						}}
					>
						<div>
							<p className="text-2xl">{buttonText}</p>
							{labelText && <p className="text-xs text-wrap">{labelText}</p>}
						</div>
					</Button>
				</div>
			)}
		</>
	);
}
