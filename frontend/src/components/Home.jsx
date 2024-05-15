import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import About from './About';
import Carousels from './Carousels';
import Courses from './Courses';
import Services from './Services';
import Contact from './Contact';

const Home = () => {
  return (
   <>

    <div className="container p-4 ">
      <div className="row">
        <div className="col-md-12 justify-content-center p-2 text-center">
     
        <img src={logo} alt="NIZVARSITY Logo" className="img-responsive" width={600} />
          <p className="lead mb-4  ">Hello and Welcome, Embark on a transformative journey of knowledge with our innovative university platform. At NIZVARSITY, we're committed to providing an exceptional educational experience that goes beyond traditional boundaries. Our user-friendly design ensures a seamless exploration of our Admin and User Portals, empowering you to discover, learn, and grow.</p>
          <div className="container">
  <div className="text-center">
    <Link to="/admin" className="btn btn-primary me-3 w-25" style={{ borderRadius: "50px" }}>Admin Portal</Link>
    <Link to="/user" className="btn btn-success w-25" style={{ borderRadius: "50px" }}>User Portal</Link>
  </div>
</div>

        </div>
        
      </div>
      </div>


      <Carousels />
      <About />
      <Courses />
      <Services />
      <Contact />
</>
  );
};

export default Home;
