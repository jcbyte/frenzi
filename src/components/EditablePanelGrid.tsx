import { ExtraPanelType, PanelConfig } from "../types";
import PanelGrid from "./PanelGrid";

const extraPanels: ExtraPanelType[] = ["new"];

// TODO modals and handler functions

export default function EditablePanelGrid({ asSkeleton = false }: { asSkeleton?: boolean }) {
	return (
		<>
			<PanelGrid
				asSkeleton={asSkeleton}
				handleTryApplyPanel={(config: PanelConfig, i: number) => {
					console.log(config, i);
					// handleTryApplyPanel(config, person, setPeopleData, userSettings);
				}}
				extraPanels={extraPanels.map((type: ExtraPanelType) => {
					return { extra: true, type: type };
				})}
				handleOpenExtraPanel={(config: PanelConfig, i: number) => {
					console.log(config, i);
					// prepareExtraPanel(config, setOtherModalType, setOtherModalValue, setOtherModalSign, onOpenOtherModal);
				}}
			/>
		</>
	);
}
