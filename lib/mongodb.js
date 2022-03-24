const mongoose = require("mongoose");

const connectDB = (handler) => async (req, res) => {
	if (mongoose.connections[0].readyState) {
		// Use current db connection
		return handler(req, res);
	}
	// Use new db connection
	await mongoose
		.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
		})
		.catch((err) => console.log("MONGODB FAILED!!!", err));
	return handler(req, res);
};
module.exports = connectDB;
