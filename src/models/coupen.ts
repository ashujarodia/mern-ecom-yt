import mongoose from 'mongoose';

const schema = new mongoose.Schema({
	code: {
		type: String,
		required: [true, 'Please enter the coupen code'],
		unique: true,
	},
	amount: {
		type: Number,
		required: [true, 'Please enter the discount amount'],
	},
});

export const Coupen = mongoose.model('Coupen', schema);
