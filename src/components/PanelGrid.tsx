import { Card } from "@nextui-org/react";
import { PanelConfig, PersonData } from "../types";
import Panel from "./Panel";

// TODO user configure panels
const panels: PanelConfig[] = [
	{ defined: true, type: "currency", value: 10 },
	{ defined: true, type: "currency", value: -100 },
	{ defined: true, type: "distance", value: 6.6 },
	{ defined: true, type: "distance", value: -4 },
];

const otherPanels: PanelConfig[] = [
	{ defined: false, type: "distance" },
	{ defined: false, type: "currency" },
];

// Function to try and update the person in firestore with the updated values
function tryApplyPanel(
	config: PanelConfig,
	person: PersonData,
	setPeopleData: React.Dispatch<React.SetStateAction<PersonData[]>>
) {
	// TODO apply panel
	console.log("apply");
}

function prepareOtherPanel(config: PanelConfig) {
	// TODO other modal
	console.log("other modal");
}

// TODO skeleton layout

export default function PanelGrid({
	asSkeleton = false,
	person,
	setPeopleData,
}: {
	asSkeleton?: boolean;
	person: PersonData;
	setPeopleData: React.Dispatch<React.SetStateAction<PersonData[]>>;
}) {
	// Place each custom panel then place each mandatory panel
	return (
		<Card className="min-w-96 grid grid-cols-3 p-1 gap-1">
			{panels.map((config) => (
				<Panel
					asSkeleton={true}
					config={config}
					onPress={(config) => {
						tryApplyPanel(config, person, setPeopleData);
					}}
				/>
			))}
			{otherPanels.map((config) => (
				<Panel
					config={config}
					onPress={(config) => {
						prepareOtherPanel(config);
					}}
				/>
			))}
		</Card>
	);
}
