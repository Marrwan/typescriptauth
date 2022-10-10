import {Request, Response, NextFunction} from 'express';
import HttpException from '../utils/exceptions/httpException';

export default function errorMiddleware(error: HttpException, request: Request, response: Response, next: NextFunction) : void {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
    response.status(status).send({
        status,
        message,
    });
}