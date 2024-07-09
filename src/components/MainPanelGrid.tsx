import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from "@nextui-org/react";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { updatePersonData } from "../firestore/db";
import { UserSettingsContext } from "../globalContexts";
import { currencies, distanceUnits } from "../static";
import { roundTo } from "../tools/utils";
import { ExtraPanelType, PanelConfig, PersonData, UserSettings } from "../types";
import PanelGrid from "./PanelGrid";

const extraPanels: ExtraPanelType[] = ["distance", "currency"];

// Function to try and update the person in firestore with the updated values
async function tryApplyPanel(
	config: PanelConfig,
	person: PersonData,
	setPeopleData: React.Dispatch<React.SetStateAction<PersonData[]>>,
	userSettings: UserSettings
) {
	if (config.extra) {
		throw new Error("Cannot apply `extra` panel");
	}

	// Try and update firestore if accepted then update the local variable
	let distanceChange: number = config.type == "currency" ? -config.value / userSettings.costPerDistance : config.value;
	let newPersonData: PersonData = {
		...person,
		distance: roundTo(person.distance + distanceChange, userSettings.distanceDecimals),
	};
	return await updatePersonData(newPersonData)
		.then((res) => {
			setPeopleData((prev) => {
				return prev.map((personData: PersonData) => (personData.name !== person.name ? personData : newPersonData));
			});
		})
		.catch((err) => {
			throw new Error(err.message);
		});
}

// Call `tryApplyPanel` with toast user feedback
function handleTryApplyPanel(
	config: PanelConfig,
	person: PersonData,
	setPeopleData: React.Dispatch<React.SetStateAction<PersonData[]>>,
	userSettings: UserSettings,
	onCloseOtherModal?: () => void | undefined
) {
	tryApplyPanel(config, person, setPeopleData, userSettings)
		.then((res) => {
			// No need for toast feedback as this can be seen directly on card
			if (onCloseOtherModal) onCloseOtherModal();
		})
		.catch((err) => {
			toast.error(`Could not update: ${err.message}`);
		});
}

// Prepare the modal by resetting and set settings for it
function prepareExtraPanel(
	config: PanelConfig,
	setOtherModalType: React.Dispatch<React.SetStateAction<ExtraPanelType>>,
	setOtherModalValue: React.Dispatch<React.SetStateAction<number | undefined>>,
	setOtherModalSign: React.Dispatch<React.SetStateAction<boolean>>,
	onOpenOtherModal: () => void
) {
	if (!config.extra) {
		throw new Error("Cannot prepare a not `extra` panel");
	}

	setOtherModalType(config.type);
	setOtherModalValue(undefined);
	setOtherModalSign(true);
	onOpenOtherModal();
}

export default function MainPanelGrid({
	asSkeleton = false,
	person,
	setPeopleData,
}: {
	asSkeleton?: boolean;
	person: PersonData;
	setPeopleData: React.Dispatch<React.SetStateAction<PersonData[]>>;
}) {
	const { userSettings } = useContext(UserSettingsContext);

	const [otherModalType, setOtherModalType] = useState<ExtraPanelType>("currency");
	const [otherModalValue, setOtherModalValue] = useState<number | undefined>(undefined);
	const [otherModalPositive, setOtherModalSign] = useState<boolean>(true);
	const {
		isOpen: isOtherModalOpen,
		onOpen: onOpenOtherModal,
		onClose: onCloseOtherModal,
		onOpenChange: onOpenChangeOtherModal,
	} = useDisclosure();

	// Place each custom panel then place each permanent panel
	return (
		<>
			<PanelGrid
				asSkeleton={asSkeleton}
				handleTryApplyPanel={(config: PanelConfig) => {
					handleTryApplyPanel(config, person, setPeopleData, userSettings);
				}}
				extraPanels={extraPanels.map((type: ExtraPanelType) => {
					return { extra: true, type: type };
				})}
				handleOpenExtraPanel={(config: PanelConfig) => {
					prepareExtraPanel(config, setOtherModalType, setOtherModalValue, setOtherModalSign, onOpenOtherModal);
				}}
			/>

			<Modal
				isOpen={isOtherModalOpen}
				onOpenChange={onOpenChangeOtherModal}
				placement="center"
				backdrop="blur"
				className="dark text-foreground"
			>
				<ModalContent>
					<ModalHeader>Other {otherModalType === "currency" ? "Balance" : "Distance"}</ModalHeader>
					<ModalBody>
						<div className="flex items-center gap-1">
							<Button
								className="min-w-0 aspect-square"
								variant="flat"
								color={
									(otherModalType === "currency" && otherModalPositive) ||
									(otherModalType === "distance" && !otherModalPositive)
										? "success"
										: "danger"
								}
								onClick={() => {
									setOtherModalSign((prev) => !prev);
								}}
							>
								<p className="text-lg">{otherModalPositive ? "+" : "-"}</p>
							</Button>
							<Input
								label={otherModalType === "currency" ? "Balance" : "Distance"}
								type="number"
								min={0}
								className="w-fit min-w-80"
								value={otherModalValue ? String(otherModalValue) : ""}
								startContent={otherModalType === "currency" ? currencies[userSettings.currency] : undefined}
								endContent={otherModalType === "distance" ? distanceUnits[userSettings.distanceUnit] : undefined}
								onValueChange={(newValue) => {
									if (newValue) {
										let roundedValue = roundTo(
											newValue,
											otherModalType === "currency" ? 2 : userSettings.distanceDecimals
										);
										if (roundedValue < 0) {
											setOtherModalSign(false);
										}
										setOtherModalValue(Math.abs(roundedValue));
									} else {
										setOtherModalValue(undefined);
									}
								}}
							/>
						</div>
					</ModalBody>
					<ModalFooter>
						<Button color="danger" variant="flat" onPress={onCloseOtherModal}>
							Close
						</Button>
						<Button
							color="primary"
							variant="flat"
							onPress={() => {
								// Try to update the person
								handleTryApplyPanel(
									{
										extra: false,
										type: otherModalType,
										value: (otherModalValue ?? 0) * (otherModalPositive ? 1 : -1),
									} as PanelConfig,
									person,
									setPeopleData,
									userSettings,
									onCloseOtherModal
								);
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
