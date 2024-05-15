const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    otp: { type: Number, required: false },
    name: { type: String, required: true },
    surname: { type: String, required: true }
  });
  

  const feedbackSchema = new mongoose.Schema({
    feedbackMsg: { type: String, required: true },
    emailUser: { type: String, required: true }
  });

  // Create and export models 
const User = mongoose.model('User', userSchema);
const Feedbacks = mongoose.model('Feedbacks', feedbackSchema);


module.exports = {User, Feedbacks};