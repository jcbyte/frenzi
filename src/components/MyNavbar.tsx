import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";

import { IconSettings } from "@tabler/icons-react";
import { NavigateFunction, useLocation, useNavigate } from "react-router-dom";

interface LS {
	pathname: string;
}

function navigateOrBack(to: string, location: any, navigate: NavigateFunction) {
	if (location.pathname != to) {
		navigate(to);
	} else {
		navigate(-1);
	}
}

export default function MyNavbar() {
	const navigate = useNavigate();
	const location = useLocation();

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
							navigateOrBack("/settings", location, navigate);
						}}
					>
						<IconSettings />
					</Button>
				</NavbarItem>
			</NavbarContent>
		</Navbar>
	);
}
