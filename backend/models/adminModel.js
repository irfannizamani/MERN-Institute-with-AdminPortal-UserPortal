const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the schema for the Admin model
const adminSchema = mongoose.Schema({
    userName: { type: String, required: true },
    password: { type: String, required: true }
});

// Define the schema for the Services model
const servicesSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true }
});

//Courses
const coursesSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true }
});


const carouselsSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true } // Assuming you store image file name
});



// Career
const careerSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    postedDate: { type: String, required: true},
    lastDate: { type: String, required: true}

});


const contactsSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    msgDate: { type: String, required: true }
    
});


const updatesSchema = mongoose.Schema({
    
    memo: { type: String, required: true }
});


// Create and export models 
const Admin = mongoose.model('Admin', adminSchema);
const Services = mongoose.model('Services', servicesSchema);
const Courses = mongoose.model('Courses', coursesSchema);
const Carousels = mongoose.model('Carousels', carouselsSchema);
const Career = mongoose.model('Career', careerSchema);
const Contact = mongoose.model('Contact', contactsSchema);
const Updates = mongoose.model('Updates', updatesSchema);

// Check if any admin user exists before creating the default admin user
Admin.countDocuments().then(count => {
    if (count === 0) {
        // Create a new admin instance with validation
        const newAdmin = new Admin({
            userName: 'admin',
            password: 'admin' // Note: This is a temporary password, replace it with a secure one
        });

        // Hash the password before saving
        bcrypt.hash(newAdmin.password, 10)
            .then(hashedPassword => {
                newAdmin.password = hashedPassword;
                // Save the validated admin to the database
                return newAdmin.save();
            })
            .then(() => {
                console.log('Default admin user created.');
            })
            .catch(hashError => {
                // Handle hashing errors
                console.error('Error hashing password:', hashError);
            });
    } else {
        console.log('An admin user already exists.');
    }
}).catch(err => {
    console.error('Error checking or creating default admin user:', err);
});

module.exports = { Admin, Services, Courses, Carousels, Career, Contact, Updates  };
