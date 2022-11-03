const User = require('../models/model.user')
const {
	validateEmail,
	validateLength,
	validateUserName,
} = require('../helpers/validation')
const { generateToken } = require('../helpers/authTokens')
const { sendConfirmationMail } = require('../helpers/mailer')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// -----------------------------------------------------------------------------
// CONTROLLER FOR USER REGISTRATION
// -----------------------------------------------------------------------------
exports.register = async (req, res) => {
	try {
		const {
			firstName,
			lastName,
			email,
			password,
			gender,
			birthYear,
			birthMonth,
			birthDay,
		} = req.body
		/*validate inputs*/
		if (!validateEmail(email))
			return res.status(400).json({ message: 'Invalid email' })
		if (!validateLength(firstName, 3, 15))
			return res
				.status(400)
				.json({ message: 'firstName should be between 3 and 15 characters' })
		if (!validateLength(lastName, 3, 15))
			return res
				.status(400)
				.json({ message: 'lastName should be between 3 and 15 characters' })
		if (!validateLength(password, 6, 20))
			return res
				.status(400)
				.json({ message: 'password should be between 6 and 20 characters' })
		/*end validate inputs*/
		const checkEmail = await User.findOne({ email })
		if (checkEmail)
			return res
				.status(400)
				.json({ message: 'Email already exists, try another' })
		const newUserName = await validateUserName(firstName)
		const hashedPassword = await bcrypt.hash(password, 12)
		const user = await new User({
			firstName,
			lastName,
			userName: newUserName,
			email,
			password: hashedPassword,
			gender,
			birthYear,
			birthMonth,
			birthDay,
		}).save()
		const { password: passwd, ...rest } = user._doc
		const emailVerificationToken = generateToken(
			{ _id: user._id.toString() },
			'30m'
		)
		const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`
		sendConfirmationMail(user.firstName, user.email, url)
		res
			.status(201)
			.json({ message: 'User registered successfully!', user: rest })
	} catch (error) {
		console.log(error)
		res.status(500).json({
			message: 'Problem registering user, please try again later',
			error: error,
		})
	}
}

// -----------------------------------------------------------------------------
// CONTROLLER FRO EMAIL VERIFICATION
// -----------------------------------------------------------------------------
exports.activateEmail = async (req, res) => {
	try {
		const { token } = req.body
		const user = jwt.verify(token, process.env.JWT_SECRET)
		const checkUser = await User.findById(user._id)
		if (checkUser.verified)
			return res.status(400).json({ message: 'Email already verified!' })
		await User.findByIdAndUpdate({ _id: user._id }, { verified: true })
		res.status(200).json({ message: 'Email verified successfully' })
	} catch (error) {
		console.log(error)
		res.status(500).json({
			message: 'Problem verifying user, please try again later',
			error: error,
		})
	}
}
// -----------------------------------------------------------------------------
// CONTROLLER FOR USER LOGIN
// -----------------------------------------------------------------------------
exports.login = async (req, res) => {
	try {
		const { email, password } = req.body
		const user = await User.findOne({ email })
		if (!user)
			return res
				.status(400)
				.json({ message: 'Email you entered is not registered' })
		const checkPswd = await bcrypt.compare(password, user.password)
		if (!checkPswd)
			return res
				.status(400)
				.json({ message: 'Password you entered is incorrect' })
		const { password: passwd, ...rest } = user._doc
		const token = generateToken({ _id: user._id.toString() }, '7d')
		res
			.status(200)
			.json({ message: 'User login successfully!', user: rest, token })
	} catch (error) {
		console.log(error)
		res.status(500).json({
			message: 'Problem loging in user, please try again later',
			error: error,
		})
	}
}
