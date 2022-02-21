const mongoose = require("mongoose");

const connectDB = (handler) => async (req, res) => {
	if (mongoose.connections[0].readyState) {
		// Use current db connection
		return handler(req, res);
	}
	// Use new db connection
	await mongoose.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
	});
	return handler(req, res);
};
module.exports = connectDB;
// // /lib/dbConnect.js
// import mongoose from "mongoose";

// /**
// Source :
// https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/utils/dbConnect.js
// **/

// const MONGODB_URI = process.env.MONGODB_URI;

// if (!MONGODB_URI) {
// 	throw new Error(
// 		"Please define the MONGODB_URI environment variable inside .env.local"
// 	);
// }

// /**
//  * Global is used here to maintain a cached connection across hot reloads
//  * in development. This prevents connections growing exponentially
//  * during API Route usage.
//  */
// let cached = global.mongoose;

// if (!cached) {
// 	cached = global.mongoose = { conn: null, promise: null };
// }

// async function connectDB() {
// 	if (cached.conn) {
// 		return cached.conn;
// 	}

// 	if (!cached.promise) {
// 		const opts = {
// 			useNewUrlParser: true,
// 		};

// 		cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
// 			return mongoose;
// 		});
// 	}
// 	cached.conn = await cached.promise;
// 	return cached.conn;
// }

//  module.exports = connectDB;
