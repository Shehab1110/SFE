const express = require('express');
const doctorController = require('../controllers/doctorController');
const authController = require('../controllers/authController');
const router = express.Router();

router.get(
  '/training-requests',
  authController.protect,
  authController.permitOnly('doctor'),
  doctorController.getTrainingRequests
);

router.post(
  '/accept-training-request',
  authController.protect,
  authController.permitOnly('doctor'),
  doctorController.acceptTrainingRequest
);

router.post(
  '/reject-training-request',
  authController.protect,
  authController.permitOnly('doctor'),
  doctorController.rejectTrainingRequest
);

module.exports = router;
