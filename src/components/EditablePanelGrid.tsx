import { ExtraPanelType, PanelConfig } from "../types";
import PanelGrid from "./PanelGrid";

const extraPanels: ExtraPanelType[] = ["new"];

export default function EditablePanelGrid({ asSkeleton = false }: { asSkeleton?: boolean }) {
	return (
		<>
			<PanelGrid
				asSkeleton={asSkeleton}
				handleTryApplyPanel={(config: PanelConfig) => {
					console.log(config);
					// handleTryApplyPanel(config, person, setPeopleData, userSettings);
				}}
				extraPanels={extraPanels.map((type: ExtraPanelType) => {
					return { extra: true, type: type };
				})}
				handleOpenExtraPanel={(config: PanelConfig) => {
					console.log(config);
					// prepareExtraPanel(config, setOtherModalType, setOtherModalValue, setOtherModalSign, onOpenOtherModal);
				}}
			/>
		</>
	);
}
