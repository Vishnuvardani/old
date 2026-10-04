const GISLocation = require('../models/GISLocation');
const Disease = require('../models/Disease');
const Farm = require('../models/Farm');

exports.getAllLocations = async (req, res, next) => {
  try {
    const filter = { isActive: true };
    if (req.query.type) filter.locationType = req.query.type;
    const locations = await GISLocation.find(filter)
      .populate('farm', 'farmName farmType biosecurityScore')
      .populate('disease', 'diseaseName severity status');
    res.json({ success: true, data: locations });
  } catch (err) { next(err); }
};

exports.getMapFarms = async (req, res, next) => {
  try {
    const filter = { isActive: true };
    if (req.user.role === 'farmer') filter.owner = req.user._id;
    if (req.user.role === 'veterinarian') filter.assignedVet = req.user._id;

    const farms = await Farm.find(filter)
      .populate('owner', 'fullName')
      .select('farmName farmType address location totalArea capacity currentCount biosecurityScore riskLevel owner registrationNumber');
    res.json({
      success: true,
      data: farms.map(farm => ({
        farmId: farm._id,
        farmName: farm.farmName,
        farmType: farm.farmType,
        ownerName: farm.owner?.fullName || '',
        registrationNo: farm.registrationNumber || '',
        district: farm.address?.district || '',
        state: farm.address?.state || '',
        farmArea: farm.totalArea,
        animalCapacity: farm.capacity,
        animalCount: farm.currentCount,
        latitude: farm.location?.coordinates?.[1] || null,
        longitude: farm.location?.coordinates?.[0] || null,
        biosecurityScore: farm.biosecurityScore,
        riskLevel: farm.riskLevel
      }))
    });
  } catch (err) { next(err); }
};

exports.getMapOutbreaks = async (req, res, next) => {
  try {
    const diseases = await Disease.find({
      status: { $in: ['suspected', 'confirmed', 'under_treatment'] },
      isOutbreak: true
    })
      .populate('farm', 'farmName address')
      .select('diseaseName diseaseType severity status affectedCount location farm outbreakDate createdAt');
    res.json({
      success: true,
      data: diseases.map(disease => ({
        reportId: disease._id,
        outbreakId: disease._id,
        farmId: disease.farm?._id,
        farmName: disease.farm?.farmName || '',
        district: disease.farm?.address?.district || '',
        suspectedDisease: disease.diseaseName,
        diseaseName: disease.diseaseName,
        severity: disease.severity,
        status: disease.status,
        affectedAnimals: disease.affectedCount,
        latitude: disease.location?.coordinates?.[1] || null,
        longitude: disease.location?.coordinates?.[0] || null,
        reportedAt: disease.outbreakDate || disease.createdAt
      }))
    });
  } catch (err) { next(err); }
};

exports.getNearbyFarmsForOutbreak = async (req, res, next) => {
  try {
    const disease = await Disease.findById(req.params.id).select('location');
    if (!disease) return res.status(404).json({ success: false, message: 'Outbreak not found' });

    const [longitude, latitude] = disease.location?.coordinates || [];
    if (!Number.isFinite(longitude) || !Number.isFinite(latitude) || (longitude === 0 && latitude === 0)) {
      return res.json({ success: true, nearbyFarms: [] });
    }

    const farms = await Farm.find({
      isActive: true,
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [longitude, latitude] },
          $maxDistance: 50000
        }
      }
    }).select('farmName farmType address location');
    res.json({
      success: true,
      nearbyFarms: farms.map(farm => ({
        farmId: farm._id,
        farmName: farm.farmName,
        farmType: farm.farmType,
        district: farm.address?.district || '',
        latitude: farm.location?.coordinates?.[1],
        longitude: farm.location?.coordinates?.[0]
      }))
    });
  } catch (err) { next(err); }
};

exports.getNearbyOutbreaks = async (req, res, next) => {
  try {
    const { lng, lat, radius = 50000 } = req.query;
    const outbreaks = await GISLocation.find({
      locationType: 'outbreak',
      isActive: true,
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: parseInt(radius)
        }
      }
    }).populate('disease', 'diseaseName severity status affectedCount');
    res.json({ success: true, count: outbreaks.length, data: outbreaks });
  } catch (err) { next(err); }
};

exports.getHeatmapData = async (req, res, next) => {
  try {
    const diseases = await Disease.find({ status: { $in: ['suspected', 'confirmed'] } })
      .select('location diseaseName severity affectedCount');
    const heatmapPoints = diseases
      .filter(d => d.location?.coordinates?.length === 2)
      .map(d => ({
        lat: d.location.coordinates[1],
        lng: d.location.coordinates[0],
        weight: d.severity === 'critical' ? 4 : d.severity === 'high' ? 3 : d.severity === 'moderate' ? 2 : 1,
        disease: d.diseaseName
      }));
    res.json({ success: true, data: heatmapPoints });
  } catch (err) { next(err); }
};

exports.createLocation = async (req, res, next) => {
  try {
    const loc = await GISLocation.create(req.body);
    res.status(201).json({ success: true, data: loc });
  } catch (err) { next(err); }
};

exports.bufferAnalysis = async (req, res, next) => {
  try {
    const { lng, lat, radius = 10000 } = req.query;
    const [farms, outbreaks] = await Promise.all([
      Farm.find({
        location: {
          $near: {
            $geometry: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
            $maxDistance: parseInt(radius)
          }
        }
      }).select('farmName farmType biosecurityScore riskLevel address'),
      Disease.find({
        location: {
          $near: {
            $geometry: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
            $maxDistance: parseInt(radius)
          }
        },
        status: { $in: ['suspected', 'confirmed'] }
      }).select('diseaseName severity status affectedCount')
    ]);
    res.json({ success: true, data: { farmsInBuffer: farms.length, outbreaksInBuffer: outbreaks.length, farms, outbreaks } });
  } catch (err) { next(err); }
};
