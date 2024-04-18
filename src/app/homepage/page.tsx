"use client";

import { SideNav } from "@/components/SideNav";
import { useSession } from "next-auth/react";
import { Loading } from "@/components/Loading";

const HomePage = () => {
	const { data: session, status } = useSession();

	if (status === "loading") {
		return <Loading />;
	}

	return (
		<div className="container mx-auto">
			<div className="w-full overflow-auto">
				<SideNav />
			</div>
		</div>
	);
};

export default HomePage;
