"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Input,
} from "@nextui-org/react";
import { MailIcon, LockIcon } from "../../icons/icons";

interface EditModalProps {
	onClose: () => void;
}

const LoginModal: React.FC<EditModalProps> = ({ onClose }) => {
	const [errors, setErrors] = useState<string[]>([]);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false); // Estado para controlar el indicador de carga
	const router = useRouter();

	const handleSubmit = async () => {
		setLoading(true);
		setErrors([]);

		const responseNextAuth = await signIn("credentials", {
			email,
			password,
			redirect: false,
		});

		if (responseNextAuth?.error) {
			setErrors(responseNextAuth.error.split(","));
			setLoading(false);
		} else {
			router.push("/homepage");
			onClose();
		}
	};

	return (
		<div>
			<Modal isOpen={true} onClose={onClose} placement="center">
				<ModalContent>
					<ModalHeader>Log in</ModalHeader>
					<ModalBody>
						<Input
							color="default"
							size="lg"
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							endContent={<MailIcon fill="currentColor" />}
						/>
						<Input
							color="default"
							size="lg"
							placeholder="Password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							endContent={<LockIcon fill="currentColor" />}
						/>
						{errors.length > 0 && (
							<div
								style={{
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
						<Button
							color="danger"
							variant="light"
							onPress={onClose}>
							Cancel
						</Button>
						<Button
							color="secondary"
							variant="ghost"
							disabled={loading}
							onPress={handleSubmit}>
							{loading ? "Logging in..." : "Login"}
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</div>
	);
};
export default LoginModal;
