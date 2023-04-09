const userRout =require ('../controller/auth.controller');
module.exports = function(app){
    app.post('/api/restaurant/add',userRout.addNew)
    app.get('/api/restaurant/fetch',userRout.fetch)
    app.get('/api/restaurant/categories',userRout.categories)
    app.get('/api/restaurant/categories/categoryDetails',userRout.categoryDetails)
    app.get('/api/restaurant/id',userRout.idDetails)
    app.get('/api/restaurant/rating/ratingValue',userRout.fetchByRating)
    app.put('/api/restaurant/id',userRout.updateDetails)
    app.delete('/api/restaurant/id',userRout.deleteRestaurant)
    app.delete('/api/restaurant/',userRout.deleteAllRestaurants)
}