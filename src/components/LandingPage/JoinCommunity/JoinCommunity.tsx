import { Transition } from "../Transition";
import { FaRegPaperPlane } from "react-icons/fa";

export function JoinCommunity() {
	return (
		<Transition className="grid items-center px-4 py-16 md:py-28 md:grid-cols-2 bg-gradient-to-br from-plomoClaro from-10% via-plomo via-30% to-black to-95%">
			<h3 className="max-w-lg text-5xl text-center md:text-6xl font-semibold text-white">
				Únete a nuestra comunidad para enterarte de todo
			</h3>
			<div id="community" className="mx-auto">
				<button className="flex items-center justify-between py-5 text-white transition-all duration-100 bg-black rounded-lg px-7 w-fit  hover:bg-plomo hover:text-black">
					<FaRegPaperPlane />
					<span className="ml-3 text-2xl md:text-2xl">
						Únete a la comunidad
					</span>
				</button>
			</div>
		</Transition>
	);
}
