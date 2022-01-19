import connectDB from "lib/mongodb";
import withProtect from "lib/middlewares/withProtect";
import Business from "lib/models/Businesses";

async function userHandler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      // Update or create data in your database
      getAllBusinessesCount(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

async function getAllBusinessesCount(_, res) {
  try {
    let businessesCount = await Business.countDocuments({});
    return res.status(200).json({ success: true, data: businessesCount });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

module.exports = connectDB(withProtect(userHandler));
