import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import http from "http";
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import sequelize from './models';
import { errorMiddleware } from './middleware/errorMiddleware';
import authRouter from './auth/routers/authRouter';
import userRouter from './user/routers/userRouter';
import evaluationRouter from './evaluation/routers/evaluationRouter';
import { RATE_LIMIT } from './utils/constants';
import { 
    monthlyReminderCron,
    followUpReminderCron,
} from './cron';
import UserRepository from './user/repositories/userRepository';

const app = express();
const host = process.env.HOST || 'localhost';
const port = Number(process.env.PORT || 8000);
const httpServer = http.createServer(app);

app.use(helmet());
app.use(express.json());
app.use(cors()); 

const limiter = rateLimit({
    max: 1000,
    windowMs: 60 * 60 * 1000,
    message: RATE_LIMIT,
});
app.use('/api', limiter);

const userRepository = new UserRepository();

monthlyReminderCron(userRepository);
followUpReminderCron(userRepository);

app.get('/', (req, res) => {
    return  res.status(StatusCodes.OK).json({
        success: true,
        data: `${ReasonPhrases.OK} : Homepage`,
    });
});

app.get('/api', (req, res) => {
    return  res.status(StatusCodes.OK).json({
        success: true,
        data: `${ReasonPhrases.OK} : API`,
    });
});

app.get('/api/v1', (req, res) => {
    return  res.status(StatusCodes.OK).json({
        success: true,
        data: `${ReasonPhrases.OK} : API - v1`,
    });
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/evaluations', evaluationRouter);

app.all('*', (req, res) => {
    return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        data: `Can't find ${req.originalUrl} on this server.`,
    });
});

app.use(errorMiddleware);

const startServer = async () => {
    try {
        await sequelize?.authenticate();
        console.log(`[DATABASE] - Database connection has been successfully established.`);

        try {
            httpServer.listen(port, host, () => {
                console.log(`🌟 🛠️  [SERVER] - Server is listening on http://${host}:${port}`);
            });
        } catch (error){
            console.log(`[SERVER] - Failed to start. Encountered an error during startup.`, error);
        } 
    } catch (error) {
        console.log(`[DATABASE] - Server not started due to database connection error.`, error);
    }
  
};

startServer();

export default app;
