const User = require('../models/model.user')
exports.validateEmail = (email) => {
	return String(email)
		.toLowerCase()
		.match(/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,12})(\.[a-z]{2,12})?$/)
}
exports.validateLength = (text, min, max) => {
	return text.length > max || text.length < min ? false : true
}
exports.validateUserName = async (userName) => {
	let flag = false
	userName += (+new Date() * Math.random()).toString().substring(0, 1)
	do {
		let check = await User.findOne({ userName })
		if (check) {
			//change user name
			userName += (+new Date() * Math.random()).toString().substring(0, 1)
			a = true
		} else {
			a = false
		}
	} while (flag)
	return userName
}
