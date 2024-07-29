import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";

import { IconSettings } from "@tabler/icons-react";
import { NavigateFunction, useLocation, useNavigate } from "react-router-dom";

// Function to navigate to the given url, however will return back to the pervious page
// if you are already on the page your wanting to navigate too
function navigateOrBack(to: string, location: any, navigate: NavigateFunction): void {
	if (location.pathname !== to) {
		navigate(to);
	} else {
		navigate(-1);
	}
}

export default function MyNavbar({ disabled = false }: { disabled?: boolean }) {
	const navigate = useNavigate();
	const location = useLocation();

	return (
		<Navbar>
			<NavbarBrand
				onClick={() => {
					// This should always redirect to '/' even if navbar is not enabled
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
						onPress={() => {
							navigateOrBack("/settings", location, navigate);
						}}
						isDisabled={disabled}
					>
						<IconSettings />
					</Button>
				</NavbarItem>
			</NavbarContent>
		</Navbar>
	);
}
