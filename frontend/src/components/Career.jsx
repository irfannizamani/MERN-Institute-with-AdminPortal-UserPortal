import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Career = () => {
  // State variables
  const [careersData, setCareersData] = useState([]); // Holds career data
  const [loading, setLoading] = useState(true); // Tracks loading status
  const [currentPage, setCurrentPage] = useState(1); // Tracks current page
  const careersPerPage = 3; // Number of careers per pagination

  // Fetch career data when component mounts
  useEffect(() => {
    // Function to fetch career data
    const fetchCareers = async () => {
      try {
        // Make GET request to fetch career data from the server
        const response = await axios.get('http://localhost:8000/admin/careers');
       
        const reversedData = response.data.data.reverse();
        // Update careersData state with reversed data
        setCareersData(reversedData); 
        
        // Set loading state to false once data is fetched
        setLoading(false);
      } catch (error) {
        // Log error to console if fetching data fails
        console.error('Error fetching careers:', error);
        // Set loading state to false even in case of an error
        setLoading(false);
      }
    };

    fetchCareers(); // Invoke fetchCareers function when component mounts
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  // Function to handle pagination
  const paginate = pageNumber => setCurrentPage(pageNumber);

  // Pagination logic
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(careersData.length / careersPerPage); i++) {
    pageNumbers.push(i);
  }

  // Get current careers based on pagination
  const indexOfLastCareer = currentPage * careersPerPage;
  const indexOfFirstCareer = indexOfLastCareer - careersPerPage;
  const currentCareers = careersData.slice(indexOfFirstCareer, indexOfLastCareer);

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center ">Career Opportunities</h1>
      <div className="row">
        {loading ? ( // If loading is true, display spinner
          <div className="text-center">
            <div className="spinner-border text-primary" role="status"></div>
          </div>
        ) : currentCareers.length === 0 ? ( // If no careers found, display message
          <p className="text-center w-100 card shadow-sm p-3 rounded bg-secondary text-white">No careers found</p>
        ) : (
          currentCareers.map((career, index) => ( // Map through current careers and display each career
            <div className="col-md-4 mb-4" key={index}>
              <div className="card border-0 shadow-sm rounded">
                <div className="card-body">
                  <h4 className="card-title">{career.title}</h4>
                  <p className="card-text lead">{career.description}</p>
                  {/* Display posted and last dates */}
                  <p className="card-text lead">Posted Date: {career.postedDate}</p>
                  <p className="card-text lead">Last Date: {career.lastDate}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Pagination */}
      <nav className="mt-4">
        <ul className="pagination justify-content-center">
          {/* First page button */}
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button onClick={() => paginate(1)} className="page-link">First</button>
          </li>
          {/* Page number buttons */}
          {pageNumbers.map(number => (
            <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
              <button onClick={() => paginate(number)} className="page-link">{number}</button>
            </li>
          ))}
          {/* Last page button */}
          <li className={`page-item ${currentPage === pageNumbers.length ? 'disabled' : ''}`}>
            <button onClick={() => paginate(pageNumbers.length)} className="page-link">Last</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Career;
