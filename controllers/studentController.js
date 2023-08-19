const User = require('../models/userModel');
const Training = require('../models/trainingModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.makeTrainingReq = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { trainingLevel, trainingDestination } = req.body;
  if (trainingLevel !== 'Training 1' && trainingLevel !== 'Training 2')
    return next(
      new AppError('Please choose either Training 1 or Training 2!', 400)
    );
  if (trainingDestination !== 'Internal' && trainingDestination !== 'External')
    return next(
      new AppError('Please choose either Internal or external!', 400)
    );
  const training = await Training.create({
    trainingLevel,
    trainingDestination,
    student: {
      name: user.name,
      email: user.email,
    },
    program: user.program,
  });
  res.status(200).json({
    status: 'success',
    data: training,
  });
});
