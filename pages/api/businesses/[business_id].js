import withProtect from "lib/middlewares/withProtect";
import Business from "lib/models/Businesses";
import connectDB from "lib/mongodb";

async function userHandler(req, res) {
  const { method } = req;

  switch (method) {
    case "PATCH":
      // Update or create data in your database
      updateBusiness(req, res);
      break;
    case "GET":
      // Update or create data in your database
      get_a_business(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "PATCH"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

async function updateBusiness(req, res) {
  // if (req.body.reg_no) {
  //   try {
  //     let business = await Business.findOne({ reg_no: req.body.req_no });
  //     if (business) {
  //       return res.status(433).json({
  //         success: "false",
  //         message: "Business already register on the platform !",
  //       });
  //     }
  //     req.body.user = req.user;
  //     business = await Business.create(req.body);
  //     return res.status(200).json({ success: true, data: business });
  //   } catch (error) {
  //     if (error.name === "MongoServerError" && error.code === 11000) {
  //       return res.status(422).send({
  //         success: "false",
  //         message:
  //           "Registration number associated with a registered business !",
  //       });
  //     }
  //     return res.status(500).json({ success: false,data:error.message});
  //   }
  // }
  // return res.status(500).json({ success: false,data:'Add a registration number'});
}

async function get_a_business(req, res) {
  const { business_id } = req.query;
  if (!business_id)
    return res
      .status(500)
      .json({ success: false, data: "Enter a business Id" });

  try {
    let business = await Business.findOne({
      business_id: 1 * business_id,
    }).select("name address lga state -user");
    return res.status(200).json({ success: true, data: business });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

module.exports = connectDB(withProtect(userHandler));
