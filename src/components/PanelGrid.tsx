import {
	Button,
	Card,
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
import { PanelConfig, PanelConfigType, PersonData, UserSettings } from "../types";
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
async function tryApplyPanel(
	config: PanelConfig,
	person: PersonData,
	setPeopleData: React.Dispatch<React.SetStateAction<PersonData[]>>,
	userSettings: UserSettings
) {
	if (!config.defined) {
		throw new Error("Change not defined");
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
function prepareOtherPanel(
	config: PanelConfig,
	setOtherModalType: React.Dispatch<React.SetStateAction<PanelConfigType>>,
	setOtherModalValue: React.Dispatch<React.SetStateAction<number | undefined>>,
	setOtherModalSign: React.Dispatch<React.SetStateAction<boolean>>,
	onOpenOtherModal: () => void
) {
	setOtherModalType(config.type);
	setOtherModalValue(undefined);
	setOtherModalSign(true);
	onOpenOtherModal();
}

export default function PanelGrid({
	asSkeleton = false,
	person,
	setPeopleData,
}: {
	asSkeleton?: boolean;
	person: PersonData;
	setPeopleData: React.Dispatch<React.SetStateAction<PersonData[]>>;
}) {
	const { userSettings } = useContext(UserSettingsContext);

	const [otherModalType, setOtherModalType] = useState<PanelConfigType>("currency");
	const [otherModalValue, setOtherModalValue] = useState<number | undefined>(undefined);
	const [otherModalSign, setOtherModalSign] = useState<boolean>(true);
	const {
		isOpen: isOtherModalOpen,
		onOpen: onOpenOtherModal,
		onClose: onCloseOtherModal,
		onOpenChange: onOpenChangeOtherModal,
	} = useDisclosure();

	// Place each custom panel then place each mandatory panel
	return (
		<>
			<Card className="min-w-96 grid grid-cols-3 p-1 gap-1">
				{panels.map((config, i) => (
					<Panel
						key={i}
						asSkeleton={asSkeleton}
						config={config}
						onPress={(config) => {
							handleTryApplyPanel(config, person, setPeopleData, userSettings);
						}}
					/>
				))}
				{otherPanels.map((config, i) => (
					<Panel
						key={panels.length + i}
						config={config}
						onPress={(config) => {
							prepareOtherPanel(config, setOtherModalType, setOtherModalValue, setOtherModalSign, onOpenOtherModal);
						}}
					/>
				))}
			</Card>

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
									(otherModalType === "currency" && otherModalSign) ||
									(otherModalType === "distance" && !otherModalSign)
										? "success"
										: "danger"
								}
								onClick={() => {
									setOtherModalSign((prev) => !prev);
								}}
							>
								<p className="text-lg">{otherModalSign ? "+" : "-"}</p>
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
									setOtherModalValue(
										newValue
											? roundTo(newValue, otherModalType === "currency" ? 2 : userSettings.distanceDecimals)
											: undefined
									);
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
										defined: true,
										type: otherModalType,
										value: (otherModalValue ?? 0) * (otherModalSign ? 1 : -1),
									},
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
