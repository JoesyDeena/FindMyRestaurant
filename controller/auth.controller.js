const newUser = require ('../models/usermodel');

exports.addNew= async (req,res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).send({ message: 'Request body cannot be empty' });
      }
    const userObject = {
        name:req.body.name,
        description:req.body.description,
        category:req.body.category,
        imageUrl:req.body.imageUrl,
        location:req.body.location,
        phone:req.body.phone,
        rating:req.body.rating

    };
    try{
        const user = await newUser.create(userObject);
        res.status(200).send({
            name:user.name,
            description:user.description,
            category:user.category,
            imageUrl:user.imageUrl,
            location:user.location,
            phone:user.phone,
            rating:user.rating
        });
    }
    catch(err){
        console.log("Error creating user",err);
        res.status(500).send({
            message:"Some error occurred while creating the Restaurant"
        
        });
    }
}
/* Fetching all the restaurants */
exports.fetch = async (req, res) => {

    try {
        const allRestaurants = await newUser.find();

        if (allRestaurants.length === 0) {
            return res.status(404).send({
                message: "No Restaurants found."
            });
        }

        return res.status(200).send({
            allRestaurants, message: "Restaurants fetched successfully."
        });

    }
    catch (err) {
        console.log("Error creating User", err);
res.status(500).send({
            message: "Some error occured while fetching the Restaurants."
        });
    }
}
/* List all the categories of restaurant */
exports.categories = async(req,res) => {
    try{
        const listCategory = await newUser.distinct('category');
        if (listCategory.length===0){
            return res.status(404).send({
              message:"No categories found."  
            });
        }
        return res.status(200).send({
           listCategory, message: "All categories listed successfully."
        });
    }
    catch(err){
        console.log("error catching category",err);
        res.status(500).send({
            message: "Some error occurred while fetching Categories."
        });

    }
}
/* all the restaurants of a particular category */
exports.categoryDetails = async(req,res) => {
    try{
        const categoryName =req.query.category;
        const categories =await newUser.find({category:categoryName});
        if(categories.length>0 && categories[0].category==="Takeout"){
            return res.status(200).send(categories)
        }
        else if (categories.length>0 && categories[0].category==="Dineout"){
            return res.status(200).send(categories)
        }
        else{
            return res.status(200).send([]);
                
     
    }
}catch(err){
        console.log("error catching category",err);
        res.status(500).send({
            message: "Some error occurred while fetching Categories."
        });

    
    }
}
/* fetch details of the restaurant with a particular id */
exports.idDetails = async(req,res) =>{
    try{
        const details = await newUser.findById(req.query.id);
        if(!details||details.length===0){
            return res.status(404).send({
                message: "No restaurant found with given ID."
            });
        }
        return res.status(200).send(details);
    }
    catch(err){
        console.log("Error fetching restaurant details with ID",err);
        res.status(500).send({
            message :"Some error occured while fetching the restaurant with the given ID"
        });
    }
}
/*fetch the details of the restaurants with rating >=4 */
exports.fetchByRating = async(req,res) => {
    try{
        const {ratingValue}=req.query;
        const ratingBy = await newUser.find({rating:{ $gte:ratingValue }});
        if(!ratingValue){
            return res.status(200).send([]);
        }
        return res.status(200).send({
            ratingBy, message : "Restaurants fetched successfully based on rating."
        });
}
catch(err){
    console.log("Error fetching restaurant details with rating",err);
    res.status(500).send({
        message:"Some error occured while fetching the restaurant with rating."
    });
}
}
/*  updates existing details of the restaurant with a particular id */
exports.updateDetails = async (req,res) => {
    try{
        const {id}= req.query;
        const {name,description,category,imageUrl,location,phone,rating} =req.body;
        if(!id||!name||!description||!category||!imageUrl||!location||!phone||!rating){
            return res.status(400).send({
                message:"Restaurant data is required"
            });
        }
        const updateId = await newUser.findByIdAndUpdate(id,{name,description,category,imageUrl,location,phone,rating});
        if(!updateId){
           return res.status(200).send({
                message:"No restaurant found for given ID"
            });
        }
            return res.status(200).send({updateId,
                message :"Restaurant updated successfully."
            });
        
    } catch(err){
        console.log("Error fetching restaurant details with rating",err);
        res.status(500).send({
            message:"Some error occured while fetching the restaurant with rating."
        });
    }
}
/* deletes existing details of the restaurant with a particular id */

    exports.deleteRestaurant = async (req, res) => {

        try {
    
            const id = req.query.id;
            //const updates = req.body;
            const restaurant = await newUser.findByIdAndDelete(id);
            if (!restaurant) {
                return res.status(404).send({
                    restaurant: "null",
                    message: "Restaurant deleted successfully."
                });
            }
            return res.status(200).send({
                restaurant,
                message: "Restaurant deleted successfully."
    
            });
        }
        catch (err) {
            console.log("Error throws while deleting the restaurant", err);
            res.status(500).send({
                message: "Some error occurred while deleting the Restaurant."
            });
        }
    }
    /*deletes all existing details of the restaurants*/
    exports.deleteAllRestaurants = async (req, res) => {
        try {
            const deleteCount = await newUser.deleteMany({});
    
            if (deleteCount.deletedCount === 0) {
                return res.status(404).send({ acknowledge: false, message: "No restaurants found to delete" });
            }
    
            res.status(200).send({ acknowledge: true, message: "All restaurants deleted successfully", count: deleteCount.deletedCount });
        } catch (err) {
            console.log("Error deleting restaurants", err);
            res.status(500).send({
                message: "Some error occurred while deleting the Restaurant."
            });
        }
    }
