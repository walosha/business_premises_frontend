import React, { useEffect, useState } from "react";

// layout for page

import Auth from "layouts/Auth.js";
import { registerForm } from "site-constant";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Toast from "components/Toast/Toast";
import { useRouter } from "next/router";
import Admin from "layouts/Admin";
import withAuth from "lib/Hoc/withAuth";
import { parseCookies } from "utils/parseCookie";
import useAllowedRoles from "lib/hooks/useRoles";
import UsersTable from "components/Cards/Users";
import ReactPaginate from "react-paginate";
import { notify } from "components/Toast/HotToast";
import { Toaster } from "react-hot-toast";

function CreateUser() {
	const router = useRouter();
	const { schema } = registerForm;
	const [isLoading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [users, setUsers] = useState([]);
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

	useEffect(() => {
		setLoading(true);
		axios
			.get(`/api/users`)
			.then((response) => {
				setUsers(response.data.data.data);
				setPage(response.data.data.page);
				setLoading(false);
			})
			.catch((err) => setLoading(true));
	}, []);

	useEffect(() => {
		async function fetchData() {
			const response = await axios(
				`/api/users?page=${pageOffset}`
				// `/api/payments?limit=1&offset=${pageOffset})`  //set limit
			);
			setUsers(response.data.data.data);
		}

		fetchData();
	}, [pageOffset]);

	const {
		handleSubmit,
		formState: { errors, isValid, isDirty },
		register,
		setError,
	} = useForm({
		mode: "onChange",
		resolver: yupResolver(schema),
	});

	const onSubmit = (data) => {
		setLoading(true);
		axios
			.post("/api/auth/create_user", data)
			.then((res) => {
				setLoading(false);
				notify({
					message: "You have been successfully created!",
					header: "Congratulations",
				});
				return setTimeout(() => router.push("/admin/dashboard"), 4000);
			})
			.catch((err) => {
				setLoading(false);
				err?.response.status === 422 &&
					setError("email", {
						type: "server",
						message: "Email already Exist",
					});
			});
	};

	const handlePageChange = (event) => {
		// when its content is loaded in useEffect.
		setPageOffset(event.selected);
	};

	return (
		<>
			<div className="container mx-auto px-4 h-full">
				<Toaster />
				<div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
					<div className="rounded-t bg-white mb-0 px-6 py-6">
						<div className="text-center flex justify-between">
							<h6 className="text-blueGray-700 text-xl font-bold">
								Create User
							</h6>
						</div>
					</div>
					<div className="flex-auto px-4 mt-4 lg:px-10 py-10 pt-0">
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="flex flex-wrap">
								<div className="w-full lg:w-6/12 px-4">
									<div className="relative w-full mb-3">
										<label
											className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
											htmlFor="grid-password"
										>
											Name
										</label>
										<input
											type="text"
											className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
											placeholder="Name"
											{...register("name")}
										/>
										<span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
											{errors.name?.message}
										</span>
									</div>
								</div>
								<div className="w-full lg:w-6/12 px-4">
									<div className="relative w-full mb-3">
										<label
											className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
											htmlFor="grid-password"
										>
											Email
										</label>
										<input
											type="email"
											// autoComplete="off"
											className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
											placeholder="Email"
											autocomplete="off"
											{...register("email")}
										/>
										<span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
											{errors.email?.message}
										</span>
									</div>
								</div>
								<div className="w-full lg:w-6/12 px-4">
									<div className="relative w-full mb-3">
										<label
											className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
											htmlFor="grid-password"
										>
											Password
										</label>
										<input
											type="password"
											className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
											placeholder="Password"
											{...register("password")}
										/>
										<span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
											{errors.password?.message}
										</span>
									</div>
								</div>
								<div className="w-full lg:w-6/12 px-4">
									<div className="relative w-full mb-3">
										<label
											className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
											htmlFor="grid-password"
										>
											Confirm Password
										</label>
										<input
											type="password"
											className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
											placeholder="Password"
											{...register("confirmPpassword")}
										/>
										<span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
											{errors.confirmPpassword?.message}
										</span>
									</div>
								</div>
							</div>

							<div className="text-center mt-6">
								<button
									disabled={!isDirty || !isValid}
									className={`${
										!isDirty || !isValid ? "" : "bg-blueGray-800"
									} text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150`}
									type="submit"
								>
									{isLoading ? "Creating..." : "Create Account"}
								</button>
							</div>
						</form>
					</div>{" "}
				</div>
				<div className="flex flex-wrap">
					<div className="w-full px-4">
						<div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
							<UsersTable users={users} />
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
			</div>
		</>
	);
}

function AdminRegister({ token }) {
	useAllowedRoles(token);
	return (
		<Admin>
			<CreateUser />
		</Admin>
	);
}

export async function getServerSideProps({ req }) {
	const data = parseCookies(req);

	return { props: { token: data.user || null } };
}

export default withAuth(AdminRegister);
