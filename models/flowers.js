var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var FlowerSchema = new Schema({
  name: String,
  popularColors: Array,
  image: String
});

var Flower = mongoose.model('Flower', FlowerSchema);

module.exports = Flower;