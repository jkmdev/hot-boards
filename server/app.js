import express from 'express';
import mongoose from 'mongoose';
//import bodyParser from 'body-parser';
import morgan from 'morgan';

import userRoutes from './routes/users';
import postRoutes from './routes/posts';
import boardRoutes from './routes/boards';

// connect database to application
mongoose.connect(
    'mongodb://localhost:27017/hb', () => {
        console.log('Connected to mongodb');
    }
);

const app = express();

// Middleware

// response loggin tool
app.use(morgan('dev'));

// parsing body in requests?
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// CORS error prevention
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    }
    next();
});

// app routing
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/boards", boardRoutes);

// app-wide error handling
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

// more error handling
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

// forcing express to use build output
app.use( express.static( `${__dirname}/../build` ) );

export default app;