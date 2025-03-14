const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');

dotenv.config();

const PORT = process.env.APP_PORT || 3001;
const URL = process.env.APP_URL || 'http://localhost:3001';
const ORIGIN = process.env.APP_ORIGIN || 'http://localhost:5173';

const app = express();

app.use(
	cors({
		origin: ORIGIN,
		credentials: true,
	})
);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const errorHandler = require('../middleware/errors');

const userRoutes = require('../routes/user.routes');
const bookRoutes = require('../routes/book.routes');
const eventRoutes = require('../routes/event.routes');
const giftRoutes = require('../routes/gift.routes');
const donationRoutes = require('../routes/donation.routes');

app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/gifts', giftRoutes);
app.use('/api/donations', donationRoutes);

app.use(errorHandler);

app.get('*', (req, res) => {
	res.sendStatus(404);
});

app.listen(PORT, () => {
	console.log('Server is running on ' + URL);
});
