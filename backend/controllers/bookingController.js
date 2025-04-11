import Booking from '../models/bookingModel.js';
import Tour from '../models/tourModel.js';

// Create new booking
export const createBooking = async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from authenticated request
    const { tourId, fullName, guestSize, phone, bookAt } = req.body;
    
    // Check if tour exists and has capacity
    const tour = await Tour.findByPk(tourId);
    if (!tour) {
      return res.status(404).json({
        success: false,
        message: "Tour not found"
      });
    }

    // Check if requested guest size exceeds max group size
    if (guestSize > tour.maxGroupSize) {
      return res.status(400).json({
        success: false,
        message: `Maximum group size is ${tour.maxGroupSize}`
      });
    }

    // Check if the date is valid (not in the past)
    const bookingDate = new Date(bookAt);
    if (bookingDate < new Date()) {
      return res.status(400).json({
        success: false,
        message: "Booking date cannot be in the past"
      });
    }

    // Create new booking
    const newBooking = await Booking.create({
      userId,
      tourId,
      fullName,
      guestSize,
      phone,
      bookAt,
      status: 'confirmed'
    });

    res.status(200).json({
      success: true,
      message: "Your tour is booked",
      data: newBooking
    });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong"
    });
  }
};

// Get single booking
export const getBooking = async (req, res) => {
  const id = req.params.id;
  
  try {
    const book = await Booking.findOne({
      where: { id },
      include: [
        {
          model: Tour,
          attributes: ['title', 'city', 'address', 'price']
        }
      ]
    });

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    // Check if the booking belongs to the logged-in user
    if (book.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to view this booking"
      });
    }

    res.status(200).json({
      success: true,
      message: "successful",
      data: book
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get all bookings
export const getAllBooking = async (req, res) => {
  try {
    const books = await Booking.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: Tour,
          attributes: ['title', 'city', 'address', 'price']
        }
      ]
    });

    res.status(200).json({
      success: true,
      message: "successful",
      data: books
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
