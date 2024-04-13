import { useEffect, useState } from "react";
import { dataHeader } from "../Header/Header.data";
import { NavbarProps } from "./Navbar.types";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { motion } from "framer-motion";

export function Navbar(props: NavbarProps) {
	const { openMobileMenu } = props;
	const [isScrolling, setIsScrolling] = useState(false);

	return (
		<AnimatePresence>
			{isScrolling ? (
				<motion.nav
					key={1}
					variants={animationNavbar}
					initial="initial"
					animate="animate"
					exit="exit"
					className="ml-auto mr-auto md:fixed z-[9999] right-0 left-0 px-6 py-3 bg-gray-400/25 rounded-3xl backdrop-blur w-fit">
					<div className="items-center hidden gap-5 md:flex">
						{dataHeader.map(({ id, name, link }) => (
							<Link
								key={id}
								href={link}
								className="hover:text-white hover:border-b-[1px] hover:border-white text-xl">
								{name}
							</Link>
						))}
					</div>
				</motion.nav>
			) : (
				<div
					className={`${
						openMobileMenu
							? "absolute z-[1] left-0 top-32 bg-white r-0 w-full px-4 py-4"
							: "hidden"
					} gap-5 md:flex`}>
					{dataHeader.map(({ id, name, link }) => (
						<Link
							href={link}
							key={id}
							className="block hover:text-plomo hover:border-b-[1px] text-2xl ">
							{name}
						</Link>
					))}
				</div>
			)}
		</AnimatePresence>
	);
}

const animationNavbar = {
	initial: {
		y: -20,
		opacity: 0,
	},
	animate: {
		y: 0,
		opacity: 1,
		transition: {
			stifness: 100,
			damping: 20,
			type: "spring",
		},
	},
	exit: {
		y: -20,
		opacity: 0,
	},
};
