import withProtect from "lib/middlewares/withProtect";
import Business from "lib/models/Businesses";
import connectDB from "lib/mongodb";

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
    console.log("inside", req.body.reg_no);
    try {
      let business = await Business.findOne({ reg_no: req.body.req_no });
      if (business) {
        return res.status(433).json({
          success: "false",
          message: "Business already register on the platform !",
        });
      }
      req.body.user = req.user;
      business = await Business.create(req.body);
      return res.status(200).json({ success: true, data: business });
    } catch (error) {
      if (error.name === "MongoServerError" && error.code === 11000) {
        return res.status(422).send({
          success: "false",
          message:
            "Registration number associated with a registered business !",
        });
      }
      return res.status(500).send(error.message);
    }
  }
}

async function getAllBusinesses(_, res) {
  try {
    let businesses = await Business.find({}).populate();
    return res.status(200).json({ success: true, data: businesses });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

module.exports = connectDB(withProtect(userHandler));
