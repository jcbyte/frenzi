import { Card } from "@nextui-org/react";
import { useContext } from "react";
import { UserPanelsContext } from "../globalContexts";
import { PanelConfig } from "../types";
import Panel from "./Panel";

export default function PanelGrid({
	asSkeleton = false,
	handleTryApplyPanel,
	extraPanels,
	handleOpenExtraPanel,
}: {
	asSkeleton?: boolean;
	handleTryApplyPanel: (config: PanelConfig) => void;
	extraPanels: PanelConfig[];
	handleOpenExtraPanel: (config: PanelConfig) => void;
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
				{extraPanels.map((config, i) => (
					<Panel
						key={userPanels.length + i}
						config={config}
						onPress={(config) => {
							handleOpenExtraPanel(config);
						}}
					/>
				))}
			</Card>
		</>
	);
}
