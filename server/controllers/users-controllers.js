const { validationResult } = require('express-validator');
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');
const expressjwt = require('express-jwt');
const secretKey = 'ecomapp';
const HttpError = require('../models/http-error');
const User = require('../models/user');
const Product = require('../models/product');
const mailTransporter = require('../config/mailTransporter');
const fs = require('fs'); 


const json=async(req,res,next)=>{
  read=JSON.parse(fs.readFileSync("./userlist.json",{encoding:'utf8', flag:'r'}));
  let now_user_list=[];
  const password="Aa#123456";
  for (let i = 0; i < read.length; i++) {
    read[i].verification=true;
    let salt=await bcrypt.genSalt(15);
    let now_password=await bcrypt.hash(password,salt);
    read[i].password=now_password;
    now_user_list.push(read[i]);
  }
  now_user_list=JSON.stringify(now_user_list);

  fs.writeFileSync("./userlist.json",now_user_list,'utf8');
  res.json({"message":"ok"});
}


const getUsers = async (req, res, next) => {
  let users;
  let id= '5f5237a4c1beb1523fa3da02';
  if (req.params.id) {
    id= req.params.id;
  }
  console.log('find seller', id)
  try {
    users = await User.findById(req.params.id);//exclude password
  } catch (err) {
    const error = new HttpError(
      'Fetching users failed, please try again later.',
      500
    );
    return next(error);
  }
  res.json(users);
};

// verification 
const verification=async(req,res,next)=>{
  const {token}=req.query;
  try{
    let verifyToken = jwt.verify(token,secretKey);
    const user=verifyToken.user;
    const updateUser =await User.findOne({email:user.email});
    if(!updateUser.verification){
      updateUser.verification=true;
      updateUser.save();
      res.status(200).json({message:"Successful verification"});
    }else{
      res.status(401).json({message:"The verification has been successful, no need to verify again"});
    }
  }catch(ErrorCaptureStackTrace){
      res.status(500).json({message:"Unknown error occurred!"});
  }
} 

// reset_password
const reset_password=async(req,res,next)=>{
  const {email}=req.body;
  try{
    let users=await User.findOne({email:email});
    if(!users){
      const error = new HttpError(
        'The user corresponding to the mailbox number is not found!',
        500
      );
      return next(error);
    }
    const tokenStr = jwt.sign({ user:users }, secretKey, { expiresIn: '120000s' });
    const apiurl="http://localhost:3000/forgot/sourcepassword?token="+tokenStr;
    mailTransporter.snedMail('Reset password',`<h3>Please click the following URL to confirm the reset password:</h3><a href=${apiurl}>${apiurl}</a>`,email);
    res.status(200).json({message:"success"});
  }catch(ErrorCaptureStackTrace){
      res.status(500).json({message:"Unknown error occurred!"});
  }
} 

// success_reset
const success_reset=async(req,res,next)=>{
  const {token}=req.body;
  const {password}=req.body;
  try{
    let verifyToken = jwt.verify(token,secretKey);
    const user=verifyToken.user;
    const updateUser =await User.findOne({email:user.email});
    let salt=await bcrypt.genSalt(15);
    let now_password=await bcrypt.hash(password,salt);
    updateUser.password=now_password;
    await updateUser.save();
    res.status(200).json({message:"Password reset successful!"});
  }catch(ErrorCaptureStackTrace){
    res.status(500).json({message:"Unknown error occurred!"});
  }
} 


// sign up 
const signup = async (req, res, next) => {
  //handle inputs from route
  const errors = validationResult(req);
  console.log(req.body);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }
  let { firstname,lastname, email, password } = req.body;
  
  //check if user exists
  let existingUser
  try {
    existingUser = await User.findOne({ email: email })
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }
  
  //throw error if already exists
  if (existingUser) {
    const error = new HttpError(
      'User exists already, please login instead.',
      422
    );
    return next(error);
  }
  
  let salt=await bcrypt.genSalt(15);
  let verification=false;
  password=await bcrypt.hash(password,salt);

  const createdUser =await new User({
    firstname,
    lastname,
    email,
    image: 'https://live.staticflickr.com/7631/26849088292_36fc52ee90_b.jpg',
    password,
    places: [],
    verification,
  });

  //save
  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again.',
      500
    );
    return next(error);
  }

  try{
    const tokenStr = jwt.sign({ user:createdUser }, secretKey, { expiresIn: '120000s' });
    //console.log(tokenStr);
    const apiurl="http://localhost:8000/api/users/verification?token="+tokenStr;
    mailTransporter.snedMail('Mailbox Authentication',`<h3>Please click the following page for email verification:</h3><a href=${apiurl}>${apiurl}</a>`,email);
  }catch(err){
    const error = new HttpError(
      'Failed to send email! Unknown error occurred!',
      500
    );
    return next(error);
  }

  res.status(201).json({user: createdUser.toObject({ getters: true })});
};




// login
const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email })
    var isValidate =await bcrypt.compareSync(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      'Logging in failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!existingUser || !isValidate) {
    const error = new HttpError(
      'Invalid credentials, could not log you in.',
      401
    );
    return next(error);
  }

  if (!existingUser.verification) {
    const error = new HttpError(
      'The current user has not verified the mailbox. Please verify the mailbox and log in again.',
      401
    );
    return next(error);
  }
  
  const tokenStr = jwt.sign({ user: existingUser }, secretKey, { expiresIn: '120000s' });
  res.json({message: 'Logged in!',token:tokenStr,user:existingUser});
};


 
const changepassword=async (req, res, next) => {
  const { password,repassword,token } = req.body;
  let verifyToken = jwt.verify(token,secretKey);
  const user=verifyToken.user;
  var existingUser = await User.findOne({ email: user.email })
  var isValidate =await bcrypt.compareSync(password, existingUser.password);
  if(isValidate){
    let salt=await bcrypt.genSalt(15);
    let now_password=await bcrypt.hash(repassword,salt);
    existingUser.password=now_password;
    await existingUser.save();
    mailTransporter.snedMail('Mailbox Tips','Password changed successfully',existingUser.email);
    res.status(200).json({message:"Password changed successfully!"});
  }else{
    res.status(500).json({message:"The original password is wrong!"});
  }
}

const judgmentpassword=async (req, res, next) => {
  const { password,token } = req.body;
  let verifyToken = jwt.verify(token,secretKey);
  const user=verifyToken.user;
  var existingUser = await User.findOne({ email: user.email })
  var isValidate =await bcrypt.compareSync(password, existingUser.password);
  if(isValidate){
    res.status(200).json({message:"Correct password!"});
  }else{
    res.status(500).json({message:"The original password is wrong!"});
  }
}

const getToken=async (req, res, next) => {
  const { token } = req.body;
  let verifyToken = jwt.verify(token,secretKey);
  const user=verifyToken.user;
  res.status(200).json({message:"User Successfully!",user:user});
}


const update=async (req, res, next) => {
  const { token,firstname,lastname,email } = req.body;
  let verifyToken = jwt.verify(token,secretKey);
  const user=verifyToken.user;
  var existingUser = await User.findOne({ email: user.email });
  existingUser.firstname=firstname;
  existingUser.lastname=lastname;
  existingUser.email=email;
  await existingUser.save();
  res.status(200).json({message:"User update Successfully!",user:user});
}

const getComments=async (req, res, next) => {
  const { token } = req.body;
  let verifyToken = jwt.verify(token,secretKey);
  const user=verifyToken.user;
  let products=await Product.find({});
  let now_comments=[];
  products.forEach(item=>{
    item.ratings.forEach(items=>{
      if(items.reviewer==user._id){
        now_comments.push({
          _id:item._id,
          title:item.title,
          rid:items._id,
          reviewer:items.reviewer,
          comment:items.comment
        })
      }
    })
  });
  console.log(products);
  res.status(200).json({message:"User update Successfully!",user:user,comments:now_comments});
}

const updateComment=async (req, res, next) => {
  const { reviewer,comment,id,bl } = req.body;
  let product=await Product.findOne({_id:Object(id)});
  let now_ratings=[]; 
  product.ratings.forEach(items=>{
    if(items.comment==comment && items.reviewer==reviewer){
      items.hidden=bl;
    }
    now_ratings.push(items);
  })
  product.ratings=now_ratings;
  await product.save();
  res.status(200).json({message:"Update Comment Successfully!"});
}


exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
exports.verification=verification;
exports.success_reset=success_reset;
exports.reset_password=reset_password;
exports.changepassword=changepassword;
exports.judgmentpassword=judgmentpassword;
exports.getToken=getToken;
exports.update=update;
exports.getComments=getComments;
exports.updateComment=updateComment;
exports.json=json;
