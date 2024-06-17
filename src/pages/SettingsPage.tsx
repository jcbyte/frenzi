import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { IconLogout } from "@tabler/icons-react";
import { currencies, distances } from "../globals";

export default function SettingsPage() {
	return (
		<>
			<div className="flex justify-center w-full">
				<div className="p-4 flex flex-col gap-2">
					<p className="text text-2xl font-thin pb-8">User Settings</p>

					<Select label="Currency" className="w-fit min-w-80">
						{Object.keys(currencies).map((currency) => {
							return <SelectItem key={currency}>{currency}</SelectItem>;
						})}
					</Select>

					<Select label="Distance units" className="w-fit min-w-80">
						{Object.keys(distances).map((distance) => {
							return <SelectItem key={distance}>{distance}</SelectItem>;
						})}
					</Select>

					<Input label="Distance decimals" type="number" className="w-fit min-w-80" />

					<Button color="danger" variant="flat" className="mt-16 w-fit min-w-80" startContent={<IconLogout />}>
						Sign out
					</Button>
				</div>
			</div>
		</>
	);
}
