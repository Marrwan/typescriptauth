import jwt from 'jsonwebtoken';
import User from  '../resources/user/interface';

const generateToken = (user: User): string => {
    const token = jwt.sign(
        {
            id: user._id,
        },
       process.env.JWT_SECRET as jwt.Secret,
        {
            expiresIn: '1d',
        }
    );
    return token;
}

const verifyToken = (token: string): any => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as jwt.Secret);
    return decoded;
}

export default {generateToken, verifyToken};