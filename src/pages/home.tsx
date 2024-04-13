import "../app/globals.css";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/Auth/useAuth";
import { PrincipalPage } from "@/components/Crud/PrincipalPage";
import { Loading } from "@/components/Loading";

export default function HomePage() {
	const { isAuthenticated, loading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (loading) return; // Espera a que la verificación de autenticación esté completa
		if (!isAuthenticated) {
			router.replace("/");
		}
	}, [isAuthenticated, loading, router]);

	// Renderiza Loading mientras se está verificando la autenticación
	if (loading) {
		return <Loading />;
	}

	// Si no está autenticado, redirige a la página de inicio de sesión
	if (!isAuthenticated) {
		return null; // O un mensaje de error, dependiendo de los requisitos
	}

	// Renderiza SideNav solo si está autenticado
	return (
		<>
			<PrincipalPage />
		</>
	);
}
