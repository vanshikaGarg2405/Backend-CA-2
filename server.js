import 'dotenv/config';
import express from 'express';
import bookRoute from './route/bookRoute.js';
import connectDB from './db/database.js';

const app = express();
app.use(express.json());
connectDB();
app.use('/', bookRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('Server is listening....');
});