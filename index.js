import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import morgan from 'morgan';
import helmet from 'helmet';
import routes from './routes/index.js';


const app = express();
dotenv.config();

// Middlewares
app.use(express.json());
app.use(morgan('common'));
app.use(helmet());


// Connecting mongo database
const port = process.env.PORT || 8000;
const connectDb = async () => {
    try{
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.DB_CONNECT);
        app.listen(port, () => console.log(`Database is connected and Server is running on port: ${port}.`))
    }catch(err){
        console.log(`Database connection error: ${err}`);
    }
};

connectDb();

app.use('/api', routes);