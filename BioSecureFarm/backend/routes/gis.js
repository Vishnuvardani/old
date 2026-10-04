const router = require('express').Router();
const {
  getAllLocations,
  getMapFarms,
  getMapOutbreaks,
  getNearbyFarmsForOutbreak,
  getNearbyOutbreaks,
  getHeatmapData,
  createLocation,
  bufferAnalysis
} = require('../controllers/gisController');
const { protect } = require('../middleware/auth');

router.use(protect);
router.get('/farms', getMapFarms);
router.get('/outbreaks', getMapOutbreaks);
router.get('/nearby-farms/:id', getNearbyFarmsForOutbreak);
router.get('/', getAllLocations);
router.get('/nearby', getNearbyOutbreaks);
router.get('/heatmap', getHeatmapData);
router.get('/buffer', bufferAnalysis);
router.post('/', createLocation);

module.exports = router;
