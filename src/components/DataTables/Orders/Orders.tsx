"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import OrderTable from "./OrderTable";
import { Loading } from "@/components/Loading";

const Orders = () => {
	const { data: session, status } = useSession();
	const [orders, setOrders] = useState([]);
	const isUnauthenticated = status === "unauthenticated";
	const isLoading = status === "loading";

	useEffect(() => {
		if (session) {
			axios
				.get("http://sacoes11.test/api/orders", {
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json",
						Authorization: `Bearer ${session?.user?.token}`,
					},
				})
				.then((response) => {
					setOrders(response.data.orders);
				})
				.catch((error) => {
					console.error("Error fetching data:", error);
				});
		}
	}, [session]);

	if (isLoading) {
		return <Loading />;
	}

	if (isUnauthenticated) {
		return <p>Acceso denegado. Necesitas iniciar sesión.</p>;
	}

	return (
		<div className="pr-4 sm:pt-4 pt-16">
			<OrderTable orders={orders} />
		</div>
	);
};

export default Orders;
