"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import UserTable from "./UserTable";
import { Loading } from "@/components/Loading";

const Users = () => {
	const { data: session, status } = useSession();
	const [users, setUsers] = useState([]);
	const isUnauthenticated = status === "unauthenticated";
	const isLoading = status === "loading";

	useEffect(() => {
		if (session) {
			axios
				.get("http://sacoes11.test/api/users", {
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json",
						authorization: `Bearer ${session?.user?.token}`,
					},
				})
				.then((response) => {
					setUsers(response.data.users);
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
			<UserTable users={users} />
		</div>
	);
};

export default Users;
