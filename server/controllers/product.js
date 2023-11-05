const Product = require("../models/product");
const slugify = require("slugify");
const User = require("../models/user"); 

exports.create = async (req, res) => {
  try {
    console.log('create product controler', req.body)
    const user = await User.findOne({ 'email': req.body.seller }).exec(); //find User
    console.log("Create user",user._id)
    
    req.body.slug = slugify(req.body.title);
    req.body.seller = user._id;
    
    console.log("Product create", req.body);
    const newProduct = await new Product(
      req.body,
      ).save();
    res.json(newProduct);
    console.log(newProduct);
  } catch (err) {
    console.log(err);
    // res.status(400).send("Create product failed");
    res.status(400).json({
      err: err.message,
    });
  }
};


//list All for shop page
exports.listAll = async (req, res) => {
  let products = await Product.find({})
    .limit(parseInt(req.params.count))
    // .populate("category")
    // .populate("subs")
    .sort([["createdAt", "desc"]])
    .exec();
  res.json(products);
};


//disabled: {$ne:"Yes"} for admin dashboard
exports.listAllbyUser = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec(); //find User
  console.log("ListALl user",user._id.toString())
  let userId = user._id
  let products = await Product.find({
    // condition req.userId = product.creator 
    seller: userId
  })
    .limit(parseInt(req.params.count)) //count is the param given in route
    .sort([["createdAt", "desc"]]) // take an array, if sort by more than one criterion >> [[]]
    .exec();
  res.json(products);
};


exports.remove = async (req, res) => {
  try {
    //findbyid if delete by id
    const deleted = await Product.findOneAndRemove({
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    return res.staus(400).send("Product delete failed");
  }
};


//get product by slug to update
exports.read = async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug })
    .exec();
  res.json(product);
};

//update
exports.update = async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title); // update the slug according to title 
    }
    const updated = await Product.findOneAndUpdate(
      { slug: req.params.slug }, //find according to slug and update body 
      req.body,
      { new: true }
    ).exec();
    res.json(updated);
  } catch (err) {
    console.log("PRODUCT UPDATE ERROR ----> ", err);
    // return res.status(400).send("Product update failed");
    res.status(400).json({
      err: err.message,
    });
  }
};



// WITH PAGINATION
exports.list = async (req, res) => {
  console.log(req.body)
  try {
    // createdAt/updatedAt, desc/asc, 3
    const { sort, order, page } = req.body;
    const currentPage = page || 1; //current page or default 1
    const perPage = 3; // 3

    const products = await Product.find({
      disabled: {$ne:"Yes"}
    })
      .skip((currentPage - 1) * perPage)
      .sort([[sort, order]])
      .limit(perPage)
      .exec();

    res.json(products);
  } catch (err) {
    console.log(err);
  }
};


//get total product count For Home page // exclude disabled ones
exports.productsCount = async (req, res) => {
  let total = await Product.find({
    disabled: {$ne:"Yes"} 
  }).estimatedDocumentCount().exec();
  res.json(total);
};


//product star
exports.productStar = async (req, res) => {
  const product = await Product.findById(req.params.productId).exec();
  const user = await User.findOne({ email: req.user.email }).exec(); //find User through authcheck middleware which make user available through firebase 
  //send start from front to back
  const { star } = req.body;

  // who is updating?
  // check if currently logged in user have already added rating to this product?
  let existingRatingObject = product.ratings.find(
    (ele) => ele.reviewer.toString() === user._id.toString()
  );

  // if user haven't left rating yet, push it
  if (existingRatingObject === undefined) {
    let ratingAdded = await Product.findByIdAndUpdate(
      product._id,
      {
        $push: { ratings: { star, postedBy: user._id } },
      },
      { new: true }
    ).exec();
    console.log("ratingAdded", ratingAdded);
    res.json(ratingAdded);
  } else {
    // if user have already left rating, update it
    const ratingUpdated = await Product.updateOne(
      {
        ratings: { $elemMatch: existingRatingObject }, //find the matching element
      },
      { $set: { "ratings.$.star": star } }, //only update the star
      { new: true }
    ).exec();
    console.log("ratingUpdated", ratingUpdated);
    res.json(ratingUpdated);
  }
};


// SERACH / FILTER
// query based on text
// const handleQuery = async (req, res, query) => {
//   console.log("Queryyy --->", query)
//   let regex = new RegExp(query ,'i');
//   const products = await Product.find({ title: { $regex: regex } }) 
//   .populate({ path: "ratings", populate: "reviewer",select:'_id' }) // choose _id and lname fields
//   .exec();

  
//   res.json(products);
// };

// //price
// const handlePrice = async (req, res, price) => {
//   try {
//     let products = await Product.find({
//       price: {
//         $gte: price[0],
//         $lte: price[1],
//       },
//     })
//       .populate({ path: "ratings", populate: "reviewer",select:'_id' })
//       .exec();

//     res.json(products);
//   } catch (err) {
//     console.log(err);
//   }
// };


// //star 
// const handleStar = (req, res, stars) => {
//   Product.aggregate([
//     { //aggregate ratings for each document aka each product- each product treated as a document 
//       $project: {
//         document: "$$ROOT", // access to entire Product document
//         //equivalent to lisitng all fields e.g. title: "$title",
//         //add average rating to the document
//         floorAverage: {
//           $floor: { $avg: "$ratings.star" }, // floor value of 3.33 will be 3
//         },
//       },// get average rating from this
//     },// then match with the stars input we have to filter 
//     { $match: { floorAverage: stars } },
//   ])
//     //.limit(12)
//     //
//     .exec((err, aggregates) => { // async function //cause not specify async above
//       if (err) console.log("AGGREGATE ERROR", err);
//       Product.find({ _id: aggregates })
//         .populate({ path: "ratings", populate: "reviewer",select:'_id' })
//         .exec((err, products) => {
//           if (err) console.log("PRODUCT AGGREGATE ERROR", err);
//           res.json(products);
//         });
//     });
// };

// //brand
// const handleBrand = async (req, res, brand) => {
//   const products = await Product.find({brand}) //{brand: { $in: brand }}
//     .populate({ path: "ratings", populate: "reviewer",select:'_id' })
//     .exec();

//   res.json(products);
// };

// exports.searchFilters = async (req, res) => {
//   const { query, price, stars, brand } = req.body;
//   console.log("Filter ",req.body)

  
//   if (query) {
//     console.log("query --->", query);
//     await handleQuery(req, res, query);
//   }

//   if (price !== undefined) {
//     console.log("price ---> ", price);
//     await handlePrice(req, res, price);
//   }

//   if (stars) {
//     console.log("stars ---> ", stars);
//     await handleStar(req, res, stars);
//   }

//   if (brand) {
//     console.log("brand ---> ", brand);
//     await handleBrand(req, res, brand);
//   }
  
// };


// all filters together 
exports.searchFilters = async (req, res) => {
  const { query, price, star, brand } = req.body;
  console.log("search filter req", req.body );
  let queryObject =  {
    t: '' // just to create an object, this field does not have a meaning
  };
 
  
  if (query) {
    queryObject.title =  { $regex: query, $options: 'i' };
  }

  if (brand && brand !== 'All') {
    queryObject.brand = brand;
  }

  if (price && price != [0,10000]) {
    queryObject.price = {
      $gte: price[0],
      $lte: price[1],
    }
  }
  
  console.log("QueryObject",queryObject);

  if (star && star !== 'All') {
    Product.aggregate([
      { //aggregate ratings for each document aka each product- each product treated as a document 
        $project: {
          document: "$$ROOT", // access to entire Product document
          //equivalent to lisitng all fields e.g. title: "$title",
          //add average rating to the document
          floorAverage: {
            $floor: { $avg: "$ratings.star" }, // floor value of 3.33 will be 3
          },
        },// get average rating from this
      },// then match with the stars input we have to filter 
      { $match: { floorAverage: star } },
    ])
    .exec((err, aggregates) => { // async function //cause not specify async above
      if (err) console.log("AGGREGATE ERROR", err);
      Product.find({$and:[
        { _id: aggregates },
        queryObject
      ]})
        .populate({ path: "ratings", populate: "reviewer",select:'_id' })
        .exec((err, products) => {
          if (err) console.log("PRODUCT AGGREGATE ERROR", err);
          res.json(products);
        });
    });
    
    
  } else {
    let result = Product.find(queryObject);
    const products = await result.exec();
    res.json(products);
  }


};