"use client";
import { useCallback, useMemo, useState } from "react";
import {
	Modal,
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	Input,
	Pagination,
	SortDescriptor,
} from "@nextui-org/react";
import { User, columns, renderCell } from "./columns";
import { SearchIcon } from "../../../icons/icons";
import EditModal from "@/components/Modals/Users/EditModal";

interface TableBodyProps<T> {
	items: T[];
	emptyContent: string;
	handleEditClick: (user: T) => void; // Asegúrate de que handleEditClick esté definido aquí
}

export default function UserTable({ users }: { users: User[] }) {
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [selectedUser, setSelectedUser] = useState<User | null>(null);
	const [filterValue, setFilterValue] = useState("");
	const hasSearchFilter = Boolean(filterValue);

	const handleEditClick = (user: User) => {
		setSelectedUser(user);
		setEditModalOpen(true);
	};

	const handleCloseModal = () => {
		setSelectedUser(null);
		setEditModalOpen(false);
	};

	const filteredItems = useMemo(() => {
		let filteredUsers = [...users];

		if (hasSearchFilter) {
			filteredUsers = filteredUsers.filter((user) =>
				user.name.toLowerCase().includes(filterValue.toLowerCase())
			);
		}

		return filteredUsers;
	}, [users, filterValue, hasSearchFilter]);

	const rowsPerPage = 7;
	const [page, setPage] = useState(1);
	const pages = Math.ceil(filteredItems.length / rowsPerPage);

	const items = useMemo(() => {
		const start = (page - 1) * rowsPerPage;
		const end = start + rowsPerPage;

		return filteredItems.slice(start, end);
	}, [page, filteredItems]);

	const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
		column: "name",
		direction: "ascending",
	});

	const sortedItems = useMemo(() => {
		return [...items].sort((a: User, b: User) => {
			const first = a[sortDescriptor.column as keyof User] as string;
			const second = b[sortDescriptor.column as keyof User] as string;
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
			<div className="container flex flex-col gap-4">
				<div className="flex items-center justify-between gap-3">
					<Input
						isClearable
						className="w-full sm:max-w-[44%]"
						placeholder="Search by name..."
						startContent={<SearchIcon />}
						value={filterValue}
						onClear={() => onClear()}
						onValueChange={onSearchChange}
					/>
				</div>
			</div>
		);
	}, [filterValue, onSearchChange, onClear]);

	return (
		<>
			<Table
				aria-label="Users table"
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
							{...(column.key === "name"
								? { allowsSorting: true }
								: {})}>
							{column.label}
						</TableColumn>
					)}
				</TableHeader>
				<TableBody items={items} emptyContent={"No users to display."}>
					{(user) => (
						<TableRow key={user.id}>
							{(columnKey) => (
								<TableCell>
									{renderCell(
										user,
										columnKey,
										handleEditClick,
										editModalOpen
									)}
								</TableCell>
							)}
						</TableRow>
					)}
				</TableBody>
			</Table>
			<EditModal
				isOpen={editModalOpen}
				onClose={handleCloseModal}
				user={selectedUser}
			/>
		</>
	);
}
