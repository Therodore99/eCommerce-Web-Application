const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const userSchema = new mongoose.Schema({
    firstname: {type: String}, 
    lastname: {type: String}, 
    email: {
        type: String,
        // required: true,
        index: true,
    },
    // role: {
    //     type: String,
    //     default: 'subscriber',
    // },
    //cart: {
     //   type:Array,
      //  default: [],
  //  },
    // address: String,
    password: String,
    // wishlist: [{type: ObjectId, ref:"Product")}],
    verification:Boolean,
    }, 
    {timestamps:true}
);

module.exports = mongoose.model('User', userSchema);