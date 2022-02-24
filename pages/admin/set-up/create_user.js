import React, { useState } from "react";

// layout for page

import Auth from "layouts/Auth.js";
import { registerForm } from "site-constant";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Toast from "components/Toast/Toast";
import router from "next/router";
import Admin from "layouts/Admin";
import withAuth from "lib/Hoc/withAuth";
import { parseCookies } from "utils/parseCookie";
import useAllowedRoles from "lib/hooks/useRoles";
import UsersTable from "components/Cards/Users";

function CreateUser() {
	const { schema } = registerForm;
	const [isLoading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
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
				setSuccess(true);
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

	return (
		<>
			<div className="container mx-auto px-4 h-full">
				{success && <Toast />}
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
				<UsersTable />
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
