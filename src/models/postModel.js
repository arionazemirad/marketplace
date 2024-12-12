// models/Post.js
const mongoose = require('mongoose');
const mongooseSequence = require('mongoose-sequence')(mongoose);

const PostSchema = new mongoose.Schema(
  {
    postId: {
      type: Number,
      unique: true,
      required: false // userId will be required
    },
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 1000,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    location: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String, // URLs for images
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

PostSchema.plugin(mongooseSequence, { 
  inc_field: 'postId',
  start_seq: 100000  // Optional: start the sequence from 1
});

// Optional: Increment views each time the post is viewed
PostSchema.methods.incrementViews = async function () {
  this.views += 1;
  await this.save();
};

module.exports = mongoose.model('Post', PostSchema);
