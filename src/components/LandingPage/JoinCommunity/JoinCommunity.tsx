import { Transition } from "../Transition";
import { FaRegPaperPlane } from "react-icons/fa";

export function JoinCommunity() {
	return (
		<Transition className="grid items-center px-4 py-8 md:py-44 md:px-36 md:grid-cols-2 bg-gradient-to-br from-verde from-10% to-morado to-95%">
			<h3 className="max-w-lg text-5xl text-center md:text-6xl font-semibold text-claro3">
				Únete a nuestra comunidad para enterarte de todo
			</h3>
			<div id="community" className="mx-auto">
				<button className="flex items-center justify-between m-5 gap-5 py-5 text-claro3 transition-all duration-100 bg-morado1 rounded-lg px-7 w-fit  hover:bg-morado">
					<FaRegPaperPlane />
					<span className="ml-3 text-2xl md:text-2xl">
						Únete a la comunidad
					</span>
				</button>
			</div>
		</Transition>
	);
}
