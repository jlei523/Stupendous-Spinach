'use strict';
const express = require('express');
const router = express.Router();
const PhotosCrontoller = require('../controllers').Photos;


router.post('/imageUpload', (req, res) => {
  
  const { url } = req.body;
  const { latitude, longitude } = req.body.location;
  
  //save url, lat, long to database
  //todo: include profile id
  PhotosCrontoller.savePhoto({ 'latitude': latitude, 'longitude': longitude, 'url': url}, req, res);

});


router.post('/nearbyPhotos', (req, res) => {

  PhotosCrontoller.getNearbyPohotos(req.body.location)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((data) => {
      //send empty object if error
      res.status(400).send([]);
    });
});




module.exports = router;
