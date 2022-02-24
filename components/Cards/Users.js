import React from "react";
import InvoiceDropdown from "components/Dropdowns/InvoiceDropdown.js";
import axios from "axios";

export default function UsersTable({ color = "", isLoading }) {
	return (
		<div
			className={
				"relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
				(color === "light" ? "bg-white" : "bg-blueGray-700 text-white")
			}
		>
			<div className="rounded-t mb-0 px-4 py-3 border-0">
				<div className="flex flex-wrap items-center">
					<div className="relative w-full px-4 max-w-full flex-grow flex-1">
						<h3
							className={
								"font-semibold text-lg " +
								(color === "light" ? "text-blueGray-700" : "text-white")
							}
						>
							Users{" "}
						</h3>
					</div>
				</div>
			</div>
			<div className="block w-full overflow-x-auto">
				{/* Projects table */}
				<table className="items-center w-full bg-transparent border-collapse">
					<thead>
						<tr>
							<th
								className={
									"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
									(color === "light"
										? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
										: "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
								}
							>
								S/N{" "}
							</th>{" "}
							<th
								className={
									"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
									(color === "light"
										? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
										: "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
								}
							>
								Name{" "}
							</th>{" "}
							<th
								className={
									"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
									(color === "light"
										? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
										: "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
								}
							>
								Email
							</th>
							<th
								className={
									"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
									(color === "light"
										? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
										: "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
								}
							>
								Role{" "}
							</th>
							<th
								className={
									"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
									(color === "light"
										? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
										: "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
								}
							>
								Date Created{" "}
							</th>
							<th
								className={
									"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
									(color === "light"
										? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
										: "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
								}
							></th>
						</tr>
					</thead>
					<tbody>
						{isLoading && (
							<tr>
								<td
									colSpan={"7"}
									className="border-t-0 px-6 border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
								>
									<Loader />
								</td>{" "}
							</tr>
						)}
						{[
							{
								key: 1,
								name: "Olawale Afuye",
								email: "walosha",
								role: "Admin",
								created_at: "",
							},
						].map(({ key, name, email, role, created_at }, index) => (
							<tr key={key}>
								<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
									{index + 1}{" "}
								</td>
								<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
									{name}{" "}
								</td>
								<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
									{email}{" "}
								</td>
								<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
									{role}{" "}
								</td>
								<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
									{created_at || "12-8-2022"}{" "}
								</td>

								<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
									<ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
										<li className="flex items-center">
											<button
												className="bg-blueGray-700 text-white active:bg-blueGray-600 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
												// onClick={() => router.push("/auth/register")}
											>
												Make Admin{" "}
											</button>
										</li>
									</ul>
									<InvoiceDropdown />
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
