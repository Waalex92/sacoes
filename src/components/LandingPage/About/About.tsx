import Image from "next/image";
import { Transition } from "../Transition";

export function About() {
	return (
		<Transition className="flex flex-col px-16 py-12 md:p-24 md:pb-44 items-center">
			<div
				className="text-claro1 flex flex-col items-center text-center"
				id="about">
				<h4 className="font-bold text-2xl">Sobre nosotros</h4>
				<h2 className="my-2 text-3xl font-semibold">
					Estamos comprometidos con la excelencia en cada prenda que
					creamos.
				</h2>
				<p className="my-4">
					Con años de experiencia en el arte de la sastrería y la
					confección, nuestro equipo de talentosos artesanos combina
					habilidades tradicionales con un enfoque moderno para
					ofrecerte resultados excepcionales.
				</p>
				<p className="my-4">
					Fusionamos la artesanía tradicional con la innovación
					contemporánea para crear prendas únicas que reflejen tu
					individualidad y sofisticación.
				</p>
				<div className="flex items-center">
					<Image
						src="/home/assets/about_us/about1.jpg"
						alt="About"
						width={500}
						height={50}
						className="h-[320px] w-[700px] object-cover rounded-xl"
						priority
					/>
				</div>
			</div>
		</Transition>
	);
}
