import {Request, Response, NextFunction,Router} from 'express';
import Controller from '../../utils/interfaces/controller';
import validationMiddleware from '../../middleware/validation';
import validate from './validation';
import UserService from './service';
import passwordValidator from 'password-validator';
import cookie from 'cookie';
import authenticate from '../../middleware/authenticate';

class UserController implements Controller {
public path = '/users';
public router = Router();
private userService = new UserService();
public schema = new passwordValidator();
public cookieOptions ={
    expires: new Date(
        30 * 24 * 60 * 60 * 1000 + Date.now()
    ), //* Milliseconds)
    // secure: true,
    httpOnly: true, //? Cookie can NOT be accessed / modified by browser
  };


constructor(){
this.initializeRoutes();
}

private initializeRoutes(){
this.router.post(`${this.path}/signup`, validationMiddleware(validate.create),  this.register);
this.router.post(`${this.path}/login`, validationMiddleware(validate.login), this.login)
this.router.get(this.path, authenticate, this.getUser);
}

private register = async (request: Request, response: Response, next: NextFunction) => {
    try {
       const {email, password, name, role} = request.body;
const token = await this.userService.register(email, password, name, role);

response.json({status:"success",token}); 
    

    } catch (error : any) {
        // return new HttpException(error.status || 500, error);
       return response.status(error.status || 400).send({status: "error", message: error.message});
    }

}

private login = async (request: Request, response: Response, next: NextFunction) =>  {
    try {
        const {email, password} = request.body;
    
       const token = await this.userService.login(email, password)
       response.cookie('token', token, this.cookieOptions);
       response.json({token});
    } catch (error : any) {
        return response.status(error.status || 400).send({status: "error", message: error.message});
    }
}

private getUser =  async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = await request.user;
        return response.send({user});
        // response.json(user);
        // throw new Error('User not found');
//         var cookies = cookie.parse(request.headers.cookie || '')
//         const token = cookies.token;
//         if(!token){
//             throw new Error('You need to login');
//         }
//         const user = await this.userService.getUser(token);
//        return response.json({status: "success", user});
//         // return response.status(401).send({status: "error", message: "User not found"});
 
//    return response.json({user:request.user})
} catch (error : any) {
    return response.status(error.status || 400).send({status: "error", message: error.message});
}
}
}

export default UserController;