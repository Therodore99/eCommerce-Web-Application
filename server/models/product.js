const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      text: true,
      
    },
    reviewr:{
      type: String,
      ref: "User",
    },
    comment:{
      type: String,
      required: true,
      maxlength: 2000,
      text: true,
      default: "Product comment"
    },

    slug: {
      type: String,
      // unique: true,
      lowercase: true,
      // index: true,
      
    },
    // description: {
    //   type: String,
    //   required: true,
    //   maxlength: 2000,
    //   text: true,
    //   default: "Product description"
    // },
    price: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 32,
    },
    seller: {
      type: ObjectId,
      ref: "User",
    },
    stock: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
    },
    brand: {
      type: String,
      //text: true,
      enum: ["Apple", 'BlackBerry', 'HTC','Huewei','LG', 'Motorola', 'Nokia', 'Samsung', 'Sony'],
    },
    ratings: [
      {
        star: Number,
        comment:String,
        reviewer: { type: ObjectId, ref: "User" },
        hidden: {type: String, enum: ["Yes", "No"] }
      },
    ],
    hiddened: [
      { type: String,
        enum: ["Yes", "No"],
        default: "No"
      }
    ]
      
  },
  { timestamps: true }
);

productSchema.pre('save', function(next) {
  this.slug = this.title.toLowerCase()
  next()
})

module.exports = mongoose.model("Product", productSchema);
