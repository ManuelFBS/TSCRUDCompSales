import express, {
    Application,
    Request,
    Response,
} from 'express';
import cookieParser from 'cookie-parser';
import csrf from 'csrf';
import dotenv from 'dotenv';
import syncDatabase from './config/synchronicityDB';
import cors from 'cors';
import morgan from 'morgan';
import {
    authRouter,
    employeeRouter,
    userRouter,
    supplierRouter,
    customerRouter,
    purchaseRouter,
} from './routes/index';
import { JWT_SECRET } from './config/auth';

const app: Application = express();

dotenv.config();

// ~ Settings...
app.set('port', process.env.PORT || 8585 || 3070);

// ~  Configuración de CSRF...
const csrfProtection = new csrf();

// ~ Middlewares...
app.use((req, res, next) => {
    const csrfToken = csrfProtection.create(JWT_SECRET);

    res.cookie('XSRF-TOKEN', csrfToken, { httpOnly: true });
    res.locals.csrfToken = csrfToken;
    next();
}); // > Middleware para generar tokens CSRF
//
app.use(cookieParser());
app.use(morgan('dev'));
app.use(
    cors({
        origin: 'http://localhost:5173', // >URL de tu frontend...
        credentials: true, // >Importante para las cookies...
        methods: [
            'GET',
            'POST',
            'PUT',
            'DELETE',
            'PATCH',
            'OPTIONS',
        ],
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'X-CSRF-TOKEN',
        ],
    }),
);
app.use(express.json());
app.use(express.static('public'));
// app.use(errorHandler);

// * Iniciando la DB...
const initializeDB = async () => {
    try {
        // > Sincroniza la DB...
        await syncDatabase();
        console.log('Database synchronized successfully.');
    } catch (error) {
        console.error(
            'Error synchronizing database:',
            error,
        );
        process.exit(1); // > Salir con error si la sincronización falla...
    }
};
//
initializeDB();

// ? Ruta de testeo...
app.get('/api', (req: Request, res: Response) => {
    res.json({ message: 'Api working...!!!' });
});

// * Routes...
app.use('/api/auth', authRouter);
app.use('/api/employees', employeeRouter);
app.use('/api/users', userRouter);
app.use('/api/suppliers', supplierRouter);
app.use('/api/customers', customerRouter);
app.use('/api/purchases', purchaseRouter);

export default app;
