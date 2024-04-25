import React, { useState } from "react";
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
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
} from "@nextui-org/react";

interface NewUserModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const NewUserModal: React.FC<NewUserModalProps> = ({ isOpen, onClose }) => {
	const { data: session, status } = useSession();
	const [name, setName] = useState("");
	const [lastname, setLastname] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [address, setAddress] = useState("");
	const [phone, setPhone] = useState("");
	const [cellPhone, setCellPhone] = useState("");
	const [selectedKeys, setSelectedKeys] = useState(new Set(["admin"]));
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState<string[]>([]);

	const selectedValue = React.useMemo(
		() => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
		[selectedKeys]
	);

	const handleSaveChanges = async () => {
		setLoading(true);
		setErrors([]);

		try {
			const response = await axios.post(
				`http://sacoes11.test/api/users`,
				{
					name: name,
					lastname: lastname,
					email: email,
					address: address,
					phone: phone,
					cellPhone: cellPhone,
					password: password,
					active: 1,
					role: selectedValue,
				},
				{
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json",
						authorization: `Bearer ${session?.user?.token}`,
					},
				}
			);

			if (response.data.errors) {
				setErrors([response.data.errors]);
			} else {
				onClose();
				window.location.reload();
			}
		} catch (error: any) {
			console.log(error.response.data.errors);
			setErrors(error.response.data);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} placement="top-center">
			<ModalContent>
				<ModalHeader className="flex flex-col gap-1">
					New User
				</ModalHeader>
				<ModalBody>
					<Input
						autoFocus
						isRequired
						label="Email"
						variant="bordered"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Input
						isRequired
						label="Password"
						variant="bordered"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Input
						isRequired
						label="Name"
						variant="bordered"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<Input
						isRequired
						label="Lastname"
						variant="bordered"
						value={lastname}
						onChange={(e) => setLastname(e.target.value)}
					/>
					<Input
						isRequired
						label="Address"
						variant="bordered"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
					/>
					<Input
						isRequired
						label="Phone"
						variant="bordered"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
					/>
					<Input
						isRequired
						label="CellPhone"
						variant="bordered"
						value={cellPhone}
						onChange={(e) => setCellPhone(e.target.value)}
					/>
					<Dropdown>
						<DropdownTrigger>
							<Button variant="bordered" className="capitalize">
								{selectedValue}
							</Button>
						</DropdownTrigger>
						<DropdownMenu
							aria-label="Single selection example"
							variant="flat"
							disallowEmptySelection
							selectionMode="single"
							selectedKeys={selectedKeys}
							onSelectionChange={setSelectedKeys}>
							<DropdownItem key="admin">Admin</DropdownItem>
							<DropdownItem key="sastre">Sastre</DropdownItem>
							<DropdownItem key="recepcionista">
								Recepcionista
							</DropdownItem>
							<DropdownItem key="cliente">Cliente</DropdownItem>
						</DropdownMenu>
					</Dropdown>
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
export default NewUserModal;
