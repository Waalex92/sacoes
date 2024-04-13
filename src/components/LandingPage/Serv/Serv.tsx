"use client";

import { Transition } from "../Transition";
import { Slider } from "./Slider";

export function Serv() {
	return (
		<Transition className="grid px-4 py-12 md:p-24 md:grid-cols-2 md:gap-6">
			<div className="max-w-xl mb-7 " id="serv">
				<h4 className="text-2xl">Servicios</h4>
				<h2 className="my-4 text-3xl font-semibold">
					Ofrecemos una amplia gama de servicios de sastrería y
					confección diseñados para satisfacer tus necesidades y
					deseos únicos.
				</h2>
				<ul className="list-disc list-inside">
					<li>Trajes a medida</li>
					<li>Camisas personalizadas</li>
					<li>Ajustes y modificaciones</li>
					<li>Asesoramiento de estilo personalizado</li>
				</ul>
			</div>
			<div className="flex items-center justify-center">
				<Slider />
			</div>
		</Transition>
	);
}
