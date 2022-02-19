import { createHmac } from "crypto";
import connectDB from "lib/mongodb";
import withProtect from "lib/middlewares/withProtect";
import Business from "lib/models/Businesses";
import { pageOptions } from "lib/models/paginate";
import axios from "axios";

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
  if (req.body.reg_no) {
    try {
      let business = await Business.findOne({ reg_no: req.body.req_no });
      if (business) {
        return res.status(433).json({
          success: "false",
          message: "Business already register on the platform !",
        });
      }

      req.body.user = req.user;
      const { name, phone, email, lga, address, state } = req.body;

      const ClientID = process.env.CLIENTID;

      const dataConcatenation = `${phone}2${state}${lga}${ClientID}`;
      console.log({ dataConcatenation });
      const Signature = createHmac("sha256", process.env.CLIENTSECRET)
        .update(dataConcatenation)
        .digest("base64");

      console.log({ Signature });

      let config = {
        headers: {
          ClientId: process.env.CLIENTID,
          Signature,
        },
      };

      const payerIdResponse = await axios.post(
        "https://uat.nasarawaigr.com/api/v1/statetin/create",
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
      console.log({ payerIdResponse });
      business = await Business.create({
        ...req.body,
        api: payerIdResponse.data,
      });
      return res.status(200).json({ success: true, data: business });
    } catch (error) {
      console.log({ error });
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
  const { page } = req.query;

  try {
    let businesses = await Business.paginate(
      {},
      { ...pageOptions, page, offset: page * 5, sort: "-updated_at" }
    );
    return res.status(200).json({ success: true, data: businesses });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

module.exports = connectDB(withProtect(userHandler));
