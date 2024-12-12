const mongoose = require('mongoose');
const mongooseSequence = require('mongoose-sequence')(mongoose);

const CategorySchema = new mongoose.Schema({
  categoryId: {
    type: Number,
    unique: true,
    required: false
  },
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  description: {
    type: String,
    maxlength: 200
  }
}, { timestamps: true });

CategorySchema.plugin(mongooseSequence, {
  inc_field: 'categoryId',
  start_seq: 100000
});

module.exports = mongoose.model('Category', CategorySchema);