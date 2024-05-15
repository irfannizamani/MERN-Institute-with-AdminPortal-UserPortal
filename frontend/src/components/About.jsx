import React from 'react';
import logo from '../assets/logo.png';

const About = () => {
  return (
    <div className="container mt-2">
      
      <div className="row">
        <div className="col">
          <h1 className="text-center  mb-4">About </h1>

          <center>
            <img src={logo} alt="NIZVARSITY Logo" className="card-img-top" style={{ maxWidth: "400px", margin: "auto" }} />    
          </center>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <h2 className="text-center mt-3 mb-4">Key Features</h2>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            <div className="col">
              <div className="card h-100 shadow p-3 text-center">
                
                <div className="card-body">
                  <h3 className="card-title mb-3">User Portal</h3>
                  <p className="card-text lead">Access our user-friendly portal for seamless learning experiences. Enjoy features such as personalized dashboards, our platform is designed to enhance your learning journey.</p>
                </div>
              </div>
            </div>
            {/* Add more feature cards */}
            <div className="col">
              <div className="card h-100 shadow p-3 text-center">
                <div className="card-body">
                  <h3 className="card-title mb-3">Admin Portal</h3>
                  <p className="card-text lead">Efficiently manage your platform with our comprehensive admin tools. Monitor user activity, manage content, customize settings, and ensure smooth operations with our intuitive interface.</p>
                </div>
              </div>
            </div>
            {/* Add more feature cards */}
            <div className="col">
              <div className="card h-100 shadow p-3 text-center">
                <div className="card-body">
                  <h3 className="card-title mb-3">Responsive Design</h3>
                  <p className="card-text lead">Enjoy a seamless experience across devices with our responsive design. Whether you're using a desktop, tablet, or smartphone, our platform adapts to provide optimal usability and accessibility.</p>
                </div>
              </div>
            </div>
            {/* Add more feature cards */}
            <div className="col">
              <div className="card h-100 shadow p-3 text-center">
                <div className="card-body">
                  <h3 className="card-title mb-3">OTP Nodemailer</h3>
                  <p className="card-text lead">Secure your communication with OTP-based nodemailer integration. Protect account and sensitive information and ensure reliable message delivery with our robust email verification system.</p>
                </div>
              </div>
            </div>
            {/* Add more feature cards */}
            <div className="col">
              <div className="card h-100 shadow p-3 text-center">
                <div className="card-body">
                  <h3 className="card-title mb-3">Dynamic Landing Page</h3>
                  <p className="card-text lead">Experience a dynamic landing page that keeps users engaged. Our landing page offers personalized content, interactive elements, and smooth navigation to provide a memorable first impression.</p>
                </div>
              </div>
            </div>
            {/* Add more feature cards */}
            <div className="col">
              <div className="card h-100 shadow p-3 text-center">
                <div className="card-body">
                  <h3 className="card-title mb-3">User-Friendly Interface</h3>
                  <p className="card-text lead">Navigate effortlessly through our intuitive user interface. Streamlined navigation, clear layouts, and easy-to-use features ensure an enjoyable and productive user experience for all users. Our interface is designed with accessibility in mind, making it easy for users of all abilities to interact with the platform effectively.</p>
                </div>
              </div>
            </div>
            {/* Add more feature cards */}
          </div>
        </div>
      </div>

      <div className="row mt-5 mb-5">
        <div className="col">
          <h2 className="text-center mb-4">Technologies</h2>
          <div className="row row-cols-1 row-cols-md-4 g-4">
            <div className="col">
              <div className="card h-100 shadow p-3 text-center">
                <div className="card-body">
                  <h3 className="card-title mb-3">MongoDB</h3>
                  <p className="card-text lead">Utilizing MongoDB, a NoSQL database that offers flexibility and scalability for storing and managing data. MongoDB's document-based model simplifies data handling.</p>
                </div>
              </div>
            </div>
            {/* Add more technology cards */}
            <div className="col">
              <div className="card h-100 shadow p-3 text-center">
                <div className="card-body">
                  <h3 className="card-title mb-3">Express.js</h3>
                  <p className="card-text lead">Powered by Express.js, a fast and minimalist web framework for Node.js. Express.js simplifies server-side development and enables efficient routing and middleware integration.</p>
                </div>
              </div>
            </div>
            {/* Add more technology cards */}
            <div className="col">
              <div className="card h-100 shadow p-3 text-center">
                <div className="card-body">
                  <h3 className="card-title mb-3">React</h3>
                  <p className="card-text lead">Built with React, a popular JavaScript library for building user interfaces. React allows for efficient rendering and seamless updates, providing a smooth user experience.</p>
                </div>
              </div>
            </div>
            {/* Add more technology cards */}
            <div className="col">
              <div className="card h-100 shadow p-3 text-center">
                <div className="card-body">
                  <h3 className="card-title mb-3">Node.js</h3>
                  <p className="card-text lead">Utilizing Node.js, a runtime environment for executing JavaScript code on the server-side. Node.js enables scalable and high-performance applications with its non-blocking I/O model.</p>
                </div>
              </div>
            </div>
            {/* Add more technology cards */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
