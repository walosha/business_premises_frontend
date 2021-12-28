import Countries from "lib/models/Countries";
import connectDB from "lib/mongodb";

async function userHandler(req, res) {
  const { method } = req;
  switch (method) {
    case "GET":
      // Update or create data in your database
      const countries = await Countries.find({});
      res.status(200).json({ data: countries });
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

module.exports = connectDB(userHandler);
