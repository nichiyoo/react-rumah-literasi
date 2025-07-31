require('@babel/register')({
	extensions: ['.js', '.jsx'],
});

const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const sequelizeStore = require('connect-session-sequelize')(session.Store);
const ratelimit = require('express-rate-limit');

const { sequelize } = require('../models');

dotenv.config();

const PORT = process.env.APP_PORT || 3001;
const URL = process.env.APP_URL || 'http://localhost:3001';
const ORIGIN = process.env.APP_ORIGIN || 'http://localhost:5173';
const SECRET = process.env.APP_SECRET || 'rumah-literasi';

const app = express();
const store = new sequelizeStore({
	db: sequelize,
	tableName: 'sessions',
});

app.use(
	cors({
		origin: ORIGIN,
		credentials: true,
	})
);

app.use(
	session({
		store: store,
		secret: SECRET,
		resave: false,
		saveUninitialized: true,
		cookie: {
			httpOnly: true,
		},
	})
);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

app.use(
	ratelimit({
		limit: 30,
		windowMs: 1 * 60 * 1000,
		standardHeaders: 'draft-8',
	})
);

const errorHandler = require('../middleware/errors');
const authRoutes = require('../routes/auth.routes');
const paymentRoutes = require('../routes/payment.routes');

const { authenticate } = require('../middleware/authenticate');
const { authorize } = require('../middleware/authorize');
const { delay } = require('../middleware/delay');

const userRoutes = require('../routes/user.routes');
const bookRoutes = require('../routes/book.routes');
const eventRoutes = require('../routes/event.routes');
const giftRoutes = require('../routes/gift.routes');
const donationRoutes = require('../routes/donation.routes');
const transactionRoutes = require('../routes/transaction.routes');
const deliveryRoutes = require('../routes/delivery.routes');

app.use('/api/_healthcheck', (req, res) => {
	res.status(200).json({
		message: 'Server is running correctly',
	});
});

app.use(delay(1000));
app.use('/api/auth', authRoutes);
app.use('/api/payment', paymentRoutes);

app.use(authenticate);
app.use('/api/gifts', giftRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/deliveries', deliveryRoutes);
app.use('/api/books', bookRoutes);

const admin = authorize('admin');

app.use(admin);
app.use('/api/books', bookRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/members', userRoutes);

app.use(errorHandler);
app.get('*', (req, res) => {
	res.sendStatus(404);
});

store.sync();

app.listen(PORT, () => {
	console.log('Server is running on ' + URL);
});
