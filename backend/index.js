const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const adminController = require('./controllers/adminController');
const userController = require('./controllers/usersController');
const authUserMiddleware  = require('./middlewares/authUserMiddleware ');
const authAdminMiddleware  = require('./middlewares/authAdminMiddleware');
const multer = require('multer');
const path = require('path');
const nocache = require('nocache');



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Set the destination folder for file uploads
    },
    filename: function (req, file, cb) {
        // Preserve the original filename and file extension
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

const app = express();
const port =  8000;
                                        
// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set cache control headers
app.use(function(req, res, next) {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    // Append a unique identifier to the URL query string
    req.url += (req.url.indexOf('?') === -1 ? '?' : '&') + 'nocache=' + Date.now();

    next();
});

app.use(nocache());


// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


// Routes for Admins
app.get('/admin/admins', adminController.getAdmins);
app.post('/admin/admins/login', adminController.loginAdmin);

// Routes for Services
app.post('/admin/services', authAdminMiddleware,adminController.addServices);
app.get('/admin/services', adminController.getServices);
app.put('/admin/services/:id', authAdminMiddleware,adminController.updateService);
app.delete('/admin/services/:id', authAdminMiddleware, adminController.deleteServices);
app.get('/admin/services/:id',authUserMiddleware ,adminController.getServiceById);

// Routes for Carousels 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.post('/admin/carousels', authAdminMiddleware ,upload.single('image'), adminController.addCarousel)
app.get('/admin/carousels', adminController.getCarousels);
app.delete('/admin/carousels/:id',authAdminMiddleware, adminController.deleteCarousel);

// Routes for Career
app.post('/admin/careers', authAdminMiddleware, adminController.addCareer);
app.get('/admin/careers', adminController.getCareers); //for public
app.delete('/admin/careers/:id', authAdminMiddleware, adminController.deleteCareer);

// Routes for Contact
app.post('/admin/contact', authUserMiddleware, adminController.addContact);
app.get('/admin/contact', adminController.getContacts);
app.delete('/admin/contact/:id',authUserMiddleware , adminController.deleteContact);

//Updates
app.post('/admin/updates', authAdminMiddleware,adminController.addUpdates);
app.get('/admin/updates', authAdminMiddleware, authUserMiddleware ,adminController.getUpdates);
app.delete('/admin/updates/:id',authAdminMiddleware ,adminController.deleteUpdates);



//courses
app.get('/admin/courses', adminController.getCourses); 
app.post('/admin/courses', authAdminMiddleware, adminController.addCourses); 
app.delete('/admin/courses/:id', authAdminMiddleware,adminController.deleteCourses); 

// User Portal



// Routes for Users
app.get('/user/feedbacks', authAdminMiddleware, authUserMiddleware, userController.getFeedbacks);
app.post('/user/feedbacks', authUserMiddleware, userController.addFeedback);
app.delete('/user/feedbacks/:id', authAdminMiddleware, authUserMiddleware, userController.deleteFeedback);

app.post('/user/register', userController.registerUser);
app.post('/user/login', userController.loginUser);



app.post('/user/sendotp', userController.sendotp);
app.post('/user/submitotp', userController.submitotp);
app.post('/user/checkemail', userController.checkEmailExistence); // this is for checking during forget password

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
