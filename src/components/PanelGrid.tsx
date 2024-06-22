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
import { UserSettingsContext } from "../globalContexts";
import { currencies, distanceUnits } from "../static";
import { PanelConfig, PanelConfigType, PersonData } from "../types";
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
	setPeopleData: React.Dispatch<React.SetStateAction<PersonData[]>>
) {
	// TODO apply panel
	console.log("apply ", config);
}

function prepareOtherPanel(
	config: PanelConfig,
	setOtherModalType: React.Dispatch<React.SetStateAction<PanelConfigType>>,
	setOtherModalValue: React.Dispatch<React.SetStateAction<number | undefined>>,
	onOpenOtherModal: () => void
) {
	setOtherModalType(config.type);
	setOtherModalValue(undefined);
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
							tryApplyPanel(config, person, setPeopleData);
						}}
					/>
				))}
				{otherPanels.map((config, i) => (
					<Panel
						key={panels.length + i}
						config={config}
						onPress={(config) => {
							prepareOtherPanel(config, setOtherModalType, setOtherModalValue, onOpenOtherModal);
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
						{/* // TODO Need +- here */}
						<Input
							// label="need to set"
							type="number"
							className="w-fit min-w-80"
							value={otherModalValue ? String(otherModalValue) : ""}
							startContent={otherModalType === "currency" ? currencies[userSettings.currency] : undefined}
							endContent={otherModalType === "distance" ? distanceUnits[userSettings.distanceUnit] : undefined}
							onValueChange={(newValue) => {
								setOtherModalValue(newValue ? Number(newValue) : undefined);
							}}
						/>
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
								tryApplyPanel(
									{ defined: true, type: otherModalType, value: Number(otherModalValue) },
									person,
									setPeopleData
								)
									.then((res) => {
										// No need for toast feedback as this can be seen directly on card
										onCloseOtherModal();
									})
									.catch((err) => {
										toast.error(`Could not update: ${err.message}`);
									});
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
