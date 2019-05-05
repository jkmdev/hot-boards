import express from 'express';
import boardController from '../controllers/boardController';

const routes = express();

// get all data with board at given id
routes.get('/:boardTitle', boardController.get);

// create new board
routes.post('/new', boardController.post);

// update existing board
routes.patch('/:boardTitle', boardController.patch);

// add post to board
routes.post('/:boardTitle/submit', boardController.submit);

export default routes;
