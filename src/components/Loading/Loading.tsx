import React, { useState, useEffect } from "react";

export function Loading() {
	const [isVisible, setIsVisible] = useState(true);

	// Ocultar el componente después de 1 segundo
	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(false);
		}, 1000); // 1 segundo

		return () => clearTimeout(timer);
	}, []);

	return isVisible ? (
		<div className="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50">
			<div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
		</div>
	) : null;
}
