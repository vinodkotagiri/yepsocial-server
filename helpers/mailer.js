const SibApiV3Sdk = require('sib-api-v3-sdk')
//Create a new instance and api key
const client = SibApiV3Sdk.ApiClient.instance
const apiKey = client.authentications['api-key']
apiKey.apiKey = process.env.SENDINBLUE_API
//create new transaction email instance
const mailOptions = new SibApiV3Sdk.TransactionalEmailsApi()
//Specify the sender
const sender = {
	email: 'noreply@yepsocial.io',
	name: 'yepSocial.io',
}
exports.sendConfirmationMail = (name, email, url) => {
	const recipients = [
		{
			email: email,
		},
	]
	mailOptions
		.sendTransacEmail({
			sender,
			to: recipients,
			subject: 'yepSocial email verification',
			htmlContent: `<div><div style="padding:2rem;display:flex;align-items:center"><img src="https://res.cloudinary.com/vinodkotagiri/image/upload/v1666038323/My%20Websites%20assets/portfolio-projects/yepsocial/yepsocialq.png" alt="yepsocial-logo" style="width:8rem"><h2 style="display:inline-block;margin-left:5rem;font-weight:300">Action Required:<span style="color:#a3a3a3;font-weight:200">Activate your<span style="color:#93c050">yepSocial</span>account!</span></h2></div><hr style="color:#93c050;width:95%;opacity:50%;margin-bottom:1rem"><div style="padding:2rem"><p style="font-size:1.8em">Hello ${name},</p><p style="font-size:1.4em;line-height:1.5">You recently registered a new account with yepSocial.<br>Please verify your email to finish your registration.</p></div><div style="padding-left:2rem"><a href=${url} style="text-decoration:none;color:#fff"><button style="width:12rem;padding:1rem;background-color:#93c050;font-weight:600;color:#f7f7f7;border-radius:.25rem;border:none;cursor:pointer">Verify</button></a></div><div style="padding:2rem"><small>yepSocial allows you to stay in touch and share memories with your loved ones! Once registered you can gain full features of the platform. Happy yepping!!</small></div></div>`,
		})
		.then(console.log)
		.catch(console.log)
}
