import express from 'express';
import cookieParser from 'cookie-parser';
import errorHandler from './middlewares/error.middleware.js';
import userrouter from './routes/user.route.js';
import cors from 'cors';
import morgan from 'morgan'
import makerrouter from './routes/maker.route.js';
import rateLimit from 'express-rate-limit';





const app = express();
const limiter = rateLimit({
    windowMs:  15*60 * 1000, // 15 minutes
    max: 50, // limit each IP to 100 requests per windowMs
    message: 'Too many requests, please try again later.'
})

app.use(express.json());
app.use(express.urlencoded({
    extended:true
}))
app.use(cookieParser());


app.use(cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization','Cookie'],

}))

app.use(morgan('dev'))
app.use(limiter);
app.get('/ping', (req, res) => {
    res.send('pong');
})


app.use('/api/v1/user', userrouter);
app.use('/api/v1/markers', makerrouter);

app.use(errorHandler);

export default app;