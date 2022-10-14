import 'dotenv/config';
import 'module-alias/register';
import validateEnv from './utils/validateEnv';
import App from './app';
import PostController from './resources/post/controller';
import UserController from './resources/user/controller';

validateEnv();

const app = new App(
    [new PostController(), new UserController()],Number(process.env.PORT)
);

app.listen();