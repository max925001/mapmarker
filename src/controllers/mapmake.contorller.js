import Marker from '../models/maker.model.js';

const createMarker = async (req, res, next) => {
  try {
    const marker = new Marker({ ...req.body, userId: req.user.id });
    await marker.save();
    res.status(201).json(marker);
  } catch (error) {
    next(error);
  }
};

const getMarkers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const query = { userId: req.user.id };

    // Pagination
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const markers = await Marker.find(query)
      .skip(skip)
      .limit(limitNum)
      .sort({ createdAt: -1 }); // Sort by newest first

    const total = await Marker.countDocuments(query);

    res.json({
      markers,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    next(error);
  }
};

const searchMarkers = async (req, res, next) => {
  try {
    const { categories, keyword, lat, lng, radius, page = 1, limit = 10 } = req.query;
    let query = { userId: req.user.id };

    // Filter by multiple categories
    if (categories) {
      const categoryArray = categories.split(',').map((cat) => cat.trim());
      query.categories = { $in: categoryArray };
    }

    // Filter by keyword in title
    if (keyword) {
      query.title = { $regex: keyword, $options: 'i' };
    }

    // Proximity search using geospatial query
    if (lat && lng && radius) {
      const radiusInRadians = parseFloat(radius) / 6378.1; // Convert km to radians (Earth's radius ~6378.1 km)
      query.location = {
        $geoWithin: {
          $centerSphere: [[parseFloat(lng), parseFloat(lat)], radiusInRadians],
        },
      };
    }

    // Pagination
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const markers = await Marker.find(query)
      .skip(skip)
      .limit(limitNum)
      .sort({ createdAt: -1 }); // Sort by newest first

    const total = await Marker.countDocuments(query);

    res.json({
      markers,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    next(error);
  }
};

const getMarker = async (req, res, next) => {
  try {
    const marker = await Marker.findOne({ _id: req.params.id, userId: req.user.id });
    if (!marker) {
      return res.status(404).json({ error: 'Marker not found' });
    }
    res.json(marker);
  } catch (error) {
    next(error);
  }
};

const updateMarker = async (req, res, next) => {
  try {
    const marker = await Marker.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!marker) {
      return res.status(404).json({ error: 'Marker not found' });
    }
    res.json(marker);
  } catch (error) {
    next(error);
  }
};

const deleteMarker = async (req, res, next) => {
  try {
    const marker = await Marker.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!marker) {
      return res.status(404).json({ error: 'Marker not found' });
    }
    res.json({ message: 'Marker deleted' });
  } catch (error) {
    next(error);
  }
};

export { createMarker, getMarkers, searchMarkers, getMarker, updateMarker, deleteMarker };