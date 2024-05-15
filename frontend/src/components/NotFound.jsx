import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <h1 className="display-2 text-danger mt-5 mb-4">404 Not Found</h1>
          <p className="display-6 mb-4 text-primary">Oops! It seems like you've hit a dead end.</p>
          <p className="lead text-muted mb-4">The page you are looking for cannot be found. It might have been moved, deleted, or never existed.</p>
          <Link to="/" className="btn btn-primary  mb-3">Go Back Home</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
