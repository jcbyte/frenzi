import { Route, Routes } from "react-router-dom";
import AuthorisedRoute from "./components/AuthorisedRoute";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import NoPage from "./pages/NoPage";
import SettingsPage from "./pages/SettingsPage";
import { PersonData } from "./types";

export default function AppRoutes({
	dataLoaded,
	peopleData,
	setPeopleData,
}: {
	dataLoaded: boolean;
	peopleData: PersonData[];
	setPeopleData: React.Dispatch<React.SetStateAction<PersonData[]>>;
}) {
	return (
		<>
			<div className="flex justify-center w-full">
				<div className="p-4 flex flex-col gap-2">
					<Routes>
						{/* These pages can only be viewed if you are logged in otherwise user will be redirected to login page */}
						<Route path="/" element={<AuthorisedRoute redirect="/login" />}>
							{/* Shows skeleton for pages until data is loaded */}
							<Route
								path=""
								element={
									<DashboardPage asSkeleton={!dataLoaded} peopleData={peopleData} setPeopleData={setPeopleData} />
								}
							/>
							<Route path="settings" element={<SettingsPage asSkeleton={!dataLoaded} />} />
						</Route>
						{/* These pages can be viewed if your are logged in or not */}
						<Route path="/login" element={<LoginPage />} />
						<Route path="*" element={<NoPage />} />
					</Routes>
				</div>
			</div>
		</>
	);
}
