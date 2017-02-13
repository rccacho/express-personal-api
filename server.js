// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/************
 * DATABASE *
 ************/

var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function apiIndex(req, res) {
  // TODO: Document all your api endpoints below as a simple hardcoded JSON object. 
  res.json({
    message: "Welcome to my personal api! Here's what you need to know!",
    documentationUrl: "https://github.com/rccacho/express_personal_api/README.md", // CHANGE ME
    baseUrl: "https://warm-everglades-47438.herokuapp.com", // CHANGE ME
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data about me"}, // CHANGE ME
      {method: "GET", path: "/api/flowers", description: "Index of all flowers"},
      {method: "POST", path: "/api/flowers", description: "Add a new flower"},
      {method: "PUT", path: "/api/flowers/:id", description: "Edit and update info on an existing flower"},
      {method: "DELETE", path: "/api/flowers/:id", description: "Delete an existing flower"}
    ]
  })
});

app.get('/api/profile', function (req, res) {
  res.json({
  name: "Regelyn Cacho",
  githubLink: "https://github.com/rccacho",
  personalSiteLink: "https://rccacho.github.io/", 
  currentCity: "Alameda",
  favoriteColor: "red",
  otherOccupations: ["Sunday School Teacher", "Floral Designer"]
 });
});

//get all flowers --SOMETHING IS NOT WORKING! FLOWERS NOT RENDERING ON WEBPAGE
app.get('/api/flowers', function (req, res) {
  db.Flower.find(function(err, flowers) {
    if (err) { return console.log("index error: " + err); }
    res.json(flowers);
  });
});


// get one flower
app.get('/api/flowers/:id', function (req, res) {
  db.Flowers.findOne({_id: req.params.id }, function(err, data) {
    res.json(data);
  });
});

// create new flower
app.post('/api/flowers', function (req, res) {
  // create new flower with form data (`req.body`)
  console.log('flowers create', req.body);
  var newFlower = new db.Flower(req.body);
  newFlower.save(function handleDBFlowerSaved(err, savedFlower) {
    res.json(savedFlower);
  });
});

// delete flower
app.delete('/api/flowers/:id', function (req, res) {
  // get flower id from url params (`req.params`)
  console.log('flowers delete', req.params);
  var flowerId = req.params.id;
  // find the index of the flower we want to remove
  db.Flower.findOneAndRemove({ _id: flowerId }, function (err, deletedFlower) {
    res.json(deletedFlower);
  });
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
