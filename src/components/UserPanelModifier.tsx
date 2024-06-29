import {
	Input,
	Select,
	SelectItem,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from "@nextui-org/react";
import { Key, useCallback, useContext } from "react";
import { UserPanelsContext } from "../globalContexts";
import { roundTo } from "../tools/utils";
import { PanelConfig, PanelConfigType } from "../types";

export default function UserPanelModifier({ asSkeleton }: { asSkeleton?: boolean }) {
	const { userPanels, setUserPanels } = useContext(UserPanelsContext);

	const renderCell = useCallback((panelConfig: PanelConfig, rowNum: number, columnKey: Key) => {
		switch (columnKey) {
			case "type":
				return (
					<Select
						label="Balance/Distance"
						popoverProps={{ className: "dark text-foreground" }}
						selectedKeys={[panelConfig.type]}
						onChange={(newValue) => {
							setUserPanels((prev) => {
								let newUserPanels: PanelConfig[] = prev.map((panelConfig, i) => {
									return i != rowNum ? panelConfig : { ...panelConfig, type: newValue.target.value as PanelConfigType };
								});
								return newUserPanels;
							});
						}}
					>
						{/* List out the valid distance units defined in `static.ts` */}
						<SelectItem key={"currency"}>Balance</SelectItem>
						<SelectItem key={"distance"}>Distance</SelectItem>
					</Select>
					// TODO Change this from a select to a button we can toggle?
				);
			case "value":
				return (
					<Input
						label={`Value`}
						type="number"
						min={0}
						// step={0.01}
						value={String(panelConfig.value)}
						// startContent={currencies[userSettings.currency]}
						onValueChange={(newValue) => {
							setUserPanels((prev) => {
								let newUserPanels: PanelConfig[] = prev.map((panelConfig, i) => {
									return i != rowNum ? panelConfig : { ...panelConfig, value: roundTo(newValue, 2) };
								});
								return newUserPanels;
							});
						}}
					/>
					// TODO make this properly
				);
		}
	}, []);

	return (
		<Table hideHeader aria-label="User Defined Panels">
			<TableHeader>
				<TableColumn key="type">Type</TableColumn>
				<TableColumn key="value">Value</TableColumn>
			</TableHeader>
			<TableBody>
				{userPanels.map((panelConfig: PanelConfig, i) => {
					return (
						<TableRow key={i}>{(columnKey) => <TableCell>{renderCell(panelConfig, i, columnKey)}</TableCell>}</TableRow>
					);
				})}
			</TableBody>
		</Table>
	);
}
