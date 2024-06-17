import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { IconLogout } from "@tabler/icons-react";
import { useContext } from "react";
import toast from "react-hot-toast";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { signOutFirebase } from "../firestore/firebase";
import { UserSettingsContext } from "../globalContexts";
import { currencies, distanceUnits } from "../static";
import { ValidCurrencies, ValidDistanceUnits } from "../types";

function trySignOut(navigate: NavigateFunction) {
	var signOutPromise = signOutFirebase();
	toast.promise(signOutPromise, {
		loading: "Signing out",
		success: "Signed out",
		error: (err) => `Could not sign out: ${err}`,
	});
	signOutPromise
		.then(() => {
			navigate("/login");
		})
		.catch((err) => {});
}

export default function SettingsPage() {
	const navigate = useNavigate();
	const { userSettings, setUserSettings } = useContext(UserSettingsContext);

	return (
		<>
			<div className="flex justify-center w-full">
				<div className="p-4 flex flex-col gap-2">
					<p className="text text-2xl font-thin pb-8">User Settings</p>

					<Select
						label="Currency"
						className="w-fit min-w-80"
						selectedKeys={[userSettings.currency]}
						onChange={(newValue): any => {
							setUserSettings({ ...userSettings, currency: newValue.target.value as ValidCurrencies });
						}}
					>
						{Object.keys(currencies).map((currency) => {
							return <SelectItem key={currency}>{currency}</SelectItem>;
						})}
					</Select>

					<Select
						label="Distance units"
						className="w-fit min-w-80"
						selectedKeys={[userSettings.distanceUnit]}
						onChange={(newValue): any => {
							setUserSettings({ ...userSettings, distanceUnit: newValue.target.value as ValidDistanceUnits });
						}}
					>
						{Object.keys(distanceUnits).map((distance) => {
							return <SelectItem key={distance}>{distance}</SelectItem>;
						})}
					</Select>

					<Input
						label="Distance decimals"
						type="number"
						className="w-fit min-w-80"
						value={String(userSettings.distanceDecimals)}
						onValueChange={(newValue) => {
							setUserSettings({ ...userSettings, distanceDecimals: Number(newValue) });
						}}
					/>

					<Button
						color="danger"
						variant="flat"
						className="mt-16 w-fit min-w-80"
						startContent={<IconLogout />}
						onClick={() => {
							trySignOut(navigate);
						}}
					>
						Sign out
					</Button>
				</div>
			</div>
		</>
	);
}
