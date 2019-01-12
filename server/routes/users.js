import express from 'express';
import userController from '../controllers/userController';

const routes = express();

// create new user
routes.post('/signup', userController.post);

export default routes;