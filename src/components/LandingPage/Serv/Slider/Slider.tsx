import { Navigation, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { sliderDataImages } from "./Slider.data";
import Image from "next/image";

export function Slider() {
	return (
		<Swiper
			slidesPerView={1.1}
			spaceBetween={10}
			freeMode={true}
			navigation
			pagination={{ clickable: true }}
			scrollbar={{ draggable: true }}
			modules={[Navigation, Scrollbar]}
			className="h-[300px] w-[350px] md:h-[470px] md:w-[450px]"
			grabCursor>
			{sliderDataImages.map(({ id, urlImage }) => (
				<SwiperSlide key={id}>
					<Image
						src={`/home/assets/services/${urlImage}`}
						alt="Services"
						width={800}
						height={500}
						className="h-[300px] w-[350px] md:h-[450px] md:w-[450px] object-cover rounded-xl"></Image>
				</SwiperSlide>
			))}
		</Swiper>
	);
}
