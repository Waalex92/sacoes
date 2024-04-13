import { useState, useEffect } from "react";

export function useAuth() {
	const [authState, setAuthState] = useState({
		isAuthenticated: false,
		loading: true,
	});

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const token = localStorage.getItem("token");
				setAuthState({ isAuthenticated: !!token, loading: false });
			} catch (error) {
				console.error("Error al verificar la autenticación:", error);
				setAuthState({ isAuthenticated: false, loading: false });
			}
		};

		checkAuth();
	}, []);
	return authState;
}
