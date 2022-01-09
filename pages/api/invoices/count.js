import withProtect from "lib/middlewares/withProtect";
import Invoice from "lib/models/Invoice";
import connectDB from "lib/mongodb";

async function userHandler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      // Update or create data in your database
      getAllInvoiceesCount(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

async function getAllInvoiceesCount(_, res) {
  try {
    let InvoiceesCount = await Invoice.aggregate([
      {
        $group: {
          _id: "",
          totalAmount: { $sum: "$amount" },
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ]);
    return res.status(200).json({ success: true, data: InvoiceesCount });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

module.exports = connectDB(withProtect(userHandler));
