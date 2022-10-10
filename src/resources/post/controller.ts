import {Request, Response, NextFunction} from 'express';
import HttpException from '@/utils/exceptions/httpException';
import Controller from '@/utils/interfaces/controller';
import validationMiddleware from '@/middleware/validation';
import validate from './validation';
import postService from './service';


class PostController implements Controller {
    public path = '/posts';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, this.getAllPosts);
        this.router.get(`${this.path}/:id`, this.getPostById);
        this.router.post(this.path, validationMiddleware(validate.createPost), this.createPost);
        this.router.put(`${this.path}/:id`, validationMiddleware(validate.updatePost), this.updatePost);
        this.router.delete(`${this.path}/:id`, this.deletePost);
    }

}