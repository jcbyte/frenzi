import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import AuthorisedRoute from "./components/AuthorisedRoute";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import NoPage from "./pages/NoPage";
import PersonPage from "./pages/PersonPage";
import SettingsPage from "./pages/SettingsPage";
import SharedPage from "./pages/SharedPage";
import { PersonData } from "./types";

export default function AppRoutes({
	dataLoaded,
	isAuthed,
	peopleData,
	setPeopleData,
}: {
	dataLoaded: boolean;
	isAuthed: boolean;
	peopleData: PersonData[];
	setPeopleData: React.Dispatch<React.SetStateAction<PersonData[]>>;
}) {
	const location = useLocation();

	return (
		<>
			{/* Will show skeleton for pages until data is loaded */}
			<div className="flex justify-center w-full relative">
				<AnimatePresence mode="sync">
					<Routes key={location.pathname} location={location}>
						{/* These pages can only be viewed if you are logged in otherwise user will be redirected to login page */}
						<Route path="/" element={<AuthorisedRoute isAuthed={isAuthed} redirect="/login" />}>
							<Route
								path=""
								element={
									<DashboardPage asSkeleton={!dataLoaded} peopleData={peopleData} setPeopleData={setPeopleData} />
								}
							/>
							<Route
								path="person/:personIndex"
								element={<PersonPage asSkeleton={!dataLoaded} peopleData={peopleData} setPeopleData={setPeopleData} />}
							/>
							<Route path="settings" element={<SettingsPage asSkeleton={!dataLoaded} />} />
						</Route>

						{/* These pages can be viewed if your are logged in or not */}
						<Route path="/login" element={<LoginPage isAuthed={isAuthed} />} />
						<Route path="/shared/:author/:personIndex" element={<SharedPage />} />
						<Route path="*" element={<NoPage />} />
					</Routes>
				</AnimatePresence>
			</div>
		</>
	);
}
