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
import { useContext } from "react";
import PeopleList from "../components/PeopleList";
import UnpaidCard from "../components/UnpaidCard";
import { UserSettingsContext } from "../globalContexts";
import { FriendData } from "../types";

// Function to calculate the total distance by adding up each friends distance
function getTotalDistance(friendData: FriendData[]): number {
	return friendData.length > 0 ? friendData.map((friend) => friend.distance).reduce((acc, x) => acc + x) : 0;
}

export default function DashboardPage({
	asSkeleton = false,
	friendData,
}: {
	asSkeleton: boolean;
	friendData: FriendData[];
}) {
	const { userSettings } = useContext(UserSettingsContext);

	// const [addFriendModalOpen, setAddFriendModalOpen] = useState<boolean>(false);
	const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

	return (
		<>
			<UnpaidCard
				asSkeleton={asSkeleton}
				balance={getTotalDistance(friendData) * userSettings.costPerDistance}
				distance={getTotalDistance(friendData)}
			/>
			<PeopleList asSkeleton={asSkeleton} friendData={friendData} />
			<Button color="default" variant="flat" className="w-fit min-w-40" onClick={onOpen}>
				Add
			</Button>

			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				placement="center"
				backdrop="blur"
				className="dark text-foreground"
			>
				<ModalContent>
					<ModalHeader>Add</ModalHeader>
					<ModalBody>
						<Input label="Name" />
					</ModalBody>
					<ModalFooter>
						<Button color="danger" variant="flat" onPress={onClose}>
							Close
						</Button>
						<Button color="primary" variant="flat" onPress={onClose}>
							{/* // TODO need to implement this */}
							Add
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}
