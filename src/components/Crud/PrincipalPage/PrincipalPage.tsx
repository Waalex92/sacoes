import Link from "next/link";
import Image from "next/image";
import { MdDashboard } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserAlt } from "react-icons/fa";
import { MdBusinessCenter } from "react-icons/md";
import { IoNewspaper } from "react-icons/io5";
import { FaChartLine } from "react-icons/fa";
import { IoCalendarNumber } from "react-icons/io5";
import { RiLogoutBoxLine } from "react-icons/ri";
import { Serv } from "@/components/LandingPage/Serv";

export function PrincipalPage() {
	return (
		<div className="container">
			<nav className="text-white fixed top-0 left-0 z-50 w-full sm:w-60 bg-black border border-white">
				<div className="px-2 py-2 lg:px-5 lg:pl-3">
					<div className="flex items-center justify-between">
						<div className="flex items-center justify-start rtl:justify-end">
							<button
								type="button"
								className="text-3xl p-2 text-gray-500 rounded-lg sm:hidden">
								<i>
									<GiHamburgerMenu />
								</i>
							</button>
							<div className="flex p-1">
								<Image
									src="/home/assets/logo_fondo.png"
									alt="Logo"
									width={70}
									height={70}
									className="bg-gradient-to-br from-plomoClaro from-10% via-plomo via-40% to-black to-99% rounded-3xl object-cover mx-2 max-sm:hidden"
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
				className="fixed text-plomoClaro my-8 top-0 left-0 z-40 w-60 h-screen pt-20 transition-transform -translate-x-full bg-black border border-white sm:translate-x-0"
				aria-label="Sidebar">
				<div className="h-full px-3 pb-4 overflow-y-auto bg-black">
					<ul className="space-y-2 font-medium">
						<li>
							<div className="flex items-center py-2 px-9">
								<i className="text-2xl">
									<MdDashboard />
								</i>
								<span className="ms-3">Panel</span>
							</div>
						</li>
						<li>
							<a
								href="#"
								className="flex items-center p-2 text-white rounded-lg  hover:bg-plomo hover:text-black">
								<i className="text-2xl">
									<FaUserAlt />
								</i>
								<span className="flex-1 ms-3 whitespace-nowrap">
									Gestion de usuarios
								</span>
							</a>
						</li>
						<li>
							<a
								href="#"
								className="flex items-center p-2 text-white rounded-lg  hover:bg-plomo hover:text-black">
								<i className="text-2xl">
									<MdBusinessCenter />
								</i>
								<span className="flex-1 ms-3 whitespace-nowrap">
									Gestion de trabajos
								</span>
							</a>
						</li>
						<li>
							<a
								href="#"
								className="flex items-center p-2 text-white rounded-lg  hover:bg-plomo hover:text-black">
								<i className="text-2xl">
									<IoNewspaper />
								</i>
								<span className="flex-1 ms-3 whitespace-nowrap">
									Informes de trabajo
								</span>
							</a>
						</li>
						<li>
							<a
								href="#"
								className="flex items-center p-2 text-white rounded-lg  hover:bg-plomo hover:text-black">
								<i className="text-2xl">
									<FaChartLine />
								</i>
								<span className="flex-1 ms-3 whitespace-nowrap">
									Reportes
								</span>
							</a>
						</li>
						<li>
							<a
								href="#"
								className="flex items-center p-2 text-white rounded-lg  hover:bg-plomo hover:text-black">
								<i className="text-2xl">
									<IoCalendarNumber />
								</i>
								<span className="flex-1 ms-3 whitespace-nowrap">
									Citas
								</span>
							</a>
						</li>
						<li>
							<a
								href="#"
								className="flex items-center p-2 text-white rounded-lg  hover:bg-plomo hover:text-black">
								<i className="text-2xl">
									<RiLogoutBoxLine />
								</i>
								<span className="flex-1 ms-3 whitespace-nowrap">
									Cerrar sesion
								</span>
							</a>
						</li>
					</ul>
				</div>
			</aside>
			{/* Main content area */}
			<div className="p-2 sm:ml-64 sm:mt-0 mt-14  h-auto">
				<div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
					<Serv />
				</div>
			</div>
		</div>
	);
}
