import React from "react";

const RegisterForm = () => {
	return (
		<form className="space-y-6 m-2">
			<div>
				<label
					htmlFor="name"
					className="block text-sm font-medium text-gray-700">
					Name
				</label>
				<input
					type="text"
					name="name"
					id="name"
					required
					className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
				/>
			</div>
			<div>
				<label
					htmlFor="lastName"
					className="block text-sm font-medium text-gray-700">
					Last Name
				</label>
				<input
					type="text"
					name="lastName"
					id="lastName"
					required
					className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
				/>
			</div>
			<div>
				<label
					htmlFor="address"
					className="block text-sm font-medium text-gray-700">
					Address
				</label>
				<input
					type="text"
					name="address"
					id="address"
					required
					className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
				/>
			</div>
			<div>
				<label
					htmlFor="phone"
					className="block text-sm font-medium text-gray-700">
					Phone
				</label>
				<input
					type="tel"
					name="phone"
					id="phone"
					className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
				/>
			</div>
			<div>
				<label
					htmlFor="cellPhone"
					className="block text-sm font-medium text-gray-700">
					Cell Phone
				</label>
				<input
					type="tel"
					name="cellPhone"
					id="cellPhone"
					className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
				/>
			</div>
			<div>
				<label
					htmlFor="role"
					className="block text-sm font-medium text-gray-700">
					Role
				</label>
				<select
					id="role"
					name="role"
					required
					className="text-slate-700 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
					<option value="admin">Admin</option>
					<option value="user">Client</option>
					<option value="client">Receptionist</option>
					<option value="client">Tailor</option>
				</select>
			</div>
			<div>
				<label
					htmlFor="email"
					className="block text-sm font-medium text-gray-700">
					Email
				</label>
				<input
					type="email"
					name="email"
					id="email"
					required
					className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
				/>
			</div>
			<div>
				<label
					htmlFor="password"
					className="block text-sm font-medium text-gray-700">
					Password
				</label>
				<input
					type="password"
					name="password"
					id="password"
					required
					className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
				/>
			</div>
			<div>
				<button
					type="submit"
					className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
					Register
				</button>
			</div>
		</form>
	);
};

export default RegisterForm;
