import React from "react";
import { Input, Select, SelectItem } from "@nextui-org/react";

interface DetailFormProps {
	detail: {
		typeGarment: string;
		quantity: string;
		costUnit: string;
	};
	onChange: (detail: any) => void;
}
const garmentType = [
	{ label: "Saco", value: "saco" },
	{ label: "Pantalon", value: "pantalon" },
	{ label: "Chaleco", value: "chaleco" },
	{ label: "Camisa", value: "camisa" },
];

const DetailForm: React.FC<DetailFormProps> = ({ detail, onChange }) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		onChange({ ...detail, [name]: value });
	};

	const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = e.target;
		onChange({ ...detail, [name]: value });
	};

	return (
		<div className="flex gap-2">
			<Select
				labelPlacement="outside"
				label="Type Of Garment"
				variant="bordered"
				className="max-w-xs"
				onChange={handleSelectionChange}
				selectedKeys={[detail.typeGarment]}
				name="typeGarment"
				value={detail.typeGarment}>
				{garmentType.map((gart) => (
					<SelectItem key={gart.value} value={gart.value}>
						{gart.label}
					</SelectItem>
				))}
			</Select>
			<Input
				labelPlacement="outside"
				label="Quantity"
				variant="bordered"
				type="number"
				name="quantity"
				value={detail.quantity}
				onChange={handleChange}
			/>
			<Input
				label="Cost Unit"
				labelPlacement="outside"
				variant="bordered"
				type="number"
				name="costUnit"
				value={detail.costUnit}
				onChange={handleChange}
			/>
		</div>
	);
};

export default DetailForm;
