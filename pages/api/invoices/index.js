import withProtect from "lib/middlewares/withProtect";
import Invoice from "lib/models/Invoice";
import { pageOptions } from "lib/models/paginate";
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
  const { id, page } = req.query;

  try {
    if (id) {
      let invoice = await Invoice.findById(id).populate();
      return res.status(200).json({ success: true, data: invoice });
    }
    let businesses = await Invoice.paginate(
      { status: "unpaid" },
      { ...pageOptions, page, offset: page * 5, sort: "-updated_at" }
    );
    return res.status(200).json({ success: true, data: businesses });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

module.exports = connectDB(withProtect(userHandler));
