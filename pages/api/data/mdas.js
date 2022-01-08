import MDA from "lib/models/Mda";
import connectDB from "lib/mongodb";

async function userHandler(req, res) {
  const { method } = req;
  switch (method) {
    case "GET":
      // Update or create data in your database
      const industries = await MDA.find({});
      res.status(200).json({ data: industries });
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

module.exports = connectDB(userHandler);
