"use client";
import { useSession } from "next-auth/react";
import { useCallback, useMemo, useState } from "react";
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
import { User, columns, renderCell } from "./columns";
import { SearchIcon, PlusIcon } from "../../../icons/icons";
import EditModal from "@/components/Modals/Users/EditModal";
import ViewModal from "@/components/Modals/Users/ViewModal";
import NewUserModal from "@/components/Modals/Users/NewUserModal";
import axios from "axios";

interface TableBodyProps<T> {
	items: T[];
	emptyContent: string;
	handleEditClick: (user: T) => void;
	handleViewClick: (user: T) => void;
}

export default function UserTable({ users }: { users: User[] }) {
	const { data: session, status } = useSession();
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [viewModalOpen, setViewModalOpen] = useState(false);
	const [newUserModalOpen, setNewUserModalOpen] = useState(false);
	const [selectedUser, setSelectedUser] = useState<User | null>(null);
	const [filterValue, setFilterValue] = useState("");
	const hasSearchFilter = Boolean(filterValue);

	const handleNewUserClick = () => {
		setNewUserModalOpen(true);
	};

	const toggleUserActive = async (user: User) => {
		try {
			const response = await axios.patch(
				user.active
					? `http://sacoes11.test/api/users/${user.id}/disable`
					: `http://sacoes11.test/api/users/${user.id}/enable`,
				{},
				{
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json",
						authorization: `Bearer ${session?.user?.token}`,
					},
				}
			);
			setSelectedUser((prevUser) =>
				prevUser ? { ...prevUser, active: !prevUser.active } : null
			);
			window.location.reload();
		} catch (error) {
			console.error("Error:", error);
		}
	};

	const handleEditClick = (user: User) => {
		setSelectedUser(user);
		setEditModalOpen(true);
	};

	const handleViewClick = (user: User) => {
		setSelectedUser(user);
		setViewModalOpen(true);
	};

	const handleCloseEditModal = () => {
		setSelectedUser(null);
		setEditModalOpen(false);
	};
	const handleCloseViewModal = () => {
		setSelectedUser(null);
		setViewModalOpen(false);
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
			<div className="container flex flex-col">
				<div className="flex items-center justify-between">
					<Input
						isClearable
						className="sm:w-full max-w-[50%]"
						placeholder="Search by name..."
						startContent={<SearchIcon />}
						value={filterValue}
						onClear={() => onClear()}
						onValueChange={onSearchChange}
					/>
					<Button
						color="secondary"
						endContent={<PlusIcon />}
						onClick={handleNewUserClick}>
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
				<TableBody
					items={sortedItems}
					emptyContent={"No users to display."}>
					{(user) => (
						<TableRow key={user.id}>
							{(columnKey) => (
								<TableCell>
									{renderCell(
										user,
										columnKey,
										handleEditClick,
										handleViewClick,
										editModalOpen,
										viewModalOpen,
										toggleUserActive
									)}
								</TableCell>
							)}
						</TableRow>
					)}
				</TableBody>
			</Table>
			<EditModal
				isOpen={editModalOpen}
				onClose={handleCloseEditModal}
				user={selectedUser}
			/>
			<ViewModal
				isOpen={viewModalOpen}
				onClose={handleCloseViewModal}
				userId={selectedUser ? selectedUser.id : ""}
			/>
			<NewUserModal
				isOpen={newUserModalOpen}
				onClose={() => setNewUserModalOpen(false)}
			/>
		</>
	);
}
