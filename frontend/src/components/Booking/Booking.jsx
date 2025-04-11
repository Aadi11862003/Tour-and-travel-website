import React, { useState, useContext } from "react";
import "./booking.css";
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../utils/config";

const Booking = ({ tour, avgRating }) => {
  const { price, reviews, title } = tour || {};
  const navigate = useNavigate();
  const { user, token, dispatch } = useContext(AuthContext);

  const [booking, setBooking] = useState({
    userId: user?.id,
    userEmail: user?.email,
    tourName: title,
    fullName: "",
    phone: "",
    guestSize: 1,
    bookAt: ""
  });

  const handleChange = e => {
    setBooking(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const serviceFee = 500;
  const totalAmount = Number(price) * Number(booking.guestSize) + Number(serviceFee);

  const handleClick = async e => {
    e.preventDefault();

    try {
      if (!user || !token) {
        alert('Please sign in to book a tour');
        return navigate('/login');
      }

      // Validate form data
      if (!booking.fullName || !booking.phone || !booking.bookAt || !booking.guestSize) {
        return alert('Please fill in all fields');
      }

      // Validate date
      const selectedDate = new Date(booking.bookAt);
      if (selectedDate < new Date()) {
        return alert('Please select a future date');
      }

      // Make the booking request
      const res = await fetch(`${BASE_URL}/booking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          tourId: tour.id,
          fullName: booking.fullName,
          guestSize: parseInt(booking.guestSize),
          phone: booking.phone,
          bookAt: booking.bookAt
        })
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          // Clear user data and token
          dispatch({ type: 'LOGOUT' });
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          alert('Session expired. Please login again.');
          return navigate('/login');
        }
        throw new Error(data.message || 'Something went wrong');
      }
      
      alert('Tour booked successfully!');
      navigate('/thank-you');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>
          ₹{price} <span>/per person</span>
        </h3>
        <span className="tour__rating d-flex align-items-center">
          <i className="ri-star-fill"></i>
          {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>

      <div className="booking__form">
        <h5>Information</h5>
        <Form className="booking__info-form" onSubmit={handleClick}>
          <FormGroup>
            <input
              type="text"
              placeholder="Full Name"
              id="fullName"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <input
              type="tel"
              placeholder="Phone"
              id="phone"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="d-flex align-items-center gap-3">
            <input
              type="date"
              placeholder=""
              id="bookAt"
              required
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
            />
            <input
              type="number"
              placeholder="Guest"
              id="guestSize"
              required
              min="1"
              max={tour.maxGroupSize}
              onChange={handleChange}
            />
          </FormGroup>
        </Form>
      </div>

      <div className="booking__bottom">
        <ListGroup>
          <ListGroupItem className="border-0 px-0">
            <h5 className="d-flex align-items-center gap-1">
              ₹{price} <i className="ri-close-line"></i> {booking.guestSize} person
            </h5>
            <span>₹{price * booking.guestSize}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0">
            <h5>Service charge</h5>
            <span>₹{serviceFee}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0 total">
            <h5>Total</h5>
            <span>₹{totalAmount}</span>
          </ListGroupItem>
        </ListGroup>

        <Button className="btn primary__btn w-100 mt-4" onClick={handleClick}>
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default Booking;
