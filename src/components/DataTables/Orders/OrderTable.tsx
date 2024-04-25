"use client";
import { useState, useMemo, useCallback } from "react";
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	Input,
	Pagination,
	SortDescriptor,
	Button,
} from "@nextui-org/react";
import { Order, columns, renderCell } from "./columns";
import { SearchIcon, PlusIcon } from "../../../icons/icons";
import EditModal from "@/components/Modals/Orders/EditModal";
import ViewModal from "@/components/Modals/Orders/ViewModal";
import NewOrderModal from "@/components/Modals/Orders/NewOrderModal";
import axios from "axios";

interface TableBodyProps<T> {
	items: T[];
	emptyContent: string;
	handleEditClick: (order: T) => void;
	handleViewClick: (order: T) => void;
}

export default function OrderTable({ orders }: { orders: Order[] }) {
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [viewModalOpen, setViewModalOpen] = useState(false);
	const [newOrderModalOpen, setNewOrderModalOpen] = useState(false);
	//const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
	const [filterValue, setFilterValue] = useState("");
	const hasSearchFilter = Boolean(filterValue);

	const handleNewOrderClick = () => {
		setNewOrderModalOpen(true);
	};

	const handleEditClick = (order: Order) => {
		//setSelectedOrder(order);
		setEditModalOpen(true);
	};

	const handleViewClick = (order: Order) => {
		//setSelectedOrder(order);
		setViewModalOpen(true);
	};

	const handleCloseEditModal = () => {
		//setSelectedOrder(null);
		setEditModalOpen(false);
	};
	const handleCloseViewModal = () => {
		//setSelectedOrder(null);
		setViewModalOpen(false);
	};

	const filteredItems = useMemo(() => {
		let filteredOrders = [...orders];
		if (hasSearchFilter) {
			filteredOrders = filteredOrders.filter((order) =>
				order.description
					.toLowerCase()
					.includes(filterValue.toLowerCase())
			);
		}
		return filteredOrders;
	}, [orders, filterValue, hasSearchFilter]);

	const rowsPerPage = 7;
	const [page, setPage] = useState(1);
	const pages = Math.ceil(filteredItems.length / rowsPerPage);

	const items = useMemo(() => {
		const start = (page - 1) * rowsPerPage;
		const end = start + rowsPerPage;
		return filteredItems.slice(start, end);
	}, [page, filteredItems]);

	const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
		column: "description",
		direction: "ascending",
	});

	const sortedItems = useMemo(() => {
		return [...items].sort((a: Order, b: Order) => {
			const first = a[sortDescriptor.column as keyof Order] as string;
			const second = b[sortDescriptor.column as keyof Order] as string;
			const cmp = first < second ? -1 : first > second ? 1 : 0;
			return sortDescriptor.direction === "descending" ? -cmp : cmp;
		});
	}, [sortDescriptor, items]);

	const onSearchChange = useCallback((value?: string) => {
		if (value) {
			setFilterValue(value);
			setPage(1);
		} else {
			setFilterValue("");
		}
	}, []);

	const onClear = useCallback(() => {
		setFilterValue("");
		setPage(1);
	}, []);

	const topContent = useMemo(() => {
		return (
			<div className="container flex flex-col">
				<div className="flex items-center justify-between">
					<Input
						isClearable
						startContent={<SearchIcon />}
						className="sm:w-full max-w-[50%]"
						placeholder="Search by description..."
						value={filterValue}
						onClear={() => onClear()}
						onValueChange={onSearchChange}
					/>
					<Button
						color="secondary"
						onClick={handleNewOrderClick}
						endContent={<PlusIcon />}>
						New
					</Button>
				</div>
			</div>
		);
	}, [filterValue, onSearchChange, onClear]);

	return (
		<>
			<Table
				isStriped
				aria-label="Orders table"
				topContent={topContent}
				topContentPlacement="outside"
				bottomContent={
					<div className="flex w-full justify-center">
						<Pagination
							isCompact
							showControls
							showShadow
							color="secondary"
							page={page}
							total={pages}
							onChange={(page) => setPage(page)}
						/>
					</div>
				}
				bottomContentPlacement="outside"
				sortDescriptor={sortDescriptor}
				onSortChange={setSortDescriptor}
				classNames={{
					wrapper: "min-h-[222px]",
				}}>
				<TableHeader columns={columns}>
					{(column) => (
						<TableColumn
							key={column.key}
							{...(column.key === "description"
								? { allowsSorting: true }
								: {})}>
							{column.label}
						</TableColumn>
					)}
				</TableHeader>
				<TableBody
					items={sortedItems}
					emptyContent={"No orders to display."}>
					{(order) => (
						<TableRow key={order.id}>
							{(columnKey) => (
								<TableCell>
									{renderCell(
										order,
										columnKey,
										handleEditClick,
										handleViewClick,
										editModalOpen,
										viewModalOpen
									)}
								</TableCell>
							)}
						</TableRow>
					)}
				</TableBody>
			</Table>
			{/**  
			<EditModal
				isOpen={editModalOpen}
				onClose={handleCloseEditModal}
				//order={selectedOrder}
			/>
			<ViewModal
				isOpen={viewModalOpen}
				onClose={handleCloseViewModal}
				//orderId={selectedOrder ? selectedOrder.id : ""}
			/>
			<NewOrderModal
				isOpen={newOrderModalOpen}
				onClose={() => setNewOrderModalOpen(false)}
			/>
			 * 
			*/}
		</>
	);
}
