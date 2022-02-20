import React from "react";
import { createPopper } from "@popperjs/core";
import { useRouter } from "next/router";
import axios from "axios";

const InvoiceDropdown = ({ route, PaymentURL }) => {
	const router = useRouter();
	// dropdown props
	const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
	const btnDropdownRef = React.createRef();
	const popoverDropdownRef = React.createRef();
	const openDropdownPopover = () => {
		createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
			placement: "left-start",
		});
		setDropdownPopoverShow(true);
	};
	const closeDropdownPopover = () => {
		setDropdownPopoverShow(false);
	};
	return (
		<>
			<a
				className="text-blueGray-500 py-1 px-3"
				href="#pablo"
				ref={btnDropdownRef}
				onClick={(e) => {
					e.preventDefault();
					dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
				}}
			>
				<i className="fas fa-ellipsis-v"></i>
			</a>
			<div
				ref={popoverDropdownRef}
				className={
					(dropdownPopoverShow ? "block " : "hidden ") +
					"bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
				}
			>
				<a
					href="#pablo"
					className={
						"text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
					}
					onClick={(e) => {
						e.preventDefault();
						dropdownPopoverShow
							? closeDropdownPopover()
							: openDropdownPopover();

						router.push("/invoice/" + route);
					}}
				>
					View
				</a>
				<a
					href={PaymentURL}
					target="_blank"
					className={
						"text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
					}
					onClick={() => {
						dropdownPopoverShow
							? closeDropdownPopover()
							: openDropdownPopover();
					}}
				>
					Pay{" "}
				</a>
				{/* <a
					href="#pablo"
					className={
						"text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
					}
					onClick={(e) => {
						e.preventDefault();
						router.push("/admin/generate_invoice/" + route);
					}}
				>
					Edit{" "}
				</a> */}
				<a
					href="#pablo"
					className={
						"text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
					}
					onClick={(e) => {
						e.preventDefault();
						dropdownPopoverShow
							? closeDropdownPopover()
							: openDropdownPopover();

						axios
							.delete(`/api/invoices?id=${route}`)
							.then((form) => {
								router.reload(window.location.pathname);
							})
							.catch((err) => {
								console.log(err);
							});
					}}
				>
					Delete
				</a>
			</div>
		</>
	);
};

export default InvoiceDropdown;
