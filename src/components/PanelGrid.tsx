import { Card } from "@nextui-org/react";
import { useContext } from "react";
import { UserPanelsContext } from "../globalContexts";
import { PanelConfig } from "../types";
import Panel from "./Panel";

const permanentPanels: PanelConfig[] = [
	{ type: "distance", value: 0 },
	{ type: "currency", value: 0 },
];
// TODO these permanent panels are specific only to main panel grid

export default function PanelGrid({
	asSkeleton = false,
	handleTryApplyPanel,
	handleOpenOtherPanel,
}: {
	asSkeleton?: boolean;
	handleTryApplyPanel: (config: PanelConfig) => void;
	handleOpenOtherPanel: (config: PanelConfig) => void;
}) {
	const { userPanels } = useContext(UserPanelsContext);

	// Place each custom panel then place each permanent panel
	return (
		<>
			<Card className="min-w-96 grid grid-cols-3 p-1 gap-1">
				{userPanels.map((config, i) => (
					<Panel
						key={i}
						asSkeleton={asSkeleton}
						config={config}
						onPress={(config) => {
							handleTryApplyPanel(config);
						}}
					/>
				))}
				{permanentPanels.map((config, i) => (
					<Panel
						key={userPanels.length + i}
						config={config}
						defined={false}
						onPress={(config) => {
							handleOpenOtherPanel(config);
						}}
					/>
				))}
			</Card>
		</>
	);
}
