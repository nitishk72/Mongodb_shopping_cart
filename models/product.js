var mongoose = require("mongoose");
var ProductSchema = mongoose.Schema;
var product = new ProductSchema({
    imagePath: {type: String, required : true},
    title: {type: String, required : true},
    description: {type: String, required : true},
    price: {type: Number, required : true}
});

module.exports = mongoose.model('Product', product);