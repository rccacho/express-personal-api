// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var new_flower = [
  {
  name: "rose",
  popularColors: ["red", "white", "pink", "yellow", "orange"]
  image: "http://cimages.prvd.com/is/image/ProvideCommerce/PF_15_R202_MINIMAL_VA0035_W1_SQ?$PFCProductImage$"
  }
];



db.Flower.create(new_flower, function(err, flower){
  if (err){
    return console.log("Error:", err);
  }

  console.log("Created new flower", flower._id)
  process.exit(); // we're all done! Exit the program.
})



// var new_campsite = {description: "Sharp rocks. Middle of nowhere."}

// db.Campsite.create(new_campsite, function(err, campsite){
//   if (err){
//     return console.log("Error:", err);
//   }

//   console.log("Created new campsite", campsite._id)
//   process.exit(); // we're all done! Exit the program.
// })
