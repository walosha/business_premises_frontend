const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const mongoosePaginate = require("mongoose-paginate-v2");
const { string } = require("yup");

const Scheme = mongoose.Schema;

const invoiceScheme = new Scheme(
	{
		mda_id: String,
		tax_item_id: String,
		invoice_no: Number,
		business_id: {
			type: mongoose.Schema.ObjectId,
			ref: "Business",
			required: [false, "Invoice must be associated with a business!"],
		},
		InvoiceNumber: {
			type: String,
			required: true,
			unique: true,
		},
		MDAName: String,
		RevenueHeadName: String,
		ApiDescription: String,
		PaymentURL: String,
		InvoicePreviewUrl: String,
		created_by: {
			type: mongoose.Schema.ObjectId,
			ref: "User",
			required: [false, "MDA must be created by a User!"],
		},
		status: {
			type: Number,
			enum: [1, 0],
			default: 0,
		},
		description: { type: String },
		paidSoFar: { type: Number, default: 0 },
		amount: { type: Number },
	},
	{
		timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
		toObject: { Virtual: true },
		toJSON: {
			toJSON: { virtuals: true },
			transform(doc, ret) {
				ret.id = ret._id;
				delete ret.__v;
				delete ret._id;
			},
		},
	}
);

invoiceScheme.plugin(mongoosePaginate);

if (!mongoose.models.Invoice) {
	invoiceScheme.plugin(AutoIncrement, { inc_field: "invoice_no" });
}

invoiceScheme.pre(/^find/, function (next) {
	this.populate({
		path: "created_by",
		select: "name",
	});
	this.populate({
		path: "business_id",
		select: "name address lga state business_id",
	});
	next();
});

global.Invoice = global.Invoice || mongoose.model("Invoice", invoiceScheme);
module.exports = global.Invoice;
