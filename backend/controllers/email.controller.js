const { render } = require('@react-email/components');
const transporter = require('../libs/nodemailer');

const OneTimePasswordEmail = require('../emails/otp-notification.jsx').default;
const UserVerification = require('../emails/user-verification.jsx').default;
const ForgotPassword = require('../emails/forgot-password.jsx').default;

const NODEMAILER_FROM = process.env.NODEMAILER_FROM;
const ACTIVATE_EMAIL = process.env.ACTIVATE_EMAIL == 'true';

const EmailController = {
	/**
	 * Sends a verification email to the user
	 * @param {string} otp - The OTP code
	 * @param {object} user - The user object
	 */
	otp: async (otp, user) => {
		const output = await render(
			<OneTimePasswordEmail otp={otp} name={user.name} />
		);

		if (ACTIVATE_EMAIL) {
			await transporter.sendMail({
				from: NODEMAILER_FROM,
				to: user.email,
				subject: 'Your verification code for secure access',
				html: output,
			});
		}

		console.log(otp);
	},

	/**
	 * Sends a verification email to the user
	 * @param {string} href - The verification link
	 * @param {object} user - The user object
	 */
	verify: async (href, user) => {
		const output = await render(
			<UserVerification href={href} name={user.name} />
		);

		if (ACTIVATE_EMAIL) {
			await transporter.sendMail({
				from: NODEMAILER_FROM,
				to: user.email,
				subject: 'One more step to complete your registration',
				html: output,
			});
		}

		console.log(href);
	},

	/**
	 * Sends a password reset email to the user
	 * @param {string} href - The password reset link
	 * @param {object} user - The user object
	 */
	forgotPassword: async (href, user) => {
		const output = await render(
			<ForgotPassword href={href} name={user.name} />
		);

		if (ACTIVATE_EMAIL) {
			await transporter.sendMail({
				from: NODEMAILER_FROM,
				to: user.email,
				subject: 'Password reset link',
				html: output,
			});
		}

		console.log(href);
	},
};

module.exports = EmailController;
