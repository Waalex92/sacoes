import Link from "next/link";
import { useState } from "react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { MdDashboard, MdBusinessCenter } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserAlt, FaChartLine } from "react-icons/fa";
import { IoNewspaper, IoCalendarNumber } from "react-icons/io5";
import { RiLogoutBoxLine } from "react-icons/ri";
import Users from "@/components/DataTables/Users/Users";
//import Jobs from "@/app/jobs/page"; // Suponiendo que existe este componente
//import Reports from "@/app/reports/page"; // Suponiendo que existe este componente
// Definición del tipo para las claves de los componentes

type ComponentKey = "users";
//| 'jobs' | 'reports'

const components: Record<ComponentKey, React.ComponentType> = {
	users: Users,
	//jobs: Jobs,
	//reports: Reports,
};
export function SideNav() {
	const [activeComponent, setActiveComponent] =
		useState<ComponentKey>("users");

	const ActiveComponent = components[activeComponent];

	return (
		<div className="container ">
			<nav className="text-white fixed top-0 left-0 z-20 w-full sm:w-60 bg-black border border-slate-500">
				<div className="px-2 py-2 lg:px-5 lg:pl-3 border border-slate-500">
					<div className="flex items-center justify-between">
						<div className="flex items-center justify-start rtl:justify-end">
							<button
								type="button"
								className="text-3xl p-2 text-gray-500 rounded-lg sm:hidden">
								<GiHamburgerMenu />
							</button>
							<div className="flex p-1">
								<Image
									src="/home/assets/logo_fondo.png"
									alt="Logo"
									width={70}
									height={70}
									className="rounded-3xl object-cover mx-2 max-sm:hidden"
								/>
								<span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-white">
									SaCoEs
								</span>
							</div>
						</div>
					</div>
				</div>
			</nav>

			<aside
				id="logo-sidebar"
				className="fixed text-plomoClaro my-8 top-0 left-0 z-10 w-60 h-screen pt-20 transition-transform -translate-x-full bg-black sm:translate-x-0 border-2 border-slate-500"
				aria-label="Sidebar">
				<ul className="space-y-2 font-medium">
					{Object.entries(components).map(([key]) => (
						<li key={key}>
							<button
								className={`flex p-2 w-full text-black rounded-full ${
									activeComponent === key
										? "bg-plomo text-black"
										: ""
								}`}
								onClick={() =>
									setActiveComponent(key as ComponentKey)
								}>
								<i className="text-2xl">
									{key === "users" ? (
										<FaUserAlt />
									) : key === "jobs" ? (
										<MdBusinessCenter />
									) : key === "reports" ? (
										<FaChartLine />
									) : null}
								</i>
								<span className="ms-3 whitespace-nowrap">
									{key.charAt(0).toUpperCase() + key.slice(1)}
								</span>
							</button>
						</li>
					))}
					<li>
						<button
							className="flex p-2 w-full text-white rounded-full hover:bg-plomo hover:text-black"
							onClick={() => signOut()}>
							<i className="text-2xl">
								<RiLogoutBoxLine />
							</i>
							<span className="ms-3 whitespace-nowrap">
								Cerrar sesión
							</span>
						</button>
					</li>
				</ul>
			</aside>
			<div className="py-4 sm:ml-64">
				{ActiveComponent ? <ActiveComponent /> : null}
			</div>
		</div>
	);
}
