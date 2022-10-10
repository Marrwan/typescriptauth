import {Request, Response, NextFunction, Router} from 'express';
import HttpException from '../../utils/exceptions/httpException';
import Controller from '../../utils/interfaces/controller';
import validationMiddleware from '../../middleware/validation';
import validate from './validation';
import postService from './service';


class PostController implements Controller {
    public path = '/posts';
    public router = Router();
    private PostService = new postService()

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path,  this.getPosts);
        this.router.get(`${this.path}/:id`, this.getPost);
        this.router.post(this.path, validationMiddleware(validate.create), this.create);
        // this.router.put(`${this.path}/:id`, validationMiddleware(validate.updatePost), this.updatePost);
        // this.router.delete(`${this.path}/:id`, this.deletePost);
    }

    private create = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const {title,body} = request.body;
            const createdPost = await this.PostService.create(title,body);
            response.send(createdPost);
        } catch (error :any) {
            next(new HttpException(500, error));
        }
    }
    private getPosts = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const posts = await this.PostService.findAll();
            response.send(posts);
        } catch (error :any) {
            next(new HttpException(500, error));
        }
    }
    private getPost = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const {id} =  request.params
            const posts = await this.PostService.findOne(id);
            response.send(posts);
        } catch (error :any) {
            next(new HttpException(500, error));
        }
    }


}

export default PostController;