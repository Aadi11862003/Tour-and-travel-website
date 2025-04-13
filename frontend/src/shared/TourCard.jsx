import React, { useState } from "react";
import { Card, CardBody, Spinner } from "reactstrap";
import { Link } from "react-router-dom";
import calculateAvgRating from "../utils/avgRating";

import "./tour-card.css";

const TourCard = ({ tour }) => {
    const { id, title, city, photo, price, featured, reviews } = tour;
    const [imageLoading, setImageLoading] = useState(true);
  
const { totalRating, avgRating } = calculateAvgRating(reviews)

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = (e) => {
    e.target.src = ''; // Fallback image
    setImageLoading(false);
  };

  return (
    <div className="tour__card">
      <Card>
        <div className="tour__img">
          {imageLoading && (
            <div className="image-loading-overlay">
              <Spinner color="primary" />
            </div>
          )}
          <img 
            src={photo} 
            alt={title}
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{ display: imageLoading ? 'none' : 'block' }}
          />
          {featured && <span>Featured</span>}
        </div>

        <CardBody>
          <div className="card__top d-flex align-items-center justify-content-between">
            <span className="tour__location d-flex align-items-center gap-1">
              <i className="ri-map-pin-line"></i>
              {city}
            </span>
            <span className="tour__rating d-flex align-items-center gap-1">
              <i className="ri-star-fill"></i>
              {avgRating === 0 ? null : avgRating}
              {totalRating === 0 ? (
                "Not rated"
              ) : (
                <span>({reviews?.length})</span>
              )}
            </span>
          </div>
          <h5 className="tour__title" title={title}>
            <Link to={`/tours/${id}`}>{title}</Link>
          </h5>
          <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
            <h5>
            ₹{price} <span> /per person</span>
            </h5>
            <button className="btn booking__btn">
              <Link to={`/tours/${id}`}>Book Now</Link>
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default TourCard;
