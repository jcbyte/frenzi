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
import { ExtraPanelType, PanelConfig, PanelConfigType, PersonData, UserSettings } from "../types";
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
	onCloseExtraModal?: () => void | undefined
) {
	tryApplyPanel(config, person, setPeopleData, userSettings)
		.then((res) => {
			// No need for toast feedback as this can be seen directly on card
			if (onCloseExtraModal) onCloseExtraModal();
		})
		.catch((err) => {
			toast.error(`Could not update: ${err.message}`);
		});
}

// Prepare the modal by resetting and set settings for it
function prepareExtraPanel(
	config: PanelConfig,
	setExtraModalType: React.Dispatch<React.SetStateAction<PanelConfigType>>,
	setExtraModalValue: React.Dispatch<React.SetStateAction<number | undefined>>,
	setExtraModalSign: React.Dispatch<React.SetStateAction<boolean>>,
	onOpenExtraModal: () => void
) {
	if (!config.extra) {
		throw new Error("Cannot prepare a not `extra` panel");
	}

	setExtraModalType(config.type as PanelConfigType);
	setExtraModalValue(undefined);
	setExtraModalSign(true);
	onOpenExtraModal();
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

	const [extraModalType, setExtraModalType] = useState<PanelConfigType>("currency");
	const [extraModalValue, setExtraModalValue] = useState<number | undefined>(undefined);
	const [extraModalPositive, setExtraModalSign] = useState<boolean>(true);
	const {
		isOpen: isExtraModalOpen,
		onOpen: onOpenExtraModal,
		onClose: onCloseExtraModal,
		onOpenChange: onOpenChangeExtraModal,
	} = useDisclosure();

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
					prepareExtraPanel(config, setExtraModalType, setExtraModalValue, setExtraModalSign, onOpenExtraModal);
				}}
			/>

			<Modal
				isOpen={isExtraModalOpen}
				onOpenChange={onOpenChangeExtraModal}
				placement="center"
				backdrop="blur"
				className="dark text-foreground"
			>
				<ModalContent>
					<ModalHeader>Other {extraModalType === "currency" ? "Balance" : "Distance"}</ModalHeader>
					<ModalBody>
						<div className="flex items-center gap-1">
							<Button
								className="min-w-0 aspect-square"
								variant="flat"
								color={
									(extraModalType === "currency" && extraModalPositive) ||
									(extraModalType === "distance" && !extraModalPositive)
										? "success"
										: "danger"
								}
								onClick={() => {
									setExtraModalSign((prev) => !prev);
								}}
							>
								<p className="text-lg">{extraModalPositive ? "+" : "-"}</p>
							</Button>
							<Input
								label={extraModalType === "currency" ? "Balance" : "Distance"}
								type="number"
								min={0}
								className="w-fit min-w-80"
								value={extraModalValue ? String(extraModalValue) : ""}
								startContent={extraModalType === "currency" ? currencies[userSettings.currency] : undefined}
								endContent={extraModalType === "distance" ? distanceUnits[userSettings.distanceUnit] : undefined}
								onValueChange={(newValue) => {
									if (newValue) {
										let roundedValue = roundTo(
											newValue,
											extraModalType === "currency" ? 2 : userSettings.distanceDecimals
										);
										if (roundedValue < 0) {
											setExtraModalSign(false);
										}
										setExtraModalValue(Math.abs(roundedValue));
									} else {
										setExtraModalValue(undefined);
									}
								}}
							/>
						</div>
					</ModalBody>
					<ModalFooter>
						<Button color="danger" variant="flat" onPress={onCloseExtraModal}>
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
										type: extraModalType,
										value: (extraModalValue ?? 0) * (extraModalPositive ? 1 : -1),
									} as PanelConfig,
									person,
									setPeopleData,
									userSettings,
									onCloseExtraModal
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
