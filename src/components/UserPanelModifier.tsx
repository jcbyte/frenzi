import { Select, SelectItem, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { Key, useCallback, useContext } from "react";
import { UserPanelsContext } from "../globalContexts";
import { PanelConfig } from "../types";

export default function UserPanelModifier({ asSkeleton }: { asSkeleton?: boolean }) {
	const { userPanels, setUserPanels } = useContext(UserPanelsContext);

	const renderCell = useCallback((panelConfig: PanelConfig, columnKey: Key) => {
		console.log(panelConfig.type);
		switch (columnKey) {
			case "type":
				return (
					<Select
						label="Balance/Distance"
						popoverProps={{ className: "dark text-foreground" }}
						selectedKeys={[panelConfig.type]}
						// onChange={(newValue): any => {
						// 	setUserPanels((prev) => {
						// 		return prev;
						//     // TODO change
						// 	});
						// }}
					>
						{/* List out the valid distance units defined in `static.ts` */}
						<SelectItem key={"currency"}>Balance</SelectItem>
						<SelectItem key={"distance"}>Distance</SelectItem>
					</Select>
				);
			case "value":
				// TODO set value
				return <>b</>;
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
						<TableRow key={i}>{(columnKey) => <TableCell>{renderCell(panelConfig, columnKey)}</TableCell>}</TableRow>
					);
				})}
			</TableBody>
		</Table>
	);
}
