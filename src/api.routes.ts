import { UserValidator } from './users/app/user.validator';
import { Router } from "express";
import { MongoRepository } from "./users/infra/repository/mongo.repository";
import { UserController } from "./users/infra/controller/user.controller";
import { UserService } from "./users/app/user.service";
import IUserRepository  from './users/domain/user.repository';
import IUserValidator from './users/domain/user.validator.interface';
const router = Router();

const userRespository: IUserRepository = new MongoRepository();

const userValidator: IUserValidator     = new UserValidator(userRespository);

const userService       = new UserService(userRespository, userValidator);

const userController    = new UserController(userService);

router.post('/login',           userController.login);

export default router;

