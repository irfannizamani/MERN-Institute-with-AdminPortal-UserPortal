import React, { useState } from 'react';
import axios from 'axios';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!name || !email || !message) {
        showAlert('Please fill in all fields', 'danger');
        return;
      }
      
      const formData = { name, email, message };
      const response = await axios.post('http://localhost:8000/admin/contact', formData);
      console.log(response.data); // You can handle success response here
      showAlert('Message sent successfully', 'success');
      // Clear form data after successful submission
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error('Error adding contact:', error);
      showAlert('Failed to send message', 'danger');
    }
  };

  // Function to handle displaying alerts
  const showAlert = (msg, type) => {
    setAlertMessage(msg);
    setAlertType(type);
    setTimeout(() => {
      setAlertMessage('');
      setAlertType('');
    }, 4000); // Hide alert after 4 seconds
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-5"> Contact Us </h1>
      <div className="row">
        <div className="col-md-6">
          {/* Google Map iframe */}
          <div className="contact-side bg-light rounded shadow p-4">
            <h2 className="text-center mb-4">Our Location</h2>
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7209.335427139559!2d68.51557975!3d25.382450699999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x394c72cf1f9f9523%3A0x7097999d41f9d290!2sTando%20Qaiser%2C%20Hyderabad%2C%20Sindh!5e0!3m2!1sen!2s!4v1711912222734!5m2!1sen!2s"
              width="100%"
              height="300"
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen=""
              aria-hidden="false"
              tabIndex="0"
            ></iframe>
          </div>
        </div>
        <div className="col-md-6">
          {/* Contact Form */}
          <div className="contact-side bg-light rounded shadow p-4">
            <h2 className="text-center mb-4 ">Send us a Message</h2>
            {alertMessage && <div className={`alert alert-${alertType} mt-3`} role="alert">{alertMessage}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-4">
                <label htmlFor="name" className="fw-bold">Name</label>
                <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)}   />
              </div>
              <div className="form-group mb-4">
                <label htmlFor="email" className="fw-bold">Email</label>
                <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)}  />
              </div>
              <div className="form-group mb-4">
                <label htmlFor="message" className="fw-bold">Message</label>
                <textarea className="form-control" id="message" rows="5" value={message} onChange={(e) => setMessage(e.target.value)} ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
