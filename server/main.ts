import App from './app'

import * as bodyParser from 'body-parser'
import loggerMiddleware from './middleware/logger'

import PostsController from './controllers/posts/posts.controller'
import HomeController from './controllers/home/home.controller'

const app = new App({
   port: 3002,
   controllers: [
      new HomeController(),
      new PostsController()
   ],
   middleWares: [
      bodyParser.json(),
      bodyParser.urlencoded({ extended: true }),
      loggerMiddleware
   ]
});

app.listen();
