const mongoose = require('mongoose');

// Schema
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
    },
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour should have a difficulty'],
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    priceDiscount: Number,
    summary: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      required: [true, 'A tour nust have a description'],
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false, // to permanently hide this from the output
    },
    startDates: [Date],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// To convert duration of days to weeks
// There is no point in storing the duration both in days and weeks in the database.
// Therefore, we are processing that through code using VIRTUAL PROPERTIES
// When we want to use this keyword, we need to use normal regular function
// In this case, we need to this, as this indicates the current document
tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});
//Creating a model from schema
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
