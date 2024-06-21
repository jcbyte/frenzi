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
import PeopleList from "../components/PeopleList";
import UnpaidCard from "../components/UnpaidCard";
import { addFriendData } from "../firestore/db";
import { UserSettingsContext } from "../globalContexts";
import { DEFAULT_FRIEND_DATA } from "../static";
import { FriendData } from "../types";

// Function to calculate the total distance by adding up each friends distance
function getTotalDistance(friendData: FriendData[]): number {
	return friendData.length > 0 ? friendData.map((friend) => friend.distance).reduce((acc, x) => acc + x) : 0;
}

// Function to try and add the new friend to the database
async function tryAddFriend(
	friend: string,
	friendData: FriendData[],
	setFriendData: React.Dispatch<React.SetStateAction<FriendData[]>>
): Promise<void> {
	// If this friend already exists locally then throw an exception
	if (friendData.map((fd) => fd.name).includes(friend)) {
		throw new Error("Name already exists");
	}

	// Try and add the friend to firestore if accepted then add it to the local variable
	return await addFriendData(friend)
		.then((res) => {
			setFriendData((prev) => {
				return [...prev, { ...DEFAULT_FRIEND_DATA, name: friend }];
			});
		})
		.catch((err) => {
			throw new Error(err.message);
		});
}

export default function DashboardPage({
	asSkeleton = false,
	friendData,
	setFriendData,
}: {
	asSkeleton: boolean;
	friendData: FriendData[];
	setFriendData: React.Dispatch<React.SetStateAction<FriendData[]>>;
}) {
	const { userSettings } = useContext(UserSettingsContext);

	const [friendModalName, setFriendModalName] = useState<string>("");
	const {
		isOpen: isFriendModalOpen,
		onOpen: onOpenFriendModal,
		onClose: onCloseFriendModal,
		onOpenChange: onOpenChangeFriendModal,
	} = useDisclosure();

	return (
		<>
			<UnpaidCard
				asSkeleton={asSkeleton}
				balance={getTotalDistance(friendData) * userSettings.costPerDistance}
				distance={getTotalDistance(friendData)}
			/>
			<PeopleList asSkeleton={asSkeleton} friendData={friendData} />
			<Button
				color="default"
				variant="flat"
				className="w-fit min-w-40"
				onClick={() => {
					setFriendModalName("");
					onOpenFriendModal();
				}}
			>
				Add
			</Button>

			<Modal
				isOpen={isFriendModalOpen}
				onOpenChange={onOpenChangeFriendModal}
				placement="center"
				backdrop="blur"
				className="dark text-foreground"
			>
				<ModalContent>
					<ModalHeader>Add</ModalHeader>
					<ModalBody>
						<Input
							label="Name"
							className="w-fit min-w-80"
							value={friendModalName}
							onValueChange={(newValue) => {
								setFriendModalName(newValue);
							}}
						/>
					</ModalBody>
					<ModalFooter>
						<Button color="danger" variant="flat" onPress={onCloseFriendModal}>
							Close
						</Button>
						<Button
							color="primary"
							variant="flat"
							onPress={() => {
								// Try and add the friend and give the user a toast response
								tryAddFriend(friendModalName, friendData, setFriendData)
									.then((res) => {
										toast.success("Added");
										onCloseFriendModal();
									})
									.catch((err) => {
										toast.error(`Could not add: ${err.message}`);
									});
							}}
						>
							Add
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}
