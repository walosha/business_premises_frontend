import util from "util";
import connectDB from "lib/mongodb";
import withProtect from "lib/middlewares/withProtect";
import Business from "lib/models/Businesses";
import { pageOptions } from "lib/models/paginate";
import axios from "axios";
import { generateHMAC256Auth } from "utils/generateHMAC256Auth";

const ClientID = process.env.CLIENTID;

async function userHandler(req, res) {
	const { method } = req;

	switch (method) {
		case "POST":
			// Update or create data in your database
			registerBusiness(req, res);
			break;
		case "GET":
			// Update or create data in your database
			getAllBusinesses(req, res);
			break;
		default:
			res.setHeader("Allow", ["GET", "POST"]);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
}

async function registerBusiness(req, res) {
	const { name, phone, email, lga, address, state, reg_no } = req.body;

	if (reg_no) {
		try {
			const business = await Business.find({
				$or: [{ name }, { phone }, { reg_no }, { email }],
			}).exec();

			if (business?.length) {
				return res.status(422).json({
					success: "false",
					message:
						"Business already registered with either name, phone, email or  registration no.",
				});
			}

			req.body.user = req.user;
			const dataConcatenation = `${phone}2${state}${lga}${ClientID}`;

			let config = {
				headers: {
					ClientId: ClientID,
					Signature: generateHMAC256Auth(dataConcatenation),
				},
			};

			const apiResponse = await axios.post(
				"https://nasarawaigr.com/api/v1/statetin/create",
				{
					Name: name,
					PhoneNumber: phone,
					Email: email,
					Address: address,
					StateCode: state,
					LGACode: lga,
					PayerCategory: 2,
				},
				config
			);

			console.log({ success: util.inspect(apiResponse) });

			const payerIdResponse = apiResponse.data.ResponseObject;
			const newBusiness = await Business.create({
				...req.body,
				StateTIN: payerIdResponse.StateTIN,
				NormalizedStateTIN: payerIdResponse.NormalizedStateTIN,
				api: payerIdResponse.data,
			});

			return res.status(200).json({ success: true, data: newBusiness });
		} catch (error) {
			console.log({
				error: util.inspect({ error: error.response.data.ResponseObject }),
			});
			if (error.name === "MongoServerError" && error.code === 11000) {
				return res.status(422).send({
					success: "false",
					message:
						"Registration number associated with a registered business !",
				});
			}

			return res.status(500).json({ success: false, data: error.message });
		}
	}
	return res
		.status(500)
		.json({ success: false, data: "Add a registration number" });
}

async function getAllBusinesses(req, res) {
	const { page, text } = req.query;
	try {
		let businesses = await Business.paginate(
			{ name: { $regex: text ? text : "", $options: "i" } },
			{
				...pageOptions,
				page,
				offset: page * 5,
				sort: "-updated_at",
			}
		);
		return res.status(200).json({ success: true, data: businesses });
	} catch (error) {
		return res.status(500).send(error.message);
	}
}
module.exports = connectDB(withProtect(userHandler));
