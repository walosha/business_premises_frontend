import withProtect from "lib/middlewares/withProtect";
import Invoice from "lib/models/Invoice";
import connectDB from "lib/mongodb";

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
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

async function createBill(req, res) {
  if (Object.values(req.body).length > 3) {
    try {
      req.body.created_by = req.user;
      const invoice = await Invoice.create(req.body);
      return res.status(200).json({ success: true, data: invoice });
    } catch (error) {
      return res.status(500).json({ success: false, data: error.message });
    }
  }
  return res.status(500).json({ success: false, data: "Fill all fields" });
}

async function getAllInvoices(_, res) {
  try {
    let businesses = await Invoice.find({}).populate();
    return res.status(200).json({ success: true, data: businesses });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

module.exports = connectDB(withProtect(userHandler));
