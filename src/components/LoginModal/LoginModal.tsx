import React from "react";
import { LoginModalHook } from "@/hooks/LoginModalHook"; // Asegúrate de que la ruta de importación sea correcta

export function LoginModal() {
	const {
		email,
		setEmail,
		password,
		setPassword,
		loading,
		error,
		handleLogin,
	} = LoginModalHook();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await handleLogin(); // Espera a que el inicio de sesión se complete antes de continuar
	};

	return (
		<form className="space-y-6 m-2" onSubmit={handleSubmit}>
			<div>
				<label
					htmlFor="email"
					className="block text-sm font-medium text-gray-700">
					Email
				</label>
				<input
					type="email"
					name="email"
					id="email"
					className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
			</div>
			<div>
				<label
					htmlFor="password"
					className="block text-sm font-medium text-gray-700">
					Password
				</label>
				<input
					type="password"
					name="password"
					id="password"
					className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
			</div>
			<div>
				<button
					type="submit"
					className="w-full flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium text-white rounded-lg bg-black hover:bg-plomo hover:text-black"
					disabled={loading}>
					{loading ? "Loading..." : "Login"}
				</button>
				{error && <p className="text-red-500 text-xs mt-2">{error}</p>}
			</div>
		</form>
	);
}
