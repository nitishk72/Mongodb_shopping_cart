var mongoose = require("mongoose");
var Product = require("../models/product");

mongoose.connect("localhost:27017/shopping-cart");



var product = [
        new Product({
        imagePath : "https://i.ytimg.com/vi/65AjY_nRdqE/maxresdefault.jpg",
        title : "Warcraft",
        description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        price : 12
    }),
    new Product({
        imagePath : "https://www.callofduty.com/content/dam/atvi/callofduty/wwii/home/Stronghold_Metadata_Image.jpg",
        title : "call of duty",
        description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        price : 15
    }),
    new Product({
        imagePath : "https://ubistatic19-a.akamaihd.net/ubicomstatic/en-gb/global/search-thumbnail/acm_ubi_thumb_leap_mobile_275895.jpg",
        title : "assasin's creed",
        description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        price : 15

    }),
    new Product({
        imagePath : "https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png",
        title : "Gothic",
        description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        price : 15
    }),
    new Product({
        imagePath : "http://media.comicbook.com/2015/11/legendsoftomorrowconstantine-160899-1280x0.png",
        title : "Legends of Tommorow",
        description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        price : 15 
    }),
    new Product({
        imagePath : "https://clay.io/blog/wp-content/uploads/2013/02/2-21-2013-1-33-19-AM-384c.png",
        title : "Angry Birds",
        description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        price : 00
    })
];

var done = 0;
for(var i=0;i<product.length;i++){
    product[i].save(function(err, result){
        done++;
        if(err){
            console.log(err);
        } else {
            if(done == product.length){
                exit();
            }
        }
    });
}

function exit(){
    mongoose.disconnect();
}