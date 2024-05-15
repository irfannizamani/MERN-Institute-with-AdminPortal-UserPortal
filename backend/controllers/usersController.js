const { User, Feedbacks } = require('../models/usersModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');


exports.registerUser = async (req, res) => {
    try {
        const { email, password, name, surname } = req.body;
        
        // Check if the email already exists in the database
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // Using 10 salt rounds
        const newUser = new User({ email, password: hashedPassword, name, surname });
        await newUser.save();
        return res.status(201).json({ message: "User added successfully" });
    } catch (error) {
        console.error("Error adding user:", error);
        return res.status(500).json({ message: "User addition error" });
    }
};
module.exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ code: 404, message: 'User not found' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ code: 401, message: 'Invalid email or password' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });
        // Send user's name, surname, email, and token in response
        return res.status(200).json({ code: 200, message: 'Login success', name: user.name, surname: user.surname, email: user.email, token });
        
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ code: 500, message: 'Login error' });
    }
};

//
exports.addFeedback = async (req, res) => {
    try {
        const { feedbackMsg, emailUser } = req.body;

        // Check if feedback message or email is missing
        if (!feedbackMsg || !emailUser) {
            return res.status(400).send({ code: 400, message: "Fill all fields" });
        }

        const newFeedback = new Feedbacks({ feedbackMsg, emailUser });
        await newFeedback.save();

        return res.status(200).send({ code: 200, message: "Feedback added successfully", data: newFeedback });
    } catch (error) {
        console.error("Error adding feedback:", error);
        return res.status(500).send({ code: 500, message: "Failed to add feedback" });
    }
};

exports.getFeedbacks = async (req, res) => {
    try {
        const feedbacks = await Feedbacks.find({});
        return res.status(200).send({ code: 200, message: "Feedbacks retrieved successfully", data: feedbacks });
    } catch (error) {
        console.error("Error retrieving feedbacks:", error);
        return res.status(500).send({ code: 500, message: "Feedbacks retrieval error" });
    }
};


exports.deleteFeedback = async (req, res) => {
    try {
        const feedbackId = req.params.id; // Get the feedback ID from request parameters
        
        // Find the feedback by ID and delete it
        const deletedFeedback = await Feedbacks.findByIdAndDelete(feedbackId);
        
        if (!deletedFeedback) {
            // If the feedback with the provided ID is not found, return an error response
            return res.status(404).send({ code: 404, message: "Feedback not found" });
        }

        // If deletion is successful, return success response
        return res.status(200).send({ code: 200, message: "Feedback deleted successfully" });
    } catch (error) {
        // If an error occurs during deletion, return error response
        console.error("Error deleting feedback:", error);
        return res.status(500).send({ code: 500, message: "Failed to delete feedback" });
    }
};



module.exports.sendotp = async (req, res) => {
    console.log(req.body)
    const _otp = Math.floor(100000 + Math.random() * 900000)
    console.log(_otp)
    let user = await User.findOne({ email: req.body.email })
    // send to user mail
    if (!user) {
        res.send({ code: 500, message: 'user not found' })
    }
  
    let testAccount = await nodemailer.createTestAccount()
  
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.email,
            pass: process.env.pass
        }
    })
  

  
  
    let info = await transporter.sendMail({
        from: process.env.email,
        to: req.body.email, // list of receivers
        subject: "[NIZVARSITY] - Reset Account OTP ", // Subject line
        text: `Your OTP is: ${_otp}`, // Include OTP in the text
        html: `<html><body>Hello ${req.body.email} <br/> Your NIZVARSITY OTP is: ${_otp}</body></html>`, // Include OTP in the HTML body


   
    })
  
    if (info.messageId) {
  
        console.log(info, 84)
        User.updateOne({ email: req.body.email }, { otp: _otp })
            .then(result => {
                res.send({ code: 200, message: 'otp sent' })
            })
            .catch(err => {
                res.send({ code: 500, message: 'Server err' })
  
            })
  
    } else {
        res.send({ code: 500, message: 'Server err' })
    }
  }
  


  module.exports.submitotp = async (req, res) => {
      const { otp, newPassword } = req.body;
    
      try {
          const user = await User.findOne({ otp });
    
          if (!user) {
              return res.status(404).json({ code: 404, message: 'OTP is invalid or has expired' });
          }
  
          // Hash the new password
          const hashedPassword = await bcrypt.hash(newPassword, 10); // Using 10 salt rounds
  
          // Update the user's password
          await User.updateOne({ email: user.email }, { password: hashedPassword });
    
          return res.status(200).json({ code: 200, message: 'Password updated successfully' });
      } catch (error) {
          console.error('Error changing password:', error);
          return res.status(500).json({ code: 500, message: 'Server error' });
      }
  };
  

  exports.checkEmailExistence = async (req, res) => {
    const { email } = req.body;
    
    try {
      const user = await User.findOne({ email });
      if (user) {
        // User with provided email exists
        return res.status(200).json({ exists: true });
      } else {
        // User with provided email does not exist
        return res.status(404).json({ exists: false });
      }
    } catch (error) {
      console.error('Error checking email existence:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  };



