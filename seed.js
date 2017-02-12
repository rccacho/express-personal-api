// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var flowers = [
  {
  name: "rose",
  popularColors: ["red", "white", "pink", "yellow", "orange"],
  image: "Image will be here."
  },
  {
  name: "rose2",
  popularColors: ["red", "white", "pink", "yellow", "orange"],
  image: "Image will be here."
  },
  {
  name: "rose3",
  popularColors: ["red", "white", "pink", "yellow", "orange"],
  image: "Image will be here."
  },
  {
  name: "rose4",
  popularColors: ["red", "white", "pink", "yellow", "orange"],
  image: "Image will be here."
  },
  {
  name: "rose5",
  popularColors: ["red", "white", "pink", "yellow", "orange"],
  image: "Image will be here."
  },
  {
  name: "rose6",
  popularColors: ["red", "white", "pink", "yellow", "orange"],
  image: "Image will be here."
  },
  {
  name: "rose7",
  popularColors: ["red", "white", "pink", "yellow", "orange"],
  image: "Image will be here."
  }
];


db.Flower.remove({}, function(err, flowers){
  if(err) {
    console.log('Error occurred in remove', err);
  } else {
    console.log('removed all flowers');

    // create new records based on the array flowers
    db.Flower.create(flowers, function(err, flowers){
      if (err) { return console.log('err', err); }
      console.log("created ", flowers.length, "flowers");
      process.exit();
    });
  }
});


// var new_campsite = {description: "Sharp rocks. Middle of nowhere."}

// db.Campsite.create(new_campsite, function(err, campsite){
//   if (err){
//     return console.log("Error:", err);
//   }

//   console.log("Created new campsite", campsite._id)
//   process.exit(); // we're all done! Exit the program.
// })
