const mongoose = require('mongoose');

const trainingSchema = new mongoose.Schema({
  trainingLevel: {
    type: String,
    required: [true, 'Please specify your training level!'],
    enum: ['Training 1', 'Training 2'],
  },
  trainingDestination: {
    type: String,
    required: [true, 'Please specify your training destination!'],
    enum: ['Internal', 'External'],
  },
  description: {
    type: String,
    trim: true,
    minlength: 20,
    maxlength: 100,
  },
  student: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: 'User',
    // required: [true, 'You should associate the student!'],
    name: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 20,
    },
    email: String,
  },
  program: String,
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Rejected', 'Completed'],
    default: 'Pending',
  },
  requestedAt: {
    type: Date,
    default: Date.now(),
  },
  attachment: String,
  grade: {
    type: String,
    enum: ['F', 'D', 'C', 'B', 'A'],
  },
});

trainingSchema.index({ student: 1 }, { unique: true });

// trainingSchema.pre(/^find/, function (next) {
//   this.populate('student', {
//     name: 1,
//     email: 1,
//     program: 1,
//   });
//   next();
// });

const Training = mongoose.model('Training', trainingSchema);

module.exports = Training;
