import {
	LiaYoutube,
	LiaInstagram,
	LiaLinkedinIn,
	LiaPinterestP,
} from "react-icons/lia";
import { dataFooter } from "./Footer.data";
import Link from "next/link";

export function Footer() {
	return (
		<div className=" flex flex-col-reverse px-6 py-6 bg-black/90">
			<div className="grid gap-6 grid-cols-3 md:grid-cols-[1fr,1fr,_350px] text-white">
				{dataFooter.map(({ id, links }) => (
					<div key={id}>
						{links.map(({ id, name, link }) => (
							<Link href={link} key={id} className="block mb-5">
								{name}
							</Link>
						))}
					</div>
				))}
				<div className="md:text-right">
					<h4 className="mb-6 text-xl font-semibold">SaCoEs</h4>
					<p>Calle inventada, 5</p>
					<p>Cochabamba, Bolivia</p>
					<div className="flex gap-4 mt-5 md:justify-end">
						<LiaInstagram
							className="text-3xl cursor-pointer"
							href="#!"
						/>
						<LiaLinkedinIn
							className="text-3xl cursor-pointer"
							href="#!"
						/>
						<LiaPinterestP
							className="text-3xl cursor-pointer"
							href="#!"
						/>
						<LiaYoutube
							className="text-3xl cursor-pointer"
							href="#!"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
