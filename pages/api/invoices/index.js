import connectDB from "lib/mongodb";
import withProtect from "lib/middlewares/withProtect";
import Business from "lib/models/Businesses";
import Invoice from "lib/models/Invoice";
import { pageOptions } from "lib/models/paginate";
import { generateHMAC256Auth } from "utils/generateHMAC256Auth";
import axios from "axios";
import { withSentry } from "@sentry/nextjs";

const ClientID = process.env.CLIENTID;

async function userHandler(req, res) {
	const { method } = req;

	switch (method) {
		case "POST":
			// Update or create data in your database
			createBill(req, res);
			break;
		case "GET":
			// Update or create data in your database
			getAllInvoices(req, res);
			break;
		case "PATCH":
			// Update or create data in your database
			updateBill(req, res);
			break;
		case "DELETE":
			// Update or create data in your database
			deleteBill(req, res);
			break;
		default:
			res.setHeader("Allow", ["GET", "POST", "PATCH", "DELETE"]);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
}

async function createBill(req, res) {
	if (Object.values(req.body).length > 3) {
		const { amount, business_id, tax_item_id } = req.body;
		console.log({ body: amount });
		let businessStateTIN;
		try {
			req.body.created_by = req.user;
			businessStateTIN = await Business.findById({
				_id: business_id,
			}).select("StateTIN -_id -user");

			if (!businessStateTIN) {
				return res
					.status(404)
					.json({ success: false, data: "Company does not have a State TIN" });
			}

			const dataConcatenation =
				tax_item_id +
				Number(amount).toFixed(2) +
				process.env.PMNT_BASE_URL +
				ClientID;
			console.log({ dataConcatenation });

			let config = {
				headers: {
					ClientId: ClientID,
					Signature: generateHMAC256Auth(dataConcatenation),
				},
			};

			const apiResponse = await axios.post(
				"https://uat.nasarawaigr.com/api/v1/invoice/create",
				{
					RevenueHeadId: +tax_item_id,
					TaxEntityInvoice: {
						TaxEntity: {
							PayerId: businessStateTIN?.StateTIN || "",
						},
						Amount: Number(amount).toFixed(2),
					},
					CallBackURL: process.env.PMNT_BASE_URL,
				},
				config
			);

			console.log({ apiResponse: apiResponse });
			const {
				MDAName = "",
				RevenueHeadName = "",
				InvoiceNumber = "",
				PaymentURL = "",
				InvoicePreviewUrl = "",
				Description,
				RequestReference,
			} = apiResponse?.data?.ResponseObject;

			req.body.created_by = req.user;
			const invoice = await Invoice.create({
				...req.body,
				ApiDescription: Description,
				MDAName,
				RevenueHeadName,
				InvoiceNumber,
				PaymentURL,
				InvoicePreviewUrl,
				RequestReference,
			});

			return res.status(200).json({ success: true, data: invoice });
		} catch (error) {
			console.log({ error });
			return res
				.status(500)
				.json({ success: false, data: error.response.data.ResponseObject });
		}
	}
	return res.status(500).json({ success: false, data: " Fill all fields" });
}

async function updateBill(req, res) {
	if (Object.values(req.body).length > 3) {
		try {
			req.body.created_by = req.user;
			const invoice = await Invoice.findByIdAndUpdate(req.body.id, req.body);
			return res.status(200).json({ success: true, data: invoice });
		} catch (error) {
			return res.status(500).json({ success: false, data: error.message });
		}
	}
	return res.status(500).json({ success: false, data: "Fill all fields" });
}

async function deleteBill(req, res) {
	const { id } = req.query;

	try {
		await Invoice.findByIdAndDelete(id);
		return res.status(200).json({ success: true, data: [] });
	} catch (error) {
		return res.status(500).json({ success: false, data: error.message });
	}
}

async function getAllInvoices(req, res) {
	const { id, page, text } = req.query;

	try {
		if (id) {
			let invoice = await Invoice.findById(id).populate();
			return res.status(200).json({ success: true, data: invoice });
		}
		let businesses = await Invoice.paginate(
			{ InvoiceNumber: { $regex: text ? text : "", $options: "i" }, status: 0 },
			{ ...pageOptions, page, offset: page * 5, sort: "-updated_at" }
		);
		return res.status(200).json({ success: true, data: businesses });
	} catch (error) {
		return res.status(500).send(error.message);
	}
}

module.exports = withSentry(connectDB(withProtect(userHandler)));
