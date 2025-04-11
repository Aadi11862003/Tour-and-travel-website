import express from 'express';
import {
  createTour,
  updateTour,
  deleteTour,
  getSingleTour,
  getAllTours,
  getFeaturedTours,
  getTourCount
} from '../controllers/tourController.js';

const router = express.Router();

router.post('/', createTour);
router.put('/:id', updateTour);
router.delete('/:id', deleteTour);
router.get('/:id', getSingleTour);
router.get('/', getAllTours);
router.get('/search/getFeaturedTours', getFeaturedTours);
router.get('/search/getTourCount', getTourCount);

export default router; 