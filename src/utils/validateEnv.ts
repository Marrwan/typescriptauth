import {cleanEnv,str,port} from 'envalid';

export default function validateEnv(): void{
  cleanEnv(process.env, {
    NODE_ENV : str({
        choices: ['development', 'production', 'test'],
    }),
    MONGO_URL: str(),
    PORT: port({default: 5000}),
    JWT_SECRET: str()
  });
}
