const models = require('../../db/models');
const utils = require('./lib/utils.js');

module.exports.savePhoto = (options, req, res) => {

  return models.Photo.forge(options).save()
    .then(() => {
      //upon success, send URL back to client
      res.status(201).send(options.url);
    })
    .catch(() => {
      res.status(500).send("Sorry, your photo failed to uploaded");
    });
};

module.exports.getNearbyPohotos = (currentlocation) => {


  return models.Photo.fetchAll()
    .then((data) => {
      return utils.filterByDistance(data.models, currentlocation);
    });
    

};


//how to insert data:

// // Save with no arguments
// Model.forge({id: 5, firstName: "John", lastName: "Smith"}).save().then(function() { //...

// // Or add attributes during save
// Model.forge({id: 5}).save({firstName: "John", lastName: "Smith"}).then(function() { //...

// // Or, if you prefer, for a single attribute
// Model.forge({id: 5}).save('name', 'John Smith').then(function() { //...