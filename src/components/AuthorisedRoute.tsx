import { Navigate, Outlet } from "react-router-dom";
import { isAuth } from "../firestore/firebase";

export default function AuthorisedRoute({ redirect }: { redirect: string }) {
	return isAuth() ? <Outlet /> : <Navigate to={redirect} />;
}
