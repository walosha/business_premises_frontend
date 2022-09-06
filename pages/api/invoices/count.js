import connectDB from "lib/mongodb";
import withProtect from "lib/middlewares/withProtect";
import Invoice from "lib/models/Invoice";
import { withSentry } from "@sentry/nextjs";

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
    let InvoicesCount = await Invoice.aggregate([
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
    console.log({ InvoicesCount });
    return res.status(200).json({ success: true, data: InvoicesCount });
  } catch (error) {
    console.log({ getAllInvoiceesCount: error });
    return res.status(500).send(error?.message);
  }
}

module.exports = withSentry(connectDB(withProtect(userHandler)));
