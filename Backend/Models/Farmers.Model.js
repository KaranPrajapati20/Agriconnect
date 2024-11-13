const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken'); 

const FarmerSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true, 
  },
  PhoneNo: {
    type: Number,
  },
  Password: {
    type: String,
    required: true,
  },
  Picture : {
    type: String,
  },
  refreshToken: {
    type: String,
  },
}, {
  timestamps: true,
});


// Method to generate access token
FarmerSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      Email: this.Email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '15m', 
    }
  );
};

// Method to generate refresh token
FarmerSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '7d', 
    }
  );
};

const Farmers = mongoose.model('Farmers', FarmerSchema);

module.exports = Farmers;
