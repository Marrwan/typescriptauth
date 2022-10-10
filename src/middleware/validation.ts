import {Request, Response, NextFunction, RequestHandler} from 'express';
import joi from 'joi';

export default function validationMiddleware(schema: joi.ObjectSchema) : RequestHandler {
    return async(
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<void> => {
        try {
            const validateOptions = {
                abortEarly: false,
                allowUnknown: true,
                stripUnknown: true,
            };
            const value = await schema.validateAsync(req.body, validateOptions);
            req.body = value;
            next();
        } catch (e:any) {
            const errors : string[] = [];
            e.details.forEach((error : joi.ValidationErrorItem) => {
                errors.push(error.message);
            });
            res.status(400).send({errors});

        }
    };
    }