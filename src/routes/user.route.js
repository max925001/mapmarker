import express from 'express';
import { register, login, logout } from '../controllers/user.controller.js';
import { validate, registerSchema, loginSchema } from '../utils/validate.js';

const userrouter = express.Router();

userrouter.post('/register', validate(registerSchema), register);
userrouter.post('/login', validate(loginSchema), login);
userrouter.post('/logout', logout);

export default userrouter;