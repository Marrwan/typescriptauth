import {Router} from 'express';
import Controller from '../../utils/interfaces/controller';

class UserController implements Controller {
 public path = '/users';
public router = Router();

constructor(){
this.initializeRoutes();
}

private initializeRoutes(){
// this.router.get(this.path, this.getUsers);
}

}