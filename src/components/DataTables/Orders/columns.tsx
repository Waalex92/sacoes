import React from "react";
import { Tooltip } from "@nextui-org/react";
import { EditIcon, EyeIcon } from "../../../icons/icons";

export type Order = {
	id: string;
	description: string;
	startDate: string;
	endDate: string;
	priority: string;
	details: any[];
	admin_recepcionista: any;
	cliente: any;
	sastre: any;
};

interface ColumnsProps {
	items: Order[];
	emptyContent: string;
}

export const columns = [
	{ key: "id", label: "ID" },
	{ key: "startDate", label: "START DATE" },
	{ key: "endDate", label: "END DATE" },
	{ key: "priority", label: "PRIORITY" },
	{ key: "cliente", label: "CLIENT" },
	{ key: "details", label: "DETAILS" },
	//{ key: "admin_recepcionista", label: "RECEPCIONIST" },
	//{ key: "sastre", label: "TAILOR" },
	{ key: "description", label: "DESCRIPTION" },
	{ key: "actions", label: "ACTIONS" },
];

export const renderCell = (
	order: Order,
	columnKey: React.Key,
	handleEditClick: (order: Order) => void,
	handleViewClick: (order: Order) => void,
	openEditModal: any,
	openViewModa: any
) => {
	const cellValue = order[columnKey as keyof Order];

	switch (columnKey) {
		case "details":
			return (
				<ul className="list-disc list-inside">
					{order.details.map((detail, index) => (
						<li key={index as number}>
							<b>{"Detail " + (index + 1)}</b>
							<ul className="list-disc">
								{Object.entries(detail).map(([key, value]) => (
									<li key={key}>
										<strong className="uppercase">
											{key}:
										</strong>{" "}
										{value as string}
									</li>
								))}
							</ul>
						</li>
					))}
				</ul>
			);
		case "cliente":
			//case "admin_recepcionista":
			//case "sastre":
			const person = order[columnKey];
			return (
				<ul className="list-disc list-inside">
					{Object.entries(person).map(([key, value]) => (
						<li key={key}>
							<strong className="uppercase">{key}:</strong>{" "}
							{value as string}
						</li>
					))}
				</ul>
			);
		case "actions":
			return (
				<div className="relative flex items-center gap-4">
					<Tooltip content="Details">
						<span
							className="cursor-pointer text-lg text-default-400 active:opacity-50"
							onClick={() => handleViewClick(order)}>
							<EyeIcon />
						</span>
					</Tooltip>
					<Tooltip content="Edit order">
						<span
							className="cursor-pointer text-lg text-default-400 active:opacity-50"
							onClick={() => handleEditClick(order)}>
							<EditIcon />
						</span>
					</Tooltip>
				</div>
			);
		default:
			return cellValue;
	}
};
