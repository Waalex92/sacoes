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
} from "@nextui-org/react";
import { Loading } from "@/components/Loading";

interface ViewModalProps {
	isOpen: boolean;
	onClose: () => void;
	userId: string;
}

const ViewModal: React.FC<ViewModalProps> = ({ isOpen, onClose, userId }) => {
	const { data: session, status } = useSession();
	const [user, setUser] = useState<any>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchUser = async () => {
			setLoading(true);
			try {
				const response = await axios.get(
					`http://sacoes11.test/api/users/${userId}`,
					{
						headers: {
							"Content-Type": "application/json",
							Accept: "application/json",
							authorization: `Bearer ${session?.user?.token}`,
						},
					}
				);
				setUser(response.data);
			} catch (error) {
				console.error("Error fetching user:", error);
				setError("An error occurred while fetching user data.");
			} finally {
				setLoading(false);
			}
		};

		if (isOpen) {
			fetchUser();
		}
	}, [isOpen, userId]);

	return (
		<Modal isOpen={isOpen} onClose={onClose} placement="top-center">
			<ModalContent>
				<ModalHeader className="flex flex-col gap-1">
					User Details
				</ModalHeader>
				<ModalBody>
					{loading && <Loading />}
					{error && <p>{error}</p>}
					{user && (
						<>
							<Input
								isDisabled
								autoFocus
								label="Name"
								variant="bordered"
								value={user.user.name}
							/>
							<Input
								isDisabled
								label="Lastname"
								variant="bordered"
								value={user.user.lastname}
							/>
							<Input
								isDisabled
								label="Email"
								variant="bordered"
								value={user.user.email}
							/>
							<Input
								isDisabled
								label="Address"
								variant="bordered"
								value={user.user.address}
							/>
							<Input
								isDisabled
								label="Phone"
								variant="bordered"
								value={user.user.phone}
							/>
							<Input
								isDisabled
								label="CellPhone"
								variant="bordered"
								value={user.user.cellPhone}
							/>
							<Input
								isDisabled
								label="Role"
								variant="bordered"
								value={user.role}
							/>
							<Input
								isDisabled
								label="Active"
								variant="bordered"
								value={user.user.active}
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
