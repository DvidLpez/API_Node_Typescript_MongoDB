import { Router } from "express";
import { AUTH_TOKEN } from "@src/middleware/auth";
import UserController from "@src/controllers/user";

let userRoutes = Router();
let userCtrl = new UserController;

// Login de usuario
userRoutes.post('/login', userCtrl.login);
// Crear un  nuevo usuario
userRoutes.post('/', userCtrl.newUser);
// Acturalizar el usuario y nuevo token
userRoutes.put('/', [ AUTH_TOKEN ] , userCtrl.updateToken);
// Recoger el token del usuario para validarlo
userRoutes.get('/', [ AUTH_TOKEN ] , userCtrl.getUserToken);

export default userRoutes;