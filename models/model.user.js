const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema
const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: [true, 'firstName is required'],
			trim: true,
			text: true,
		},
		lastName: {
			type: String,
			required: [true, 'lastName is required'],
			trim: true,
			text: true,
		},
		userName: {
			type: String,
			required: [true, 'firstName is required'],
			trim: true,
			unique: true,
		},
		email: {
			type: String,
			required: [true, 'email is required'],
			trim: true,
			unique: true,
		},
		password: {
			type: String,
			required: [true, 'firstName is required'],
		},
		picture: {
			type: String,
			trim: true,
			default:
				'https://res.cloudinary.com/vinodkotagiri/image/upload/v1667400732/My%20Websites%20assets/portfolio-projects/yepsocial/avatar_c52lbr.png',
		},
		cover: {
			type: String,
			trim: true,
		},
		gender: {
			type: String,
			required: [true, 'gender is required'],
			trim: true,
			enum: ['male', 'female', 'other'],
		},
		birthYear: {
			type: Number,
			required: [true, 'birthYear is required'],
			trim: true,
		},
		birthMonth: {
			type: Number,
			required: [true, 'birthMonth is required'],
			trim: true,
		},
		birthDay: {
			type: Number,
			required: [true, 'birthDay is required'],
			trim: true,
		},
		verified: {
			type: Boolean,
			default: false,
		},
		friends: {
			type: Array,
			default: [],
		},
		followers: {
			type: Array,
			default: [],
		},
		following: {
			type: Array,
			default: [],
		},
		requests: {
			type: Array,
			default: [],
		},
		search: [
			{
				user: {
					type: ObjectId,
					ref: 'User',
				},
			},
		],
		details: {
			bio: {
				type: String,
			},
			petName: {
				type: String,
			},
			job: {
				type: String,
			},
			workLocation: {
				type: String,
			},
			highSchool: {
				type: String,
			},
			college: {
				type: String,
			},
			currentCity: {
				type: String,
			},
			homeTown: {
				type: String,
			},
			relationShip: {
				type: String,
				enum: ['single', 'in a relationship', 'married', 'divorced'],
			},
			instagram: {
				type: String,
			},
		},
		savedPosts: [
			{
				post: {
					type: ObjectId,
					ref: 'Post',
				},
				savedAt: {
					type: Date,
					default: new Date(),
				},
			},
		],
	},
	{ timestamps: true }
)

module.exports = mongoose.model('User', userSchema)
