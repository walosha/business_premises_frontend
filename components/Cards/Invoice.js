import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

// components

import InvoiceDropdown from "components/Dropdowns/InvoiceDropdown.js";
import { formatCurrency } from "utils/formatCurrency";
import axios from "axios";
import Loader from "components/loader/Loader";
import { convertToDate } from "utils/formatDate";

export default function CardTable({ color, invoices, isLoading }) {
	return (
		<>
			<button
				type="button"
				onClick={() => {
					throw new Error("Sentry Frontend Error");
				}}
			>
				Throw error
			</button>
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
								Invoices{" "}
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
									Invoice Number{" "}
								</th>{" "}
								<th
									className={
										"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
										(color === "light"
											? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
											: "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
									}
								>
									MDA
								</th>
								<th
									className={
										"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
										(color === "light"
											? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
											: "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
									}
								>
									Revenue Item
								</th>
								<th
									className={
										"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
										(color === "light"
											? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
											: "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
									}
								>
									Business Unique ID{" "}
								</th>
								<th
									className={
										"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
										(color === "light"
											? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
											: "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
									}
								>
									Amount
								</th>
								<th
									className={
										"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
										(color === "light"
											? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
											: "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
									}
								>
									Created by
								</th>
								<th
									className={
										"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
										(color === "light"
											? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
											: "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
									}
								>
									Billing of Date
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
							{invoices.map(
								(
									{
										id,
										amount,
										MDAName,
										created_by,
										ApiDescription,
										InvoiceNumber,
										created_at,
										business_id,
										PaymentURL,
									},
									index
								) => (
									<tr key={id}>
										<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
											{index + 1}{" "}
										</td>
										<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
											{InvoiceNumber}{" "}
										</td>
										<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
											{MDAName}{" "}
										</td>
										<th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
											<span
												className={
													"ml-3 font-bold " +
													+(color === "light"
														? "text-blueGray-600"
														: "text-white")
												}
											>
												{ApiDescription ? ApiDescription : "N/A"}{" "}
											</span>
										</th>
										<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
											{business_id.business_id}{" "}
										</td>
										<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
											<i className="fas fa-circle text-orange-500 mr-2"></i>{" "}
											{formatCurrency(amount)}
										</td>
										<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
											<div className="flex"> {created_by?.name} </div>
										</td>
										<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
											{convertToDate(created_at)}
										</td>
										<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
											<InvoiceDropdown PaymentURL={PaymentURL} route={id} />
										</td>
									</tr>
								)
							)}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}

CardTable.defaultProps = {
	color: "light",
};

CardTable.propTypes = {
	color: PropTypes.oneOf(["light", "dark"]),
};
