const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const mongooseSequence = require('mongoose-sequence')(mongoose);

// User schema definition without username
const UserSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
      unique: true,
      required: false // userId will be required
    },
    firstName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    phone: {
      type: String,
    },
    profilePicture: {
      type: String, // URL of the profile image
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    token: { // Add token field
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

// Apply the auto-increment plugin for userId field
UserSchema.plugin(mongooseSequence, { 
  inc_field: 'userId',
  start_seq: 100000  // Optional: start the sequence from 1
});

// Password hashing middleware
UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Password comparison method
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
