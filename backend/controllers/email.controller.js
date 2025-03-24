const { render } = require('@react-email/components');

const transporter = require('../libs/nodemailer');
const OneTimePasswordEmail = require('../emails/otp-notification.jsx').default;
const SEND_EMAIL = process.env.SEND_EMAIL == 'true';

const EmailController = {
	/**
	 * Sends a verification email to the user
	 * @param {string} otp - The OTP code
	 * @param {object} user - The user object
	 */
	verification: async (otp, user) => {
		const rendered = await render(
			<OneTimePasswordEmail otp={otp} name={user.name} />
		);

		if (SEND_EMAIL) {
			await transporter.sendMail({
				from: '"Rumah Literasi" <noreply@rumahliterasi.com>',
				to: user.email,
				subject: 'Your verification code for secure access',
				html: rendered,
			});
		}

		console.log(otp);
	},
};

module.exports = EmailController;
