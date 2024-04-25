import { useState } from "react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { MdDashboard, MdBusinessCenter } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserAlt, FaChartLine } from "react-icons/fa";
import { IoNewspaper, IoCalendarNumber } from "react-icons/io5";
import { RiLogoutBoxLine } from "react-icons/ri";
import Users from "@/components/DataTables/Users/Users";
import Works from "@/components/DataTables/Orders/Orders"; // Suponiendo que existe este componente
//import Reports from "@/app/reports/page"; // Suponiendo que existe este componente

type ComponentKey = "users" | "works";
// | 'reports'

const components: Record<ComponentKey, React.ComponentType> = {
	users: Users,
	works: Works,
	//reports: Reports,
};

export function SideNav() {
	const [activeComponent, setActiveComponent] =
		useState<ComponentKey>("users");
	const ActiveComponent = components[activeComponent];

	return (
		<div className="text-morado1 w-auto relative h-full bg-gradient-to-br from-verde to-morado">
			<div className="flex justify-between bg-gradient-to-tr from-verde/50 to-morado/50 items-center ">
				<div className="flex items-center space-x-4">
					<button
						type="button"
						className="text-3xl rounded-lg sm:hidden">
						<GiHamburgerMenu />
					</button>
					<Image
						src="/home/assets/logo_fondo.png"
						alt="Logo"
						width={70}
						height={70}
						className="rounded-3xl object-cover"
					/>
					<span className="text-claro3 self-center text-xl font-semibold sm:text-2xl">
						SaCoEs
					</span>
					<ul className="flex space-x-4 font-medium">
						{Object.entries(components).map(([key]) => (
							<li key={key}>
								<button
									className={`flex items-center hover:bg-morado px-4 py-2 text-claro3 rounded-full ${
										activeComponent === key
											? "bg-morado1 text-claro3 hover:bg-morado"
											: ""
									}`}
									onClick={() =>
										setActiveComponent(key as ComponentKey)
									}>
									<i className="text-2xl">
										{key === "users" ? (
											<FaUserAlt />
										) : key === "works" ? (
											<MdBusinessCenter />
										) : key === "reports" ? (
											<FaChartLine />
										) : null}
									</i>
									<span className="ml-3">
										{key.charAt(0).toUpperCase() +
											key.slice(1)}
									</span>
								</button>
							</li>
						))}
					</ul>
				</div>
				<button
					className="flex items-center p-2 rounded-full hover:bg-morado hover:text-claro3"
					onClick={() => signOut()}>
					<i className="text-2xl text-claro3">
						<RiLogoutBoxLine />
					</i>
					<span className="ml-3 whitespace-nowrap text-claro3">
						Cerrar sesión
					</span>
				</button>
			</div>
			<div className="py-3 ml-4">
				{ActiveComponent ? <ActiveComponent /> : null}
			</div>
		</div>
	);
}
