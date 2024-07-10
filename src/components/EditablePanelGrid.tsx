import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Select,
	SelectItem,
	useDisclosure,
} from "@nextui-org/react";
import { useContext, useState } from "react";
import { UserSettingsContext } from "../globalContexts";
import { currencies, distanceUnits } from "../static";
import { roundTo } from "../tools/utils";
import { ExtraPanelType, PanelConfig, PanelConfigType } from "../types";
import PanelGrid from "./PanelGrid";

const extraPanels: ExtraPanelType[] = ["new"];

// TODO modals and handler functions

function preparePanelModal(
	config: PanelConfig,
	setPanelModalType: React.Dispatch<React.SetStateAction<PanelConfigType>>,
	setPanelModalValue: React.Dispatch<React.SetStateAction<number | undefined>>,
	setPanelModalSign: React.Dispatch<React.SetStateAction<boolean>>,
	onOpenPanelModal: () => void
) {
	if (config.extra) {
		throw new Error("Cannot prepare for an `extra` panel");
	}

	setPanelModalType(config.type as PanelConfigType);
	setPanelModalValue(config.value);
	setPanelModalSign(config.value > 0);
	onOpenPanelModal();
}

export default function EditablePanelGrid({ asSkeleton = false }: { asSkeleton?: boolean }) {
	const { userSettings } = useContext(UserSettingsContext);

	const [panelModalType, setPanelModalType] = useState<PanelConfigType>("currency");
	const [panelModalValue, setPanelModalValue] = useState<number | undefined>(undefined);
	const [panelModalPositive, setPanelModalSign] = useState<boolean>(true);
	const {
		isOpen: isPanelModalOpen,
		onOpen: onOpenPanelModal,
		onClose: onClosePanelModal,
		onOpenChange: onOpenChangePanelModal,
	} = useDisclosure();

	return (
		<>
			<PanelGrid
				asSkeleton={asSkeleton}
				handleTryApplyPanel={(config: PanelConfig, i: number) => {
					preparePanelModal(config, setPanelModalType, setPanelModalValue, setPanelModalSign, onOpenPanelModal);
				}}
				extraPanels={extraPanels.map((type: ExtraPanelType) => {
					return { extra: true, type: type };
				})}
				handleOpenExtraPanel={(config: PanelConfig) => {
					console.log(config);
					// prepareExtraPanel(config, setOtherModalType, setOtherModalValue, setOtherModalSign, onOpenOtherModal);
				}}
			/>

			<Modal
				isOpen={isPanelModalOpen}
				onOpenChange={onOpenChangePanelModal}
				placement="center"
				backdrop="blur"
				className="dark text-foreground"
			>
				<ModalContent>
					<ModalHeader>Modify Panel</ModalHeader>
					<ModalBody>
						<Select
							label="Balance/Distance"
							popoverProps={{ className: "dark text-foreground" }}
							selectedKeys={[panelModalType]}
							// onChange={(newValue) => {
							// 	setUserPanels((prev) => {
							// 		let newUserPanels: PanelConfig[] = prev.map((panelConfig, i) => {
							// 			return i != rowNum ? panelConfig : { ...panelConfig, type: newValue.target.value as PanelConfigType };
							// 		});
							// 		return newUserPanels;
							// 	});
							//}}
						>
							{/* List out the valid distance units defined in `static.ts` */}
							<SelectItem key={"currency"}>Balance</SelectItem>
							<SelectItem key={"distance"}>Distance</SelectItem>
						</Select>
						<div className="flex items-center gap-1">
							<Button
								className="min-w-0 aspect-square"
								variant="flat"
								color={
									(panelModalType === "currency" && panelModalPositive) ||
									(panelModalType === "distance" && !panelModalPositive)
										? "success"
										: "danger"
								}
								onClick={() => {
									setPanelModalSign((prev) => !prev);
								}}
							>
								<p className="text-lg">{panelModalPositive ? "+" : "-"}</p>
							</Button>
							<Input
								label={panelModalType === "currency" ? "Balance" : "Distance"}
								type="number"
								min={0}
								className="w-fit min-w-80"
								value={panelModalValue ? String(panelModalValue) : ""}
								startContent={panelModalType === "currency" ? currencies[userSettings.currency] : undefined}
								endContent={panelModalType === "distance" ? distanceUnits[userSettings.distanceUnit] : undefined}
								onValueChange={(newValue) => {
									if (newValue) {
										let roundedValue = roundTo(
											newValue,
											panelModalType === "currency" ? 2 : userSettings.distanceDecimals
										);
										if (roundedValue < 0) {
											setPanelModalSign(false);
										}
										setPanelModalValue(Math.abs(roundedValue));
									} else {
										setPanelModalValue(undefined);
									}
								}}
							/>
						</div>
					</ModalBody>
					<ModalFooter>
						<Button color="danger" variant="flat" onPress={onClosePanelModal}>
							Close
						</Button>
						<Button
							color="primary"
							variant="flat"
							onPress={() => {
								// Try to update the person
								// handleTryApplyPanel(
								// 	{
								// 		extra: false,
								// 		type: panelModalConfig,
								// 		value: (panelModalValue ?? 0) * (panelModalPositive ? 1 : -1),
								// 	} as PanelConfig,
								// 	person,
								// 	setPeopleData,
								// 	userSettings,
								// 	onClosePanelModal
								// );
								console.log("udgfb");
							}}
						>
							Save
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}
