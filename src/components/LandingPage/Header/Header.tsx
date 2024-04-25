import Link from "next/link";
import Image from "next/image";
import { Navbar } from "../Navbar";
import { useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import { BsTelephone } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import LoginModal from "@/app/login/page";

export function Header() {
	const [showModal, setShowModal] = useState(false);
	const openModal = () => {
		setShowModal(true);
		document.body.style.overflow = "hidden";
	};
	const closeModal = () => {
		setShowModal(false);
		document.body.style.overflow = "auto";
	};
	const [openMobileMenu, setOpenMobileMenu] = useState(false);

	return (
		<div className="container mx-auto px-2 mb-1 bg-gradient-to-br from-verde to-morado">
			<div
				className="flex items-center justify-around mx-5 md:px-0"
				id="welcome">
				<CiMenuFries
					className="block text-2xl md:hidden"
					onClick={() => setOpenMobileMenu(!openMobileMenu)}
				/>
				<Link href="/">
					<Image
						src="/home/assets/logo_fondo.png"
						alt="Location"
						width={130}
						height={130}
						className="object-cover"
					/>
				</Link>

				<Navbar openMobileMenu={openMobileMenu} />

				<div className="flex items-center gap-4 md:gap-5 text-2xl">
					<Link
						href="tel:78945612"
						className="flex items-center gap-4 cursor-pointer text-claro3 hover:text-claro2 hover:border-b">
						<BsTelephone />
						<span className="hidden md:block">+591 78945612</span>
					</Link>
					<button
						onClick={openModal}
						className="px-3 py-2 text-claro3 rounded-lg bg-morado1 hover:bg-morado">
						Login
					</button>
					{showModal && (
						<div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
							<div className="modal-content bg-black p-4 rounded-lg">
								<span
									className="text-3xl relative right-0"
									onClick={closeModal}>
									<MdClose />
								</span>
								<LoginModal onClose={closeModal} />
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
