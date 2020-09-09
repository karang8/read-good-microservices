const mongoose = require('mongoose');

const { Schema } = mongoose;

let User;

const userSchema = new Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: { type: String, required: true },
});

if (mongoose.models.User) {
  User = mongoose.model('User');
} else {
  User = mongoose.model('User', userSchema);
}


module.exports = User;
