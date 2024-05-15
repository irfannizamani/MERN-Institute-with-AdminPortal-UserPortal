import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Carousels = () => {
  const [carouselsData, setCarouselsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCarousels = async () => {
      try {
        const response = await axios.get('http://localhost:8000/admin/carousels');
        setCarouselsData(response.data.data || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching carousels:', error);
        setLoading(false);
      }
    };

    fetchCarousels();
  }, []);

  return (
    <div className="container p-4">
      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      ) : carouselsData.length === 0 ? (
        <p className="text-center w-50 mx-auto card shadow-sm p-2 rounded bg-secondary text-white">No images found</p>
      ) : (
        <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel" data-bs-interval="2000" style={{ height: '400px', overflow: 'hidden' }}>
          <div className="carousel-inner">
            {carouselsData.map((carousel, index) => (
              <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={carousel._id}>
                <img src={`http://localhost:8000/${carousel.imageUrl}`} className="d-block" alt={`Slide ${index}`} style={{ height: '400px', width: '100%', objectFit: 'cover', borderRadius: '10px' }} />
                <div className="carousel-caption d-none d-md-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', color: 'white', borderRadius: '10px', padding: '10px', opacity: '0.5' }}>
                  <h5 className="text-white">{carousel.title}</h5>
                  <p className="text-white">{carousel.description}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleSlidesOnly" data-bs-slide="prev" style={{ left: '5%', opacity: '0.7', backgroundColor: 'transparent', border: 'none' }}>
            <span className="carousel-control-prev-icon" aria-hidden="true" style={{ color: 'white' }}></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleSlidesOnly" data-bs-slide="next" style={{ right: '5%', opacity: '0.7', backgroundColor: 'transparent', border: 'none' }}>
            <span className="carousel-control-next-icon" aria-hidden="true" style={{ color: 'white' }}></span>
            <span className="visually-hidden">Next</span>
          </button>
          <ol className="carousel-indicators" style={{ listStyle: 'none' }}>
            {carouselsData.map((_, index) => (
              <li key={index} data-bs-target="#carouselExampleSlidesOnly" data-bs-slide-to={index} className={index === 0 ? 'active' : ''}></li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default Carousels;
