import {Request, Response, NextFunction} from 'express';
import tokens from '../utils/token';
import userModel from '../resources/user/model'
import cookie from 'cookie';


export default function authenticate(request: Request, response: Response, next: NextFunction)  {
    try {
const cookies = cookie.parse(request.headers.cookie || '');
const token = cookies.token;
if(!token){
    return response.status(401).send({status: "error", message: "You need to login"});
}
const decoded  = tokens.verifyToken(token);
const user = userModel.findById(decoded.id);
if(!user){
    return response.status(401).send({status: "error", message: "User not found"});
}
request.user = user;
next();

    } catch (error : any) {
        return response.status(error.status || 400).send({status: "error", message: error.message});
    }
}