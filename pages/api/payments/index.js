import withProtect from "lib/middlewares/withProtect";
import Payment from "lib/models/Payment";
import Invoice from "lib/models/Invoice";
import connectDB from "lib/mongodb";
import { pageOptions } from "lib/models/paginate";

async function userHandler(req, res) {
  const { method } = req;

  switch (method) {
    case "POST":
      // Update or create data in your database
      createPayment(req, res);
      break;
    case "GET":
      // Update or create data in your database
      getAllPayments(req, res);
      break;
    default:
      res.setHeader("Allow", ["POST", "GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

async function createPayment(req, res) {
  const { invoice_no } = req.body;
  if (Object.values(req.body).length >= 3 && invoice_no) {
    try {
      const invoice = await Invoice.findOneAndUpdate(
        { invoice_no: invoice_no },
        { $set: { status: "paid", paidSoFar: req.body.amount } },
        { new: true }
      );

      let payment;
      if (invoice) {
        payment = await Payment.create({
          ...req.body,
          invoice_id: invoice._id,
        });
      } else {
        payment = await Payment.create(req.body);
      }

      return res
        .status(200)
        .json({ success: true, data: { invoice, payment } });
    } catch (error) {
      return res.status(500).json({ success: false, data: error.message });
    }
  }
  return res.status(500).json({ success: false, data: "Fill all fields" });
}

async function getAllPayments(req, res) {
  const { id } = req.query;

  try {
    if (id) {
      let invoice = await Payment.findById(id).populate();
      return res.status(200).json({ success: true, data: invoice });
    }
    let payments = await Payment.paginate({}, pageOptions);
    return res.status(200).json({ success: true, data: payments });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

module.exports = connectDB(withProtect(userHandler));
