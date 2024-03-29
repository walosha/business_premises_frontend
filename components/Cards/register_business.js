import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { registerBusinessForm } from "site-constant";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import NaijaStates from "naija-state-local-government";
import { Toaster } from "react-hot-toast";
import { notify } from "components/Toast/HotToast";

// components

const lgas = [
	"Akwanga",
	"Awe",
	"Doma",
	"Karu",
	"Keana",
	"Keffi",
	"Kokona",
	"Lafia",
	"Nasarawa",
	"Nasarawa-Eggon",
	"Obi",
	"Toto",
	"Wamba",
];

function CardSettings() {
	const [industries, setIndustries] = useState([]);
	const [countries, setCountries] = useState([]);
	const [isLoading, setLoading] = useState(false);
	const { schema } = registerBusinessForm;
	const router = useRouter();

	const {
		handleSubmit,
		formState: { errors, isDirty, isValid },
		register,
		setError,
		watch,
	} = useForm({
		mode: "all",
		resolver: yupResolver(schema),
	});

	useEffect(() => {
		const industries = axios.get("/api/data/industries");
		const countries = axios.get("/api/data/countries");
		axios
			.all([industries, countries])
			.then((response) => {
				const [industries, countries] = response;
				setIndustries(industries.data.data);
				setCountries(countries.data.data);
			})
			.catch(console.log);
	}, []);

	const onSubmit = (data) => {
		setLoading(true);
		axios
			.post("/api/businesses", data)
			.then((res) => {
				setLoading(false);
				notify({
					message: "You have been successfully registered a business!",
					header: "Congratulations",
				});
				setTimeout(() => {
					router.reload(window.location.pathname);
				}, 2000);
			})
			.catch((err) => {
				if (err?.response?.status === 401) {
					console.log("error1");

					localStorage.removeItem("token");
					router.push("/");
				} else if (err?.response?.status === 422) {
					console.log("error3");
					setError("reg_no", {
						type: "server",
						message: err.response.data.message,
					});
				} else {
					console.log("error");
					notify({
						message: "Contact the Admin",
						header: "Oops!",
					});
				}
				setLoading(false);
			});
	};
	return (
		<>
			<Toaster />
			<div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
				<div className="rounded-t bg-white mb-0 px-6 py-6">
					<div className="text-center flex justify-between flex-col">
						<h6 className="text-blueGray-700 text-xl font-bold">
							Business Registration Form
						</h6>
						<ul>
							<li className="text-red-500 text-xs">
								The Phone must be unique i.e (Not associated with existing
								business on this platform)
							</li>
							<li className="text-red-500 text-xs">
								The email must be unique (Not associated with existing business
								on this platform)
							</li>
							<li className="text-red-500 text-xs">
								Registration number must be unique to businesses
							</li>
							<li className="text-red-500 text-xs">
								The address field value must be between 10 and 200 characters
							</li>
						</ul>
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
										Business Name
									</label>
									<input
										{...register("name")}
										type="text"
										className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
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
										Owner's Name
									</label>
									<input
										{...register("owner_name")}
										type="text"
										className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
									/>
									<span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
										{errors.owner_name?.message}
									</span>
								</div>
							</div>
							<div className="w-full lg:w-6/12 px-4">
								<div className="relative w-full mb-3">
									<label
										className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
										htmlFor="grid-password"
									>
										Registration Number (Reg. No.){" "}
									</label>
									<input
										{...register("reg_no")}
										type="text"
										className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
									/>
									<span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
										{errors.reg_no?.message}
									</span>
								</div>
							</div>
							<div className="w-full lg:w-6/12 px-4">
								<div className="relative w-full mb-3">
									<label
										className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
										htmlFor="grid-password"
									>
										Business Phone nUmber
									</label>
									<input
										{...register("phone")}
										type="text"
										className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
									/>
									<span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
										{errors.phone?.message}
									</span>
								</div>
							</div>{" "}
							<div className="w-full lg:w-6/12 px-4">
								<div className="relative w-full mb-3">
									<label
										className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
										htmlFor="grid-password"
									>
										Business Email
									</label>
									<input
										{...register("email")}
										type="email"
										className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
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
										No. of Employees
									</label>
									<input
										{...register("employee_no")}
										type="number"
										className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
									/>
									<span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
										{errors.employee_no?.message}
									</span>
								</div>
							</div>
							<div className="w-full lg:w-6/12 px-4">
								<div className="relative w-full mb-3">
									<label
										className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
										htmlFor="grid-password"
									>
										Select Business Type
									</label>
									<div className="mb-3 xl:w-96">
										<select
											{...register("business_type")}
											className="form-select appearance-none block rounded w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 transition  ease-in-out  m-0      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
											aria-label="Default select example"
										>
											<option defaultValue="" value="" hidden>
												{" "}
												select Business Type
											</option>
											{industries.map(({ title, _id }) => (
												<option key={_id} value={title}>
													{title}
												</option>
											))}
										</select>
										<span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
											{errors.business_type?.message}
										</span>
									</div>
								</div>
							</div>
							<div className="w-full lg:w-6/12 px-4">
								<div className="relative w-full mb-3">
									<label
										className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
										htmlFor="grid-password"
									>
										Select Business Owner structure
									</label>
									<div className="mb-3 xl:w-96">
										<select
											{...register("business_structure")}
											className="form-select appearance-none block rounded w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 transition  ease-in-out  m-0      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
											aria-label="Default select example"
										>
											<option defaultValue="" value="" hidden>
												select Owner Structure
											</option>
											<option value="1">Sole Proprietorship</option>
											<option value="2">Partnership</option>
											<option value="3">Private Limited Company</option>
											<option value="4">Public Limited Company</option>
											<option value="5">Company Limited by Guarantee</option>
											<option value="6">Others</option>
										</select>
										<span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
											{errors.business_structure?.message}
										</span>
									</div>
								</div>
							</div>
						</div>
						<div className="flex flex-wrap">
							<div className="w-full lg:w-12/12 px-4">
								<div className="relative w-full mb-3">
									<label
										className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
										htmlFor="grid-password"
									>
										Address
									</label>
									<input
										{...register("address")}
										type="text"
										className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
										defaultValue=""
									/>
									<span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
										{errors.address?.message}
									</span>
								</div>
							</div>{" "}
							<div className="w-full lg:w-6/12 px-4">
								<div className="relative w-full mb-3">
									<label
										className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
										htmlFor="grid-password"
									>
										Select State
									</label>
									<div className="mb-3 xl:w-96">
										<select
											{...register("state")}
											className="form-select appearance-none block rounded w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 transition  ease-in-out  m-0      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
											aria-label="Default select example"
										>
											<option defaultValue="" value="" hidden>
												select State
											</option>

											<option value="NAS">Nasarawa</option>
										</select>
										<span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
											{errors.state?.message}
										</span>
									</div>
								</div>
							</div>
							<div className="w-full lg:w-6/12 px-4">
								<div className="relative w-full mb-3">
									<label
										className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
										htmlFor="grid-password"
									>
										Select Location/LGA
									</label>
									<div className="mb-3 xl:w-96">
										<select
											{...register("lga")}
											className="form-select appearance-none block rounded w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 transition  ease-in-out  m-0      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
											aria-label="Default select example"
										>
											<option defaultValue="" value="" hidden>
												select LGA
											</option>
											{lgas.map((state) => (
												<option key={state} value={state.toUpperCase()}>
													{state}
												</option>
											))}
										</select>
										<span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
											{errors.lga?.message}
										</span>
									</div>
								</div>
							</div>{" "}
							<div className="w-full lg:w-6/12 px-4">
								<div className="relative w-full mb-3">
									<label
										className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
										htmlFor="grid-password"
									>
										Country
									</label>
									<select
										{...register("country")}
										className="form-select appearance-none block rounded w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 transition  ease-in-out  m-0      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
										aria-label="Default select example"
									>
										<option value={""} hidden>
											{" "}
											select Country
										</option>
										<option selected value={"Nigeria"}>
											Nigeria
										</option>
									</select>
									<span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
										{errors.country?.message}
									</span>
								</div>
							</div>
						</div>

						<button
							disabled={!isDirty || !isValid || isLoading}
							className={`${
								!isDirty || !isValid ? "" : "bg-blueGray-800"
							} text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
							type="submit"
						>
							{isLoading ? "Creating..." : "Create Business"}
						</button>
					</form>
				</div>
			</div>
		</>
	);
}

export default CardSettings;
