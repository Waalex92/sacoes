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
		}
	}, [user]);

	const handleSaveChanges = async () => {
		setLoading(true);
		setErrors([]);

		try {
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
				window.location.reload();
			}
		} catch (error: any) {
			console.error("Error updating user:", error);
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
						onChange={(e) => setName(e.target.value)}
					/>
					<Input
						label="Lastname"
						variant="bordered"
						value={lastname}
						onChange={(e) => setLastname(e.target.value)}
					/>
					<Input
						label="Email"
						variant="bordered"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Input
						label="Address"
						variant="bordered"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
					/>
					<Input
						label="Phone"
						variant="bordered"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
					/>
					<Input
						label="CellPhone"
						variant="bordered"
						value={cellPhone}
						onChange={(e) => setCellPhone(e.target.value)}
					/>
					<Input
						label="Role"
						variant="bordered"
						value={role}
						onChange={(e) => setRole(e.target.value)}
					/>
					{errors.length > 0 && (
						<div
							style={{
								border: "1px solid white",
								borderRadius: "15px",
								backgroundColor: "red",
								color: "white",
								padding: "10px",
								marginBottom: "10px",
							}}>
							<ul>
								{errors.map((error, index) => (
									<li key={index}>{error}</li>
								))}
							</ul>
						</div>
					)}
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
