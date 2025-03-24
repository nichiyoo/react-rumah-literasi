const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const sequelizeStore = require('connect-session-sequelize')(session.Store);
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

const errorHandler = require('../middleware/errors');
const { authenticate } = require('../middleware/authenticate');

const authRoutes = require('../routes/auth.routes');
const userRoutes = require('../routes/user.routes');
const bookRoutes = require('../routes/book.routes');
const eventRoutes = require('../routes/event.routes');
const giftRoutes = require('../routes/gift.routes');
const donationRoutes = require('../routes/donation.routes');

app.use('/api/auth', authRoutes);

app.use(authenticate);
app.use('/api/members', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/gifts', giftRoutes);
app.use('/api/donations', donationRoutes);
app.use(errorHandler);

app.get('*', (req, res) => {
	res.sendStatus(404);
});

store.sync();

app.listen(PORT, () => {
	console.log('Server is running on ' + URL);
});
