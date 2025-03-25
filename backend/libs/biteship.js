const base = require('axios');

const midtrans = base.create({
	baseURL: process.env.BITESHIP_API_URL,
	headers: {
		'Content-Type': 'application/json',
		Authorization: process.env.BITESHIP_API_KEY,
	},
});

module.exports = midtrans;
