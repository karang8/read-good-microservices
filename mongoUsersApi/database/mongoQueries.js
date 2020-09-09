/* eslint-disable no-param-reassign */
import bcrypt from 'bcryptjs';
import User from '../models/user';

exports.signUp = async (signUpData) => {
  const user = await User.findOne({ email: signUpData.email }).exec();
  if (user) {
    const error = new Error('The email already exists');
    error.error_code = 409;
    error.message = 'The email already exists';
    throw error;
  }
  signUpData.password = bcrypt.hashSync(signUpData.password, 10);
  const newUser = new User(signUpData);
  try {
    const response = await newUser.save();
    console.log(response);
    return response;
  } catch (error) {
    console.log(error)
    return error;
  }
};

exports.signIn = async (data) => {
  const user = await User.findOne({ email: data.email }).exec();
  if (!user) {
    const error = new Error('Problem in credentials');
    error.error_code = 401;
    error.message = 'The email does not exist';
    throw error;
  }
  if (!bcrypt.compareSync(data.password, user.password)) {
    const error = new Error('Problem in credentials');
    error.error_code = 401;
    error.message = 'The password is invalid';
    throw error;
  }
  return user;
};

exports.getUser = async (id) =>{
  const user = await User.findById(id).select('--password')
  console.log(user, user);
  return user;
    // .then((user) => { 
    //   console.log(user);
    //   return user;
    // });
}