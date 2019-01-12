import express from 'express';
import postController from '../controllers/postController';

const routes = express();

// create response to post
routes.post('/:postId/respond', postController.respond);

// get all data for post
routes.get('/:postId', postController.get);

export default routes;