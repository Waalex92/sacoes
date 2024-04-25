import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import DetailForm from "./DetailForm";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Input,
	Textarea,
	Select,
	SelectItem,
} from "@nextui-org/react";

interface EditModalProps {
	isOpen: boolean;
	onClose: () => void;
	order: any; // Order type to be defined
}

interface Client {
	id: string;
	name: string;
}

interface Sastre {
	id: string;
	name: string;
}

const priorityState = [
	{ label: "Low", value: "low" },
	{ label: "Regular", value: "regular" },
	{ label: "High", value: "high" },
];

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, order }) => {
	const { data: session, status } = useSession();
	const [id, setId] = useState("");
	const [clientes, setClientes] = useState<Client[]>([]);
	const [sastres, setSastres] = useState<Sastre[]>([]);
	const [selectedCliente, setSelectedCliente] = useState("");
	const [selectedSastre, setSelectedSastre] = useState("");
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [description, setDescription] = useState("");
	const [details, setDetails] = useState<any[]>([]);
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState<string[]>([]);
	const [priority, setPriority] = React.useState<string>("");

	const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setPriority(e.target.value);
	};

	const handleClienteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedCliente(e.target.value);
	};

	const handleSastreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedSastre(e.target.value);
	};

	const handleDetailChange = (index: number, detail: any) => {
		const updatedDetails = [...details];
		updatedDetails[index] = detail;
		setDetails(updatedDetails);
	};

	const handleAddDetail = () => {
		setDetails([...details, { typeGarment: "", quantity: 0, costUnit: 0 }]);
	};

	useEffect(() => {
		axios
			.get("http://sacoes11.test/api/users/listClientes", {
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					authorization: `Bearer ${session?.user?.token}`,
				},
			})
			.then((response) => {
				setClientes(response.data.clientes);
			})
			.catch((error) => {
				console.error("Error fetching clientes:", error);
			});

		axios
			.get("http://sacoes11.test/api/users/listSastres", {
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					authorization: `Bearer ${session?.user?.token}`,
				},
			})
			.then((response) => {
				setSastres(response.data.sastres);
			})
			.catch((error) => {
				console.error("Error fetching sastres:", error);
			});
	}, []);

	useEffect(() => {
		if (order) {
			setStartDate(order.startDate);
			setEndDate(order.endDate);
			setDescription(order.description);
			setPriority(order.priority);
			setDetails(order.details);
			setId(order.id);
			setSelectedCliente(order.idCliente);
			setSelectedSastre(order.idSastre);
		}
	}, [order]);

	const handleSaveChanges = async () => {
		setLoading(true);
		setErrors([]);

		try {
			const detailsWithOrderId = details.map((detail) => ({
				...detail,
				quantity: Number(detail.quantity),
				costUnit: Number(detail.costUnit),
				idOrder: order.id,
			}));

			const promises = [];

			promises.push(
				axios.patch(
					`http://sacoes11.test/api/orders/${order.id}`,
					{
						id: id,
						startDate: startDate,
						endDate: endDate,
						description: description,
						priority: priority,
						idCliente: selectedCliente,
						idSastre: selectedSastre,
					},
					{
						headers: {
							"Content-Type": "application/json",
							Accept: "application/json",
							authorization: `Bearer ${session?.user?.token}`,
						},
					}
				)
			);

			detailsWithOrderId.forEach((detail) => {
				if (detail.id) {
					promises.push(
						axios.patch(
							`http://sacoes11.test/api/details/${detail.id}`,
							{
								typeGarment: detail.typeGarment,
								quantity: detail.quantity,
								costUnit: detail.costUnit,
								idOrder: detail.idOrder,
							},
							{
								headers: {
									"Content-Type": "application/json",
									Accept: "application/json",
									authorization: `Bearer ${session?.user?.token}`,
								},
							}
						)
					);
				} else {
					promises.push(
						axios.post(
							`http://sacoes11.test/api/details`,
							{
								typeGarment: detail.typeGarment,
								quantity: detail.quantity,
								costUnit: detail.costUnit,
								idOrder: detail.idOrder,
							},
							{
								headers: {
									"Content-Type": "application/json",
									Accept: "application/json",
									authorization: `Bearer ${session?.user?.token}`,
								},
							}
						)
					);
				}
			});

			const responses = await Promise.all(promises);

			if (responses.some((response) => response.data.error)) {
				setErrors(
					responses
						.filter((response) => response.data.error)
						.map((response) => response.data.error)
				);
			} else {
				onClose();
				window.location.reload();
			}
		} catch (error: any) {
			console.error("Error updating order:", error);
			const errorMessage =
				typeof error === "string"
					? error
					: "An error occurred. Please try again later.";
			setErrors([errorMessage]);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} placement="top">
			<ModalContent className="w-full max-w-xl">
				<ModalHeader className="flex flex-col gap-1">
					Edit Order
				</ModalHeader>
				<ModalBody>
					<Input
						label="Start Date"
						variant="bordered"
						value={startDate}
						onChange={(e) => setStartDate(e.target.value)}
					/>
					<Input
						label="End Date"
						variant="bordered"
						value={endDate}
						onChange={(e) => setEndDate(e.target.value)}
					/>
					<Textarea
						label="Description"
						variant="bordered"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
					<Select
						label="Cliente"
						variant="bordered"
						placeholder="Select the cliente"
						selectedKeys={[selectedCliente]}
						className="max-w-xs"
						onChange={handleClienteChange}>
						{clientes.map((cliente) => (
							<SelectItem key={cliente.id} value={cliente.id}>
								{cliente.name}
							</SelectItem>
						))}
					</Select>
					<Select
						label="Sastre"
						variant="bordered"
						placeholder="Select the sastre"
						selectedKeys={[selectedSastre]}
						className="max-w-xs"
						onChange={handleSastreChange}>
						{sastres.map((sastre) => (
							<SelectItem key={sastre.id} value={sastre.id}>
								{sastre.name}
							</SelectItem>
						))}
					</Select>
					<Select
						label="Priority"
						variant="bordered"
						placeholder="Select the priority"
						selectedKeys={[priority]}
						className="max-w-xs"
						onChange={handleSelectionChange}
						value={priority}>
						{priorityState.map((pri) => (
							<SelectItem key={pri.value} value={pri.value}>
								{pri.label}
							</SelectItem>
						))}
					</Select>
					{details.map((detail, index) => (
						<div
							key={`detail-${index}`}
							className="border-2 p-2 rounded-xl">
							Detail
							<DetailForm
								key={index}
								detail={detail}
								onChange={(updatedDetail) =>
									handleDetailChange(index, updatedDetail)
								}
							/>
						</div>
					))}
					<Button
						color="secondary"
						variant="ghost"
						onPress={handleAddDetail}>
						Add Detail
					</Button>
				</ModalBody>
				<ModalFooter>
					<Button color="danger" variant="light" onPress={onClose}>
						Close
					</Button>
					<Button
						color="secondary"
						variant="ghost"
						disabled={loading}
						onPress={handleSaveChanges}>
						{loading ? "Saving..." : "Save Changes"}
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
export default EditModal;
