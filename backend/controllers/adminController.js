const { Admin, Services, Courses, Carousels, Career, Contact, Updates } = require('../models/adminModel');
const jwt = require('jsonwebtoken');
const path = require('path');
const multer = require('multer');
const fs = require("fs");
require('dotenv').config();
const bcrypt = require('bcrypt');


// Controller logic for Admin
exports.getAdmins = async (req, res) => {
    try {
        const admins = await Admin.find();
        return res.status(200).json(admins);
    } catch (error) {
        console.error("Error fetching admin data:", error);
        return res.status(500).json({ message: "Error fetching admin data" });
    }
};

exports.loginAdmin = async (req, res) => {
    try {
        const { userName, password } = req.body;
        const admin = await Admin.findOne({ userName });
        if (!admin) {
            return res.status(400).json({ message: "Invalid username or password" });
        }
        const passwordMatch = await bcrypt.compare(password, admin.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: "Invalid username or password" });
        }
        const token = jwt.sign({ userId: admin._id }, process.env.JWT_SECRET);
        return res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error("Error logging in:", error);
        return res.status(500).json({ message: "Login error" });
    }
};

// Controller logic for Services
exports.addServices = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).send({ code: 400, message: "Fill all fields" });
        }

        const newService = new Services({ title, description });
        await newService.save();

        return res.status(200).send({ code: 200, message: "Services added successfully", data: newService });
    } catch (error) {
        console.error("Error adding services:", error);
        return res.status(500).send({ code: 500, message: "Failed to add services" });
    }
};

// Controller logic for updating a service
exports.updateService = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        
        // Check if both title and description are provided
        if (!title || !description) {
            return res.status(400).json({ code: 400, message: "Both title and description are required" });
        }

        // Find the service by ID and update its title and description
        const updatedService = await Services.findByIdAndUpdate(id, { title, description }, { new: true });

        if (updatedService) {
            return res.status(200).json({ code: 200, message: "Service updated successfully", data: updatedService });
        } else {
            return res.status(404).json({ code: 404, message: "Service not found" });
        }
    } catch (error) {
        console.error("Error updating service:", error);
        return res.status(500).json({ code: 500, message: "Failed to update service" });
    }
};


exports.getServices = async (req, res) => {
    try {
        const _data = await Services.find({});
        return res.status(200).send({ code: 200, message: "Services retrieved successfully", data: _data });
    } catch (error) {
        console.error("Error retrieving services:", error);
        return res.status(500).send({ code: 500, message: "Services retrieval error" });
    }
};

exports.getServiceById = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await Services.findById(id);
        if (service) {
            return res.status(200).json({ code: 200, message: "Service retrieved successfully", data: service });
        } else {
            return res.status(404).json({ code: 404, message: "Service not found" });
        }
    } catch (error) {
        console.error("Error fetching service details:", error);
        return res.status(500).json({ code: 500, message: "Error fetching service details" });
    }
};


exports.deleteServices = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Deleting service with ID:', id); // Add this line for logging
        const deletedService = await Services.findByIdAndDelete(id);
        if (deletedService) {
            return res.status(200).json({ code: 200, message: "Service deleted successfully" });
        } else {
            return res.status(404).json({ code: 404, message: "Service not found" });
        }
    } catch (error) {
        console.error("Error deleting service:", error);
        return res.status(500).json({ code: 500, message: "Failed to delete service" });
    }
};



// Courses
exports.addCourses = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).send({ code: 400, message: "Fill all fields" });
        }

        const newCourse = new Courses({ title, description });
        await newCourse.save();

        return res.status(200).send({ code: 200, message: "Courses added successfully", data: newCourse });
    } catch (error) {
        console.error("Error adding courses:", error);
        return res.status(500).send({ code: 500, message: "Failed to add Courses" });
    }
};


exports.getCourses = async (req, res) => {
    try {
        const _data = await Courses.find({});
        return res.status(200).send({ code: 200, message: "Courses retrieved successfully", data: _data });
    } catch (error) {
        console.error("Error retrieving courses:", error);
        return res.status(500).send({ code: 500, message: "Courses retrieval error" });
    }
};

exports.deleteCourses = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Deleting service with ID:', id); // Add this line for logging
        const deletedCourse = await Courses.findByIdAndDelete(id);
        if (deletedCourse) {
            return res.status(200).json({ code: 200, message: "Courses deleted successfully" });
        } else {
            return res.status(404).json({ code: 404, message: "Courses not found" });
        }
    } catch (error) {
        console.error("Error deleting Course:", error);
        return res.status(500).json({ code: 500, message: "Failed to delete Course" });
    }
};



exports.addCarousel = async (req, res) => {
    try {
        // Check if file and body are received correctly
        const title = req.body.title;
        const description = req.body.description;
        const imageFile = req.file; // Get uploaded file

        console.log(imageFile, req.body);

        if (!title || !description || !imageFile) {
            return res.status(400).send({ code: 400, message: 'Please provide title, description, and image file.' });
        }

        // Generate random 14-digit number
        const randomString1 = Math.floor(10000000000000 + Math.random() * 90000000000000).toString().substring(0, 14);
        const randomString2 = Math.floor(10000000000000 + Math.random() * 90000000000000).toString().substring(0, 14);

        // Extract file extension from original filename
        const fileExtension = imageFile.originalname.split('.').pop();

        // Generate current date, time, and seconds
        const currentDate = new Date();
        const datePart = currentDate.toISOString().slice(0, 10).replace(/-/g, '');
        const timePart = currentDate.toTimeString().slice(0, 8).replace(/:/g, '');
        const secondsPart = ('0' + currentDate.getSeconds()).slice(-2); // Ensure seconds are always two digits

        // Generate new filename by combining date, time, seconds, random strings, and original filename
        const originalFileName = imageFile.originalname.split('.').slice(0, -1).join('.'); // Remove file extension
        const filenameWithRandom = `${datePart}_${timePart}_${secondsPart}_${randomString1}_${randomString2}_${originalFileName}.${fileExtension}`;

        // Move uploaded file to a location with the new filename
        const imageUrl = `uploads/${filenameWithRandom}`; // Adjust the destination folder as needed
        fs.renameSync(imageFile.path, imageUrl);

        // Create a new Carousel document with the new filename
        const newCarousel = new Carousels({ title: title, description: description, imageUrl: imageUrl });
        await newCarousel.save();

        return res.status(200).send({ code: 200, message: 'Carousel added successfully', data: newCarousel });
    } catch (error) {
        console.error("Error adding carousel:", error);
        return res.status(500).send({ code: 500, message: "Failed to add carousel" });
    }
};
 
 

module.exports.getCarousels = async (req, res) => {
    const _data = await Carousels.find({})
    if (_data) {
        return res.send({ code: 200, message: 'success get carsoels', data: _data })
    } else {
        return res.send({ code: 500, message: 'fail get carsoesl' })
    }
}

exports.deleteCarousel = async (req, res) => {
    try {
      const carouselId = req.params.id;
  
      // Find the carousel item by ID and delete it from MongoDB
      const deletedCarousel = await Carousels.findByIdAndDelete(carouselId);
      if (!deletedCarousel) {
        return res.status(404).json({ code: 404, message: 'Carousel not found' });
      }
  
      // Delete the associated image file from the uploads folder
      const imagePath = deletedCarousel.imageUrl;
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath); // Delete the file synchronously
        console.log('Image file deleted:', imagePath);
      } else {
        console.warn('Image file not found:', imagePath);
      }
  
      return res.status(200).json({ code: 200, message: 'Carousel deleted successfully' });
    } catch (error) {
      console.error('Error deleting carousel:', error);
      return res.status(500).json({ code: 500, message: 'Failed to delete carousel' });
    }
  };


  exports.addCareer = async (req, res) => {
    try {
        // Extracting title, description, postedDate, and lastDate from request body
        const { title, description, postedDate, lastDate } = req.body;

        // Check if title, description, postedDate, or lastDate is missing
        if (!title || !description || !postedDate || !lastDate) {
            return res.status(400).send({ code: 400, message: "Fill all fields" });
        }

        // Creating a new career object with title, description, postedDate, and lastDate
        const newCareer = new Career({ title, description, postedDate, lastDate });

        // Saving the new career object to the database
        await newCareer.save();

        // Sending success response with the added career data
        return res.status(200).send({ code: 200, message: "Career added successfully", data: newCareer });
    } catch (error) {
        // Handling errors
        console.error("Error adding career:", error);
        return res.status(500).send({ code: 500, message: "Failed to add career" });
    }
};

exports.getCareers = async (req, res) => {
    try {
        const careers = await Career.find({});
        return res.status(200).send({ code: 200, message: "Careers retrieved successfully", data: careers });
    } catch (error) {
        console.error("Error retrieving careers:", error);
        return res.status(500).send({ code: 500, message: "Careers retrieval error" });
    }
};

exports.deleteCareer = async (req, res) => {
    try {
        const { id } = req.params;
       
        const deletedCareer = await Career.findByIdAndDelete(id);
        if (deletedCareer) {
            return res.status(200).json({ code: 200, message: "Career deleted successfully" });
        } else {
            return res.status(404).json({ code: 404, message: "Career not found" });
        }
    } catch (error) {
        console.error("Error deleting career:", error);
        return res.status(500).json({ code: 500, message: "Failed to delete career" });
    }
};


exports.addContact = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).send({ code: 400, message: "Fill all fields" });
        }

        const currentDate = new Date();
        const day = currentDate.getDate().toString().padStart(2, '0');
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because January is 0
        const year = currentDate.getFullYear(); // Getting full year

        const msgDate = `${day}-${month}-${year}`; // Format: dd-mm-yyyy

        const newContact = new Contact({ name, email, message, msgDate });
        await newContact.save();

        return res.status(200).send({ code: 200, message: "Contact added successfully", data: newContact });
    } catch (error) {
        console.error("Error adding contact:", error);
        return res.status(500).send({ code: 500, message: "Failed to add contact" });
    }
};


exports.getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find({});
        return res.status(200).send({ code: 200, message: "Contacts retrieved successfully", data: contacts });
    } catch (error) {
        console.error("Error retrieving contacts:", error);
        return res.status(500).send({ code: 500, message: "Contacts retrieval error" });
    }
};

exports.deleteContact = async (req, res) => {
    try {
        const { id } = req.params;
        const contact = await Contact.findById(id);
        if (!contact) {
            return res.status(404).send({ code: 404, message: "Contact not found" });
        }
        await Contact.findByIdAndDelete(id);
        return res.status(200).send({ code: 200, message: "Contact deleted successfully" });
    } catch (error) {
        console.error("Error deleting contact:", error);
        return res.status(500).send({ code: 500, message: "Failed to delete contact" });
    }
};


exports.addUpdates = async (req, res) => {
    try {
        const { memo } = req.body; // Change from message to memo

        if (!memo) { // Change from message to memo
            return res.status(400).send({ code: 400, message: "Fill all fields" });
        }

        const newUpdate = new Updates({ memo }); // Change from message to memo
        await newUpdate.save();

        return res.status(200).send({ code: 200, message: "Update added successfully", data: newUpdate });
    } catch (error) {
        console.error("Error adding update:", error);
        return res.status(500).send({ code: 500, message: "Failed to add update" });
    }
};

exports.getUpdates = async (req, res) => {
    try {
        const updatez = await Updates.find({});
        return res.status(200).send({ code: 200, message: "Updates retrieved successfully", data: updatez });
    } catch (error) {
        console.error("Error retrieving updates:", error); // Change "contacts" to "updates"
        return res.status(500).send({ code: 500, message: "Updates retrieval error" });
    }
};

exports.deleteUpdates = async (req, res) => {
    try {
        const { id } = req.params;
        const update = await Updates.findById(id);
        if (!update) {
            return res.status(404).send({ code: 404, message: "Update not found" });
        }
        await Updates.findByIdAndDelete(id);
        return res.status(200).send({ code: 200, message: "Update deleted successfully" });
    } catch (error) {
        console.error("Error deleting update:", error);
        return res.status(500).send({ code: 500, message: "Failed to delete update" });
    }
};

