import TaxItems from "lib/models/taxItems";
import connectDB from "lib/mongodb";

async function userHandler(req, res) {
  const { method } = req;
  switch (method) {
    case "GET":
      // Update or create data in your database

      const { mda_id } = req.query;
      console.log({ mda_id });
      const taxItems = await TaxItems.find({ mda_id: mda_id });
      res.status(200).json({ data: taxItems });
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

module.exports = connectDB(userHandler);