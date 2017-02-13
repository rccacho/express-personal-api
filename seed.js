// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var flowers_list = [
  {
  name: "rose",
  popularColors: ["red", "white", "pink", "yellow", "orange"],
  image: "https://www.ftdimg.com/pics/products/SMRB_200x225.jpg"
  },
  {
  name: "tulip",
  popularColors: ["red", "pink", "yellow", "purple"],
  image: "https://maxpull-gdvuch3veo.netdna-ssl.com/wp-content/uploads/2008/07/tulips-in-bloom.jpg"
  },
  {
  name: "pom",
  popularColors: ["red", "white", "light-green", "yellow"],
  image: "https://www.fiftyflowers.com/site_files/FiftyFlowers/Image/Product/Button-Fall-Assorted-Mix-Close-500_2888393b.jpg"
  },
  {
  name: "gladiolus",
  popularColors: ["red", "white", "pink", "yellow"],
  image: "http://demandware.edgesuite.net/sits_pod38/dw/image/v2/ABAQ_PRD/on/demandware.static/-/Sites-masterCatalog_Burpee/default/dwe18ec490/Images/Product%20Images/prod002852/prod002852.jpg?sw=265&sh=312&sm=fit"
  },
  {
  name: "ranunculus",
  popularColors: ["red", "pink", "yellow", "orange"],
  image: "https://www.longfield-gardens.com/_ccLib/image/articles/ADDI4-82.jpg"
  },
  {
  name: "calla lily",
  popularColors: ["white", "purple"],
  image: "https://s-media-cache-ak0.pinimg.com/736x/42/14/1b/42141b26241b28a6476caca345fdd4c4.jpg"
  },
  {
  name: "hydrangea",
  popularColors: ["white", "pink", "light-blue", "purple"],
  image: "http://myfsn-ar.flowershopnetwork.com/images/flowerdatabase/mixed-hydrangea-bouquet.365.jpg"
  }
];


db.Flower.remove({}, function(err, flowers){
  if(err) {
    console.log('Error occurred in remove', err);
  } else {
    console.log('removed all flowers');

    // create new records based on the array flowers_list
    db.Flower.create(flowers_list, function(err, flowers){
      if (err) { 
      	return console.log('err', err); 
      } else {
      console.log("created", flowers.length, "flowers");
      process.exit();
  	  }
    });
  }
});

