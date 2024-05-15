import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Courses = () => {
  const [coursesData, setCoursesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:8000/admin/courses');
        console.log(response);
        setCoursesData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (

    <>

    <div>
      <div className="container p-4">      
        <h1 className="mb-4 text-center">Our Courses</h1>
        <div className="row">
          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status"></div>
            </div>  
          ) : coursesData.length === 0 ? (
            <p className="text-center w-50 mx-auto card shadow-sm p-2 rounded bg-secondary text-white">No courses found</p>
          ) : (
            coursesData.slice().reverse().map((course, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card border-0 shadow-sm rounded">
                  <div className="card-body">
                    <h5 className="card-title">{course.title}</h5>
                    <p className="card-text lead">{course.description}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>



    </>
  );
};

export default Courses;
