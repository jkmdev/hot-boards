import app from './app';

const HTTP_PORT = process.env.SERVER_PORT || 3001;

app.listen(HTTP_PORT, () => {
    console.log('Listening on port 3001...');
});