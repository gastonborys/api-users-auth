import { config as dotEnvConfig } from "dotenv";
dotEnvConfig();

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import { config } from "./config";
import healthRouter from "./health/health-router";
import userRoutes from "./users/infra/routes/user.routes";
import apiRoutes from "./api.routes";

// App
const app = express();

// Routes
const apiPaths = {
    api             : '/api',
    users           : '/api/users',
    health          : '/api/health',
}

const db = () => {
    mongoose.set('strictQuery', false);

    mongoose.connect(`${config.mongo.server}`, {
        user: config.mongo.mongou,
        pass: config.mongo.mongop,
        dbName: config.mongo.db
    });
}

const middlewares = () => {
    app.use(
        cors({
            origin: '*',
            methods: ['POST', 'GET', 'PUT', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Authorization'],
        })
    );

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
};

const routes = () => {
    app.use(apiPaths.api, apiRoutes);
    app.use(apiPaths.users, userRoutes);
    app.use(apiPaths.health, healthRouter);
};

const start = () => {

    const { port } = config.server;

    // init db
    db();

    // set middlewares
    middlewares();

    // set routes()
    routes();

    app.listen(port, () => {
        console.log(`[APP] - User / Auth Service is up in port ${port}`);
    });
}

start();
