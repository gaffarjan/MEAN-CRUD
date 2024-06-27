import express from 'express';
import { createUser, getUsers, getUser,  updateUser , deleteUser  } from  '../controller/CRUD.controller.js'

const userRouter = express.Router();

userRouter.post('/create',createUser);
userRouter.get('/getUsers',getUsers);
userRouter.get('/getUser',getUser);
userRouter.put('/update',updateUser);
userRouter.delete('/delete',deleteUser);


export default userRouter;