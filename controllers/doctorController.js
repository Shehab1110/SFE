const Training = require('../models/trainingModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const validator = require('validator');

exports.getTrainingRequests = catchAsync(async (req, res, next) => {
  const { user } = req;
  const queryObj = { program: user.program };
  if (req.query.name) {
    queryObj['student.name'] = { $regex: req.query.name, $options: 'i' };
  }
  if (req.query.email) {
    queryObj['student.email'] = { $regex: req.query.email, $options: 'i' };
  }
  const trainingRequests = await Training.find(queryObj);
  if (trainingRequests.length === 0)
    return next(new AppError('No training requests found!', 404));
  res.status(200).json({
    status: 'success',
    results: trainingRequests.length,
    data: trainingRequests,
  });
});

exports.acceptTrainingRequest = catchAsync(async (req, res, next) => {
  const { trainingID } = req.body;
  if (!trainingID || !validator.isMongoId(trainingID))
    return next(new AppError('Please provide a valid training ID!', 400));
  const training = await Training.findById(trainingID);
  if (!training)
    return next(new AppError('No training found with that ID!', 404));
  if (training.status === 'Accepted')
    return next(new AppError('Training is alread accepted!', 400));
  training.status = 'Accepted';
  await training.save();
  res.status(200).json({
    status: 'success',
    data: training,
  });
});

exports.rejectTrainingRequest = catchAsync(async (req, res, next) => {
  const { trainingID } = req.body;
  if (!trainingID || !validator.isMongoId(trainingID))
    return next(new AppError('Please provide a valid training ID!', 400));
  const training = await Training.findById(trainingID);
  if (!training)
    return next(new AppError('No training found with that ID!', 404));
  if (training.status === 'Rejected')
    return next(new AppError('Training is alread rejected!', 400));
  training.status = 'Rejected';
  await training.save();
  res.status(200).json({
    status: 'success',
    data: training,
  });
});
