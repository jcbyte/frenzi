import { Card } from "@nextui-org/react";
import { PanelConfig } from "../types";
import Panel from "./Panel";

// TODO user configure panels
const panels: PanelConfig[] = [
	{ defined: true, type: "currency", value: 10 },
	{ defined: true, type: "currency", value: -10 },
	{ defined: true, type: "distance", value: 3 },
	{ defined: true, type: "distance", value: -10 },
];

// TODO apply panel

export default function PanelGrid() {
	return (
		<Card className="min-w-96 grid grid-cols-3 p-1 gap-1">
			{panels.map((config) => (
				<Panel config={config} />
			))}
			<Panel config={{ defined: false, type: "distance" }} />
			<Panel config={{ defined: false, type: "currency" }} />
		</Card>
	);
}
