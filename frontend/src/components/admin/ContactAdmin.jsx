import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ContactAdmin = () => {
  const [contacts, setContacts] = useState([]);
  const [token, setToken] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      setToken(token);
      fetchContacts();
    }
  }, [navigate]);

  const fetchContacts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/admin/contact"
      , {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
      if (response.data.code === 200) {
        // Reverse the order of contacts array to show the latest added contacts first
        const reversedContacts = response.data.data.reverse();
        setContacts(reversedContacts);
      } else {
        console.error("Error fetching contacts:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/admin/contact/${id}`
      , {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
      if (response.data.code === 200) {
        setContacts(contacts.filter(contact => contact._id !== id));
        console.log("Contact deleted successfully");
      } else {
        console.error("Failed to delete contact");
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-5 fw-light display-5">Manage Contacts</h1>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map(contact => (
              <tr key={contact._id}>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.message}</td>
                <td>{contact.msgDate}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(contact._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactAdmin;
