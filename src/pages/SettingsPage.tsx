import { Button, Input, Select, SelectItem, Skeleton } from "@nextui-org/react";
import { IconLogout } from "@tabler/icons-react";
import { useContext } from "react";
import toast from "react-hot-toast";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { signOutFirebase } from "../firestore/firebase";
import { UserSettingsContext } from "../globalContexts";
import { currencies, distanceUnits } from "../static";
import { roundTo } from "../tools/utils";
import { ValidCurrencies, ValidDistanceUnits } from "../types";

// TODO modify panels

// Function to try and sign out with toast feedback
function trySignOut(navigate: NavigateFunction) {
	let signOutPromise: Promise<void> = signOutFirebase();
	toast.promise(signOutPromise, {
		loading: "Signing out",
		success: "Signed out",
		error: (err) => `Could not sign out: ${err.message}`,
	});
	// Once logged out then redirect to login page
	signOutPromise
		.then(() => {
			navigate("/login");
		})
		.catch((err) => {});
}

export default function SettingsPage({ asSkeleton }: { asSkeleton: boolean }) {
	const navigate = useNavigate();
	const { userSettings, setUserSettings } = useContext(UserSettingsContext);

	// Show all modifiable settings in with a component that makes sense
	// These are all controlled using the `userSettings` state
	return (
		<>
			<p className="text text-2xl font-thin mb-4">User Settings</p>

			<Skeleton isLoaded={!asSkeleton} className="rounded-lg">
				<Select
					label="Currency"
					className="dark text-foreground w-fit min-w-80"
					popoverProps={{ className: "dark text-foreground" }}
					selectedKeys={[userSettings.currency]}
					onChange={(newValue): any => {
						setUserSettings((prev) => {
							return { ...prev, currency: newValue.target.value as ValidCurrencies };
						});
					}}
				>
					{/* List out the valid currencies defined in `static.ts` */}
					{Object.keys(currencies).map((currency) => {
						return <SelectItem key={currency}>{currency}</SelectItem>;
					})}
				</Select>
			</Skeleton>

			<Skeleton isLoaded={!asSkeleton} className="rounded-lg">
				<Select
					label="Distance units"
					className="w-fit min-w-80"
					popoverProps={{ className: "dark text-foreground" }}
					selectedKeys={[userSettings.distanceUnit]}
					onChange={(newValue): any => {
						setUserSettings((prev) => {
							return { ...prev, distanceUnit: newValue.target.value as ValidDistanceUnits };
						});
					}}
				>
					{/* List out the valid distance units defined in `static.ts` */}
					{Object.keys(distanceUnits).map((distance) => {
						return <SelectItem key={distance}>{distance}</SelectItem>;
					})}
				</Select>
			</Skeleton>

			<Skeleton isLoaded={!asSkeleton} className="rounded-lg">
				<Input
					label={`Cost per ${distanceUnits[userSettings.distanceUnit]}`}
					type="number"
					min={0}
					step={0.01}
					className="w-fit min-w-80"
					value={String(userSettings.costPerDistance)}
					startContent={currencies[userSettings.currency]}
					onValueChange={(newValue) => {
						setUserSettings((prev) => {
							return { ...prev, costPerDistance: roundTo(newValue, 2) };
						});
					}}
				/>
			</Skeleton>

			<Skeleton isLoaded={!asSkeleton} className="rounded-lg">
				<Input
					label="Distance decimals"
					type="number"
					className="w-fit min-w-80"
					min={0}
					max={4}
					step={1}
					value={String(userSettings.distanceDecimals)}
					onValueChange={(newValue) => {
						setUserSettings((prev) => {
							return { ...prev, distanceDecimals: roundTo(newValue, 0) };
						});
					}}
				/>
			</Skeleton>

			<Button
				color="danger"
				variant="flat"
				className="mt-4 w-fit min-w-80"
				startContent={<IconLogout />}
				onPress={() => {
					trySignOut(navigate);
				}}
			>
				Sign out
			</Button>
		</>
	);
}
