const express = require('express');
const studentController = require('../controllers/studentController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post(
  '/training-request',
  authController.protect,
  authController.permitOnly('student'),
  studentController.makeTrainingReq
);

module.exports = router;
