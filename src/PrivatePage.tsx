import { Navigate, Outlet } from "react-router-dom";
import { auth } from "./firestore/firebase";

export default function PrivateRoute() {
	const loggedIn: boolean = auth.currentUser != null;

	return loggedIn ? <Outlet /> : <Navigate to="/login" />;
}
