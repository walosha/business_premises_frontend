import React, { useEffect, useState } from "react";

// components

// layout for page

import Admin from "layouts/Admin.js";
import withAuth from "lib/Hoc/withAuth";
import Payemts from "components/Cards/Payemts";
import { Page } from "components/Helmet/Helmet";
import ReactPaginate from "react-paginate";
import axios from "axios";

function Payments() {
	const [invoices, setInvoices] = useState([]);
	const [pageOffset, setPageOffset] = useState(0);
	const [page, setPage] = useState({
		count: 3,
		currentPage: 1,
		hasNextPage: false,
		hasPrevPage: false,
		next: null,
		pageCount: 1,
		perPage: 50,
		prev: null,
	});
	const [isLoading, setLoading] = useState(false);
	useEffect(() => {
		setLoading(true);
		axios
			.get("/api/payments")
			.then((response) => {
				setInvoices(response.data.data.data);
				setPage(response.data.data.page);
				setLoading(false);
			})
			.catch((err) => setLoading(true));
	}, []);

	useEffect(() => {
		async function fetchData() {
			const response = await axios(
				`/api/payments?page=${pageOffset}`
				// `/api/payments?limit=1&offset=${pageOffset})`  //set limit
			);
			setInvoices(response.data.data.data);
		}

		fetchData();
	}, [pageOffset]);

	const handlePageChange = (event) => {
		// when its content is loaded in useEffect.
		setPageOffset(event.selected);
	};
	return (
		<Page title={"Payments"}>
			<div className="relative ml-4 mb-4">
				<span className="z-10 h-full leading-snug font-normal  text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-1 pl-3 py-3">
					<i className="fas fa-search"></i>
				</span>
				<input
					type="text"
					placeholder="Search here..."
					className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative  bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring pl-10"
				/>
			</div>
			<div className="flex flex-wrap">
				<div className="w-full px-4">
					<div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
						<Payemts invoices={invoices} isLoading={isLoading} />
					</div>
					<ReactPaginate
						previousLabel="Previous"
						nextLabel="Next"
						pageClassName="page-item"
						pageLinkClassName="page-link"
						previousClassName="page-item"
						previousLinkClassName="page-link"
						nextClassName="page-item"
						nextLinkClassName="page-link"
						breakLabel="..."
						breakClassName="page-item"
						breakLinkClassName="page-link"
						pageCount={page.pageCount}
						pageRangeDisplayed={5}
						onPageChange={handlePageChange}
						containerClassName="pagination flex"
						activeClassName="active"
						// forcePage={pageOffset}
					/>
				</div>
			</div>
		</Page>
	);
}

function AdminPayments() {
	return (
		<Admin>
			<Payments />
		</Admin>
	);
}

export default withAuth(AdminPayments);
