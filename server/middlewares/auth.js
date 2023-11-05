const admin = require('../firebase');
const User = require("../models/user");

// this is a middleware to check auth token 
exports.authCheck = async (req, res, next) => {
    // console.log(req.headers);
    try {
        const firebaseUser = await admin
        .auth()
        .verifyIdToken(req.headers.authtoken)
        console.log('FIREBASE USER IN AUTHCHECK', firebaseUser);
        //make the auth token available in req.user so we can access it in controlller
        req.user = firebaseUser;
        next();
    } catch (err) {
        console.log(err)
        res.status(401).json({
            err: "Invalid or expired token",
        });
    }
    
};

exports.adminCheck = async (req, res, next) => {
    const { email } = req.user;
  
    const adminUser = await User.findOne({ email }).exec();
  
    if (adminUser._id !== "admin") {
      res.status(403).json({
        err: "Admin resource. Access denied.",
      });
    } else {
      next();
    }
  };