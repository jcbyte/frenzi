import { PanelConfig } from "../types";
import PanelGrid from "./PanelGrid";

export default function EditablePanelGrid({ asSkeleton = false }: { asSkeleton?: boolean }) {
	return (
		<>
			<PanelGrid
				asSkeleton={asSkeleton}
				handleTryApplyPanel={(config: PanelConfig) => {
					console.log("s");
					//handleTryApplyPanel(config, person, setPeopleData, userSettings);
				}}
				handleOpenOtherPanel={(config: PanelConfig) => {
					console.log("d");
					//prepareOtherPanel(config, setOtherModalType, setOtherModalValue, setOtherModalSign, onOpenOtherModal);
				}}
			/>
		</>
	);
}
