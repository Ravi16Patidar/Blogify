import express from 'express';
import { login, signUp, userData } from '../controllers/UserController.js';
const route=express.Router();

route.post('/signup',signUp)
route.post ('/login',login)
route.get ('/userData/:id',userData)

export default route;