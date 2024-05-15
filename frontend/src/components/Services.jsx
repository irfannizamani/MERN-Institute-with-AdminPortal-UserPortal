import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Services = () => {
  const [servicesData, setServicesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:8000/admin/services');
        setServicesData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching services:', error);
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <>
      <div className="container p-4">      
        <h1 className="mb-4 text-center">Our Services</h1>
        <div className="row">
          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status"></div>   
            </div>
          ) : servicesData.length === 0 ? (
            <p className="text-center w-50 mx-auto card shadow-sm p-2 rounded bg-secondary text-white">No services found</p>
          ) : (
            servicesData.slice().reverse().map((service, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card border-0 shadow-sm rounded">
                  <div className="card-body">
                    <h5 className="card-title">{service.title}</h5>
                    <p className="card-text lead">{service.description}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Services;
