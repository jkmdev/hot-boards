import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import path from 'path';

import userRoutes from './routes/users';
import postRoutes from './routes/posts';
import boardRoutes from './routes/boards';

const app = express();
require('dotenv').config();

// connect database to application
mongoose.connect(
    process.env.DB, 
    { useNewUrlParser: true },
    () => {
        console.log('Connected to mongodb');
    }
);
mongoose.Promise = global.Promise;
let db = mongoose.connection;

//database error handling
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('connected', function() {
    console.info("MongoDB connection established successfully");
});
db.once('open', function callback () {
    console.log("MongoDB connection open");
});

// Middleware

// response loggin tool
app.use(morgan('dev'));

// parsing body in post requests
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

// 'catchall' handler for requests that don't match previously defined ones
app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '/../build/index.html'));
})

// general error handler
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

export default app;