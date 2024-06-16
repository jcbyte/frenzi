import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";

import { IconSettings } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export default function MyNavbar({ settingsDisabled = false }: { settingsDisabled?: boolean }) {
	const navigate = useNavigate();

	return (
		<Navbar>
			<NavbarBrand
				onClick={() => {
					navigate("/");
				}}
			>
				<p className="font-bold text-inherit">Frenzi</p>
			</NavbarBrand>
			<NavbarContent justify="end">
				<NavbarItem>
					<Button isIconOnly color="default" disabled={settingsDisabled} aria-label="Settings">
						<IconSettings />
					</Button>
				</NavbarItem>
			</NavbarContent>
		</Navbar>
	);
}
