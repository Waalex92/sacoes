"use client";
import "../app/globals.css";
import { About } from "@/components/LandingPage/About";
import { Banner } from "@/components/LandingPage/Banner";
import { Footer } from "@/components/LandingPage/Footer";
import { Header } from "@/components/LandingPage/Header";
import { JoinCommunity } from "@/components/LandingPage/JoinCommunity";
import { Serv } from "@/components/LandingPage/Serv";

export default function Home() {
	return (
		<>
			<Header />
			<Banner />
			<Serv />
			<About />
			<JoinCommunity />
			<Footer />
		</>
	);
}
