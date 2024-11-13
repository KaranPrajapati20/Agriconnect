const Farmers = require('../Models/Farmers.Model');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

// Function to generate access and refresh tokens
const generateAccessAndRefreshToken = async (userId) => {
    try {
      const user = await Farmers.findById(userId);
      const accessToken = user.generateAccessToken();
      const refreshToken = user.generateRefreshToken();
  
      user.refreshToken = refreshToken; 
      await user.save({ validateBeforeSave: false });
  
      return { accessToken, refreshToken };
    } catch (error) {
      return null;
    }
  };


// Function to refresh access token
const refreshAccessToken = async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
  
    if (!incomingRefreshToken) {
      return res.status(401).json({ message: "Unauthorized request" });
    }
  
    try {
      const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
      const user = await Farmers.findById(decodedToken?._id);
  
      if (!user) {
        return res.status(401).json({ message: "Invalid refresh token" });
      }
      if (incomingRefreshToken !== user?.refreshToken) {
        return res.status(401).json({ message: "Refresh token is expired or used" });
      }
      const { accessToken, refreshToken: newRefreshToken } = await generateAccessAndRefreshToken(user._id);
  
      return res.status(200)
        .cookie("accessToken", accessToken, { httpOnly: true, secure: true })
        .cookie("refreshToken", newRefreshToken, { httpOnly: true, secure: true })
        .json({ message: "Access token refreshed", accessToken, refreshToken: newRefreshToken });
    } catch (error) {
      return res.status(401).json({ message: error?.message || "Invalid refresh token" });
    }
  }; 


// To sign in
const SignIn = async (req, res) => {
    const { Email, Password } = req.body;

    try {
        const farmer = await Farmers.findOne({ Email });

        if (!farmer) {
            return res.status(404).json({ message: "User not found" });
        }

        const correctPassword = await bcrypt.compare(Password, farmer.Password);

        if (!correctPassword) {
            return res.status(401).json({ message: "Incorrect password" });
        }
        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(farmer._id);

        const options = { httpOnly: true, secure: false };
       
        res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({ message: "User logged in successfully", user: farmer, accessToken });

    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Function to handle employee logout
const logoutUser = async (req, res) => { 
    try {
        await Farmers.findByIdAndUpdate(
        req.user._id,
        { $unset: { refreshToken: 1 } },
        { new: true } 
      );
  
      const options = { httpOnly: true, secure: false };
      return res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json({ message: "User logged out successfully", status: 200 });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }; 

// To Sing up

const SignUp = async (req, res) => {
  const { Name, PhoneNo, Email, Password ,Picture} = req.body;

  console.log(Name, PhoneNo, Email, Password, Picture)
  try {
      const existingFarmer = await Farmers.findOne({ Email });

      if (existingFarmer) {
          return res.status(400).json({ message: "User already exists" });
      }

      let hashedPassword;
      if (Password) {
          hashedPassword = await bcrypt.hash(Password, 10);
      }

      const newFarmer = new Farmers({
          Name,
          PhoneNo,
          Email,
          Picture : Picture || " ",
          Password: hashedPassword || " ", // Set to null if not provided
      });

      await newFarmer.save();
      return res.status(201).json({ message: "Sign up successful" });

  } catch (error) {
      return res.status(500).json({ message: "Server error", error: error.message });
  }
};


module.exports = {
    SignIn,
    SignUp,
    logoutUser
};
