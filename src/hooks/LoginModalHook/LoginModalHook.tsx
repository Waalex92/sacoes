import { useState } from "react";
import { useRouter } from "next/router";

interface LoginData {
	email: string;
	password: string;
}

interface LoginResponse {
	token: string;
}

export function LoginModalHook() {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();

	const handleLogin = async () => {
		setError(null);
		setLoading(true);

		const data: LoginData = { email, password };

		try {
			console.log("Datos enviados:", data); // Verifica los datos antes de enviarlos

			const response = await fetch(
				"http://sacoes11.test/api/auth/login",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json",
					},
					body: JSON.stringify(data),
				}
			);

			console.log("Respuesta del servidor:", response);

			if (!response.ok) {
				const errorData = await response.json();
				console.error("Error en la respuesta del servidor:", errorData);
				throw new Error(errorData.message);
			}
			const responseData: LoginResponse = await response.json();
			localStorage.setItem("token", responseData.token);
			router.push("/home");
		} catch (error: any) {
			console.error("Error durante el inicio de sesión:", error);
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	return {
		email,
		setEmail,
		password,
		setPassword,
		loading,
		error,
		handleLogin,
	};
}
