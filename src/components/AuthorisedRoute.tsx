import { Navigate, Outlet } from "react-router-dom";
import { isAuth } from "../firestore/firebase";

export default function PrivateRoute({ notAuthed = false, to = "/login" }: { notAuthed?: boolean; to?: string }) {
	var amAuthed = isAuth();
	var loadContent = (amAuthed && !notAuthed) || (!amAuthed && notAuthed);

	return loadContent ? <Outlet /> : <Navigate to={to} />;
}
