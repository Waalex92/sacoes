import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import SessionAuthProvider from "@/context/SessionAuthProvider";
import { Providers } from "./providers";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Sastreria SaCoEs",
	description: "Creada por Alex Wong",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={montserrat.className}>
				<Providers>
					<main className="container">
						<SessionAuthProvider>{children}</SessionAuthProvider>
					</main>
				</Providers>
			</body>
		</html>
	);
}
