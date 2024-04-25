import React from "react";
import { User, Tooltip } from "@nextui-org/react";
import { EditIcon, EyeIcon } from "../../../icons/icons";
import { Switch } from "@nextui-org/react";

export type User = {
	id: string;
	name: string;
	email: string;
	image: string;
	lasname: string;
	active: boolean;
};
interface ColumnsProps {
	items: User[];
	emptyContent: string;
}

export const columns = [
	{
		key: "id",
		label: "ID",
	},
	{
		key: "name",
		label: "NAME",
	},
	{
		key: "lastname",
		label: "LASTNAME",
	},
	{
		key: "address",
		label: "ADDRESS",
	},
	{
		key: "phone",
		label: "PHONE",
	},
	{
		key: "cellPhone",
		label: "CELLPHONE",
	},
	{
		key: "role",
		label: "ROLE",
	},
	{
		key: "actions",
		label: "Actions",
	},
];

export const renderCell = (
	user: User,
	columnKey: React.Key,
	handleEditClick: (user: User) => void,
	handleViewClick: (user: User) => void,
	openEditModal: any,
	openViewModa: any,
	toggleUserActive: (user: User) => void
) => {
	const cellValue = user[columnKey as keyof User];

	switch (columnKey) {
		case "name":
			return (
				<User
					avatarProps={{ radius: "lg", src: user.image }}
					description={user.email}
					name={cellValue}>
					{user.email}
				</User>
			);
		case "actions":
			return (
				<div className="relative flex items-center gap-4">
					<Tooltip content="Details">
						<span
							className="cursor-pointer text-lg text-default-400 active:opacity-50"
							onClick={() => handleViewClick(user)}>
							<EyeIcon />
						</span>
					</Tooltip>
					<Tooltip content="Edit user">
						<span
							className="cursor-pointer text-lg text-default-400 active:opacity-50"
							onClick={() => handleEditClick(user)}>
							<EditIcon />
						</span>
					</Tooltip>
					<Tooltip color="danger" content="Enable/Disable user">
						<span className="cursor-pointer text-lg text-danger active:opacity-50">
							<Switch
								isSelected={user.active}
								onChange={() => toggleUserActive(user)}
								color="secondary"></Switch>
						</span>
					</Tooltip>
				</div>
			);
		default:
			return cellValue;
	}
};
