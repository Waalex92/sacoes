// EditModal.jsx
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

interface EditModalProps {
	isOpen: boolean;
	onClose: () => void;
	user: any;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, user }) => {
	const { data: session, status } = useSession();
	const [name, setName] = useState("");
	const [lastname, setLastname] = useState("");
	const [email, setEmail] = useState("");
	const [address, setAddress] = useState("");
	const [phone, setPhone] = useState("");
	const [cellPhone, setCellPhone] = useState("");
	const [role, setRole] = useState("");
	const [active, setActive] = useState("");
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState<string[]>([]);

	useEffect(() => {
		if (user) {
			setName(user.name);
			setLastname(user.lastname);
			setEmail(user.email);
			setAddress(user.address);
			setPhone(user.phone);
			setCellPhone(user.cellPhone);
			setRole(user.role);
			setActive(user.active);
		}
	}, [user]);

	const handleSaveChanges = async () => {
		setLoading(true);
		setErrors([]);

		try {
			// Realizar la solicitud al backend para actualizar el usuario
			const response = await axios.patch(
				`http://sacoes11.test/api/users/${user.id}`,
				{
					name: name,
					lastname: lastname,
					email: email,
					address: address,
					phone: phone,
					cellPhone: cellPhone,
					role: role,
					active: active,
				},
				{
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json",
						authorization: `Bearer ${session?.user?.token}`,
					},
				}
			);

			if (response.data.error) {
				setErrors([response.data.error]);
			} else {
				onClose();
			}
		} catch (error) {
			console.error("Error updating user:", error);
			setErrors(["An error occurred. Please try again later."]);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} placement="top-center">
			<ModalContent>
				<ModalHeader className="flex flex-col gap-1">
					Edit User
				</ModalHeader>
				<ModalBody>
					<Input
						autoFocus
						label="Name"
						variant="bordered"
						value={name}
						onChange={(e) => setName(e.target.value)} // Actualiza el estado del nombre
					/>
					<Input
						label="Lastname"
						variant="bordered"
						value={lastname}
						onChange={(e) => setLastname(e.target.value)} // Actualiza el estado del apellido
					/>
					<Input
						label="Email"
						variant="bordered"
						value={email}
						onChange={(e) => setEmail(e.target.value)} // Actualiza el estado del apellido
					/>
					<Input
						label="Address"
						variant="bordered"
						value={address}
						onChange={(e) => setAddress(e.target.value)} // Actualiza el estado del apellido
					/>
					<Input
						label="Phone"
						variant="bordered"
						value={phone}
						onChange={(e) => setPhone(e.target.value)} // Actualiza el estado del apellido
					/>
					<Input
						label="CellPhone"
						variant="bordered"
						value={cellPhone}
						onChange={(e) => setCellPhone(e.target.value)} // Actualiza el estado del apellido
					/>
					<Input
						label="Role"
						variant="bordered"
						value={role}
						onChange={(e) => setRole(e.target.value)} // Actualiza el estado del apellido
					/>
					<Input
						label="Active"
						variant="bordered"
						value={active}
						onChange={(e) => setActive(e.target.value)} // Actualiza el estado del apellido
					/>
				</ModalBody>
				<ModalFooter>
					<Button color="danger" variant="ghost" onPress={onClose}>
						Close
					</Button>
					<Button
						color="success"
						variant="ghost"
						disabled={loading}
						onPress={handleSaveChanges}>
						{loading ? "Saving..." : "Save Changes"}
					</Button>
				</ModalFooter>
			</ModalContent>
			{errors.length > 0 && (
				<div className="alert-danger mt-2">
					<ul className="mb-0">
						{errors.map((error) => (
							<li key={error}>{error}</li>
						))}
					</ul>
				</div>
			)}
		</Modal>
	);
};
export default EditModal;
