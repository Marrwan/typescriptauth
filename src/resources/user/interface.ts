import {Document} from 'mongoose'

export default interface User extends Document {
    name: string;
    email: string;
    password: string;
    role: string;

    isPasswordMatch(password: string) : Promise<Error|boolean>;

    
}
