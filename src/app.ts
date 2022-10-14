import express, { Application } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import Controller from './utils/interfaces/controller';
import errorMiddleware from './middleware/error';
import compression from 'compression';

class App {
    public express: Application;
    public port: number;

    constructor(controllers: Controller[], port: number) {
        this.express = express();
        this.port = port;

        this.initializeDatabase();
        this.initializeMiddleware();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
    }
    private initializeMiddleware(): void {
        this.express.use(express.json());
        this.express.use(cors());
        this.express.use(morgan('dev'));
        this.express.use(helmet());
        this.express.use(express.urlencoded({ extended: true }));
        this.express.use(compression());
    }

    private initializeControllers(controllers: Controller[]): void {
        controllers.forEach((controller) => {
            this.express.use('/api', controller.router);
        });
    }

    private initializeErrorHandling(): void {
        this.express.use(errorMiddleware);
    }

    private initializeDatabase(): void {
        mongoose.connect(<string>process.env.MONGO_URL);
    }

    public listen(): void {
        this.express.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}

export default App;