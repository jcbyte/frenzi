import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";

import { IconSettings } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export default function MyNavbar() {
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
					<Button
						isIconOnly
						color="default"
						onClick={() => {
							navigate("/settings");
						}}
					>
						<IconSettings />
					</Button>
				</NavbarItem>
			</NavbarContent>
		</Navbar>
	);
}
