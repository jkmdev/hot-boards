
![](https://i.imgur.com/Zf3S6Db.png)

# Hot Boards

A forum like reddit or Hackernews where posts and comments are scored, but on different criteria beyond upvotes and downvotes. 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

- Node.js
- mongodb

### Installing

Clone the project onto your local machine, then run the start command to start the application. Doing so will run both the client and server together.

```
git clone git@github.com:jkmdev/hot-boards.git
cd hot-boards
npm install
npm start
```

To run the client on its own use `npm run client`.

## Running the tests

TBD

### Break down into end to end tests

TBD

### And coding style tests

TBD

## Deployment

### VM Requirements

- Node.js
- mongodb
- pm2
- nginx

### Process

Clone the repo onto the VM you're deploying the app to and navigate to the project folder.

```
git clone git@github.com:jkmdev/hot-boards.git
cd hot-boards
```

Create a production build of the site. The server will run using these new files, after creating them you can run the server, which itself will serve the client side of the app. However you need to run the server with pm2 so that it always runs in the background, even when you close the terminal.

```
npm run build
pm2 start server/app.js
```
To visit your app without needing to specific your server's port number, install nginx, then run:

```
sudo vi /etc/nginx/sites-available/default
```
...and change /location to:

```
location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
```
At this point when you navigate to your VM's ip address, it should show the site.

## Built With

* [React](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [React Material](https://maven.apache.org/) - UI
* [Express.js](https://rometools.github.io/rome/) - Backend framework
* [MongoDB](https://rometools.github.io/rome/) - Database
* [Digital Ocean](https://rometools.github.io/rome/) - Hosting


## Contributing

TBD

