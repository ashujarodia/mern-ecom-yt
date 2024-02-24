import express from 'express';
import NodeCache from 'node-cache';
import { config } from 'dotenv';
import { connectDB } from './utils/features.js';
import { errorMiddleware } from './middlewares/error.js';
import morgan from 'morgan';
import cors from 'cors';

//importing routes
import userRoutes from './routes/user.js';
import productRoutes from './routes/product.js';
import orderRoutes from './routes/order.js';
import paymentRoutes from './routes/payment.js';
import dashboardRoutes from './routes/stats.js';
import Stripe from 'stripe';

config({
	path: './.env',
});

const mongoURI = process.env.MONGO_URI || '';
const port = process.env.PORT || 4000;
const stripeKey = process.env.STRIPE_KEY || '';

connectDB(mongoURI);

export const stripe = new Stripe(stripeKey);

export const myCache = new NodeCache();

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.get('/', (req, res) => {
	res.send('Api working with /api/v1');
});

//using routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/order', orderRoutes);
app.use('/api/v1/payment', paymentRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);

app.use('/uploads', express.static('uploads'));
app.use(errorMiddleware);

app.listen(port, () => {
	console.log(`Server is working on port : ${port}`);
});
