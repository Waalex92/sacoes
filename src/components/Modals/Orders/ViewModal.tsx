import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Input,
	Textarea,
} from "@nextui-org/react";
import { Loading } from "@/components/Loading";

interface ViewModalProps {
	isOpen: boolean;
	onClose: () => void;
	orderId: string;
}

const ViewModal: React.FC<ViewModalProps> = ({ isOpen, onClose, orderId }) => {
	const { data: session, status } = useSession();
	const [order, setOrder] = useState<any>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchOrder = async () => {
			setLoading(true);
			try {
				const response = await axios.get(
					`http://sacoes11.test/api/orders/${orderId}`,
					{
						headers: {
							"Content-Type": "application/json",
							Accept: "application/json",
							authorization: `Bearer ${session?.user?.token}`,
						},
					}
				);
				setOrder(response.data);
				console.log(response);
				console.log(response.data);
			} catch (error) {
				console.error("Error fetching user:", error);
				setError("An error occurred while fetching user data.");
			} finally {
				setLoading(false);
			}
		};

		if (isOpen) {
			fetchOrder();
		}
	}, [isOpen, orderId]);

	return (
		<Modal isOpen={isOpen} onClose={onClose} placement="top">
			<ModalContent>
				<ModalHeader className="flex flex-col gap-1">
					Order Details
				</ModalHeader>
				<ModalBody>
					{loading && <Loading />}
					{error && <p>{error}</p>}
					{order && (
						<>
							<Input
								isDisabled
								aria-multiline
								autoFocus
								label="Start Date"
								variant="bordered"
								value={order.order.startDate}
							/>
							<Input
								isDisabled
								label="End Date"
								variant="bordered"
								value={order.order.endDate}
							/>
							<Textarea
								readOnly
								label="Description"
								variant="bordered"
								value={order.order.description}
							/>
							<Input
								isDisabled
								label="Priority"
								variant="bordered"
								value={order.order.priority}
							/>
							<Input
								isDisabled
								label="Admin/Receptionist"
								variant="bordered"
								value={`${order.adminRecepcionista.name} ${order.adminRecepcionista.lastname}`}
							/>
							<Input
								isDisabled
								label="Client"
								variant="bordered"
								value={`${order.cliente.name} ${order.cliente.lastname}`}
							/>
							<Input
								isDisabled
								label="Tailor"
								variant="bordered"
								value={`${order.sastre.name} ${order.sastre.lastname}`}
							/>
							<Textarea
								readOnly
								variant="bordered"
								label="Details"
								rows={
									order.details
										? order.details.length * 4 + 2
										: 2
								} // Ajusta el número de filas según la longitud de order.details
								value={
									order.details &&
									order.details
										.map(
											(detail: any, index: number) =>
												`Detail ${
													index + 1
												}\n    Type: ${
													detail.typeGarment
												}\n    Quantity: ${
													detail.quantity
												}\n    Cost/Unit: ${
													detail.costUnit
												}`
										)
										.join("\n\n")
								}
							/>
						</>
					)}
				</ModalBody>
				<ModalFooter>
					<Button color="danger" variant="light" onPress={onClose}>
						Close
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default ViewModal;
