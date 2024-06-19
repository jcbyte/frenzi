import { Navigate, Outlet } from "react-router-dom";
import { isAuth } from "../firestore/firebase";

export default function AuthorisedRoute() {
	return isAuth() ? <Outlet /> : <Navigate to={"/login"} />;
}
