import express from 'express';
import {
  createMarker,
  getMarkers,
  getMarker,
  updateMarker,
  deleteMarker,
  searchMarkers,
} from '../controllers/mapmake.contorller.js';

import { validate, markerSchema } from '../utils/validate.js';
import { isLoggedIn } from '../middlewares/auth.middleware.js';

const makerrouter = express.Router();

; // Apply JWT cookie authentication to all marker routes
makerrouter.post('/', isLoggedIn,validate(markerSchema), createMarker);
makerrouter.get('/', isLoggedIn,getMarkers);
makerrouter.get('/search',isLoggedIn, searchMarkers);
makerrouter.get('/:id', isLoggedIn,getMarker);
makerrouter.put('/:id', isLoggedIn,validate(markerSchema), updateMarker);
makerrouter.delete('/:id',isLoggedIn, deleteMarker);

export default makerrouter;