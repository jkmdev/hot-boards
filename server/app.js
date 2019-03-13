import express from 'express';
import mongoose from 'mongoose';
//import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';

import userRoutes from './routes/users';
import postRoutes from './routes/posts';
import boardRoutes from './routes/boards';

const path = require('path')

require('dotenv').config();



// connect database to application
mongoose.connect(
    process.env.DB, () => {
        console.log('Connected to mongodb');
    }
);

const app = express();

// Middleware

app.use(cors());

// forcing express to use build output from client
//app.use( express.static( `${__dirname}/../build` ) );

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

// 'catchall' handler for requests that don't
// match previously defined ones
app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '/../build/index.html'));
})

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

export default app;