const express = require("express");
const router = express.Router();

// middlewares
const { authCheck } = require("../middlewares/auth");

// controller
const { create, 
    listAllbyUser, 
    remove, 
    read , 
    update, 
    list, 
    productsCount, 
    productStar, 
    searchFilters,
    listAll
} = require("../controllers/product");

//read to update
router.get("/product/:slug", read);

// routes
//create
router.post("/product", create);

//get total product count 
router.get("/products/total", productsCount);

//list all for shop page
router.get("/shop/products/:count", listAll);

//list all (Admin Products update page)
router.get("/products/:count", authCheck, listAllbyUser);

//remove //add user check later
router.delete("/product/:slug", authCheck,  remove);


// update //add user check later
router.put("/product/:slug", authCheck, update);
//homepage list products
router.post("/products", list);

//rating
router.put("/product/star/:productId", authCheck, productStar);

//search, filter 
router.post("/search/filters", searchFilters);



module.exports = router;