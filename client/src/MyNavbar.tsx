import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";

import { IconSettings } from "@tabler/icons-react";

export default function MyNavbar() {
	return (
		<Navbar>
			<NavbarBrand>
				<p className="font-bold text-inherit">Frenzi</p>
			</NavbarBrand>
			<NavbarContent justify="end">
				<NavbarItem>
					<Button isIconOnly color="default" aria-label="Settings">
						<IconSettings />
					</Button>
				</NavbarItem>
			</NavbarContent>
		</Navbar>
	);
}
