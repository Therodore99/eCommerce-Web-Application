const User = require('../models/user')


exports.loginUser = async (req, res) => {
    
    const { email, password} = req.user; // get this from the auth middleware == firebaseuser
    console.log("User controller req",req.user)
    //find by email, update by name and picture
    // new: true to send the updated info to client 
    const user = await User.findOneAndUpdate(
        {email}, 
        {password}, 
        {new:true}
        );
    if (user) {
        console.log('USER UPDATED', user);
        res.json(user);
    } else {
        const newUser = await new User ({
            email,
            password,
        }).save();
        console.log('USER CREATED', newUser);
        res.json(newUser);
    }
    
};

exports.createOrUpdateUser = async (req, res) => {
    
    const {firstname, lastname, picture, email, password} = req.body; // get this from the auth middleware == firebaseuser
    console.log("User controller req",req.body)
    //find by email, update by name and picture
    // new: true to send the updated info to client 
    const user = await User.findOneAndUpdate(
        {email}, 
        {firstname: firstname, lastname: lastname, password, picture}, 
        {new:true}
        );
    if (user) {
        console.log('USER UPDATED', user);
        res.json(user);
    } else {
        const newUser = await new User ({
            firstname,
            lastname,
            email,
            password,
            picture,
        }).save();
        console.log('USER CREATED', newUser);
        res.json(newUser);
    }
    
};

exports.currentUser = async (req, res) => {
    User.findOne({email: req.user.email})
    .then((user) => {
        res.json(user);
    })
    .catch((err) => console.log(err))
}