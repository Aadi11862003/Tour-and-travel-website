import Tour from '../models/tourModel.js';

// Create a new tour
export const createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({ success: true, message: 'Tour created successfully', data: newTour });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update an existing tour
export const updateTour = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedTour = await Tour.update(req.body, { where: { id }, returning: true });
    res.status(200).json({ success: true, message: 'Tour updated successfully', data: updatedTour[1][0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a tour
export const deleteTour = async (req, res) => {
  const { id } = req.params;
  try {
    await Tour.destroy({ where: { id } });
    res.status(200).json({ success: true, message: 'Tour deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single tour
export const getSingleTour = async (req, res) => {
  const id = req.params.id;
  try {
    const tour = await Tour.findByPk(id);
    res.status(200).json({
      success: true,
      message: 'Successful',
      data: tour
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// Get all tours
export const getAllTours = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = 8;
  try {
    const tours = await Tour.findAndCountAll({
      offset: page * limit,
      limit: limit,
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({
      success: true,
      count: tours.count,
      message: 'Successful',
      data: tours.rows
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// Get featured tours
export const getFeaturedTours = async (req, res) => {
  try {
    const tours = await Tour.findAll({
      where: { featured: true },
      limit: 8
    });
    res.status(200).json({
      success: true,
      message: 'Successful',
      data: tours
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// Get tour count
export const getTourCount = async (req, res) => {
  try {
    const count = await Tour.count();
    res.status(200).json({
      success: true,
      data: count
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
