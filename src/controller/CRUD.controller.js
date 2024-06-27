import User from "../models/user.model.js";
import mongoose, { Mongoose } from "mongoose";
import bcrypt from "bcrypt";

const createUser = async (req, res, next) => {
  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
      phone: req.body.phone,
    });
    const savedUser = await user.save({ select: '-password -__v' });
    res.status(200).json({
      isSuccess: true,
      data: savedUser,
    });
    console.log(user);
  } catch (error) {
    res.status(400).json({
      isSuccess: false,
      message: error,
    });
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, ['-password','-__v']);
    console.log(users);
    res.status(200).json({
        isSuccess: true,
        data: users,
      });
    console.log("Get Users");
  } catch (error) {
    console.log("Error while creating user");
  }
};

const getUser = (req, res, next) => {
  try {
    console.log("Get User");
  } catch (error) {
    console.log("Error while creating user");
  }
};

const updateUser = (req, res, next) => {
  try {
    console.log("Update User");
  } catch (error) {
    console.log("Error while creating user");
  }
};

const deleteUser = async (req, res, next) => {
    try {
      const userId = req.query.id;
      console.log(userId);
      const deletedUser = await User.findByIdAndDelete(userId);
  
      if (deletedUser) {
        res.status(200).json({
          isSuccess: true,
          message: 'User deleted successfully',
          data: deletedUser,
        });
      } else {
        res.status(404).json({
          isSuccess: false,
          message: 'User not found',
        });
      }
    } catch (error) {
      res.status(400).json({
        isSuccess: false,
        message: error.message,
      });
    }
  };

export { createUser, getUsers, getUser, updateUser, deleteUser };
