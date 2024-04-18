import React from "react";
import { User, Tooltip } from "@nextui-org/react";
import { DeleteIcon, EditIcon, EyeIcon } from "../../../icons/icons";

export type User = {
	id: string;
	name: string;
	email: string;
	image: string;
	lasname: string;
};
interface ColumnsProps {
	items: User[];
	emptyContent: string;
	onEditClick: (user: User) => void;
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
		key: "active",
		label: "ACTIVE",
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
	openEditModal: any
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
						<span className="cursor-pointer text-lg text-default-400 active:opacity-50">
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
					<Tooltip color="danger" content="Delete user">
						<span className="cursor-pointer text-lg text-danger active:opacity-50">
							<DeleteIcon />
						</span>
					</Tooltip>
				</div>
			);
		default:
			return cellValue;
	}
};
