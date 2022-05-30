const express = require('express');
const Drone = require('../models/Drone.model');
const router = express.Router();

// require the Drone model here

router.get('/drones', (req, res, next) => {
  // Iteration #2: List the drones
 Drone.find()
  .then ((listDrones) => {
    res.render('drones/list', {listDrones})
  })
});

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  res.render('drones/create-form')
});

router.post('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  Drone.create(req.body)
  .then(() => {
    res.redirect('/drones')
  })
  .catch((err) => {
    console.error("Error creating Drone: ", err);
    res.render('drones/create-form')
  })
});

router.get('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  Drone.findById(req.params.id)
  .then ((toUpdateDrone) => {
    res.render('drones/update-form', {toUpdateDrone})
  })
});

router.post('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  Drone.findByIdAndUpdate(req.params.id, req.body)
  .then (() => {
    res.redirect('/drones')
  })
  .catch((err) => {
    console.error("Error updating Drone: ", err);
    res.render('drones/update-form')
  })
});

router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  Drone.findByIdAndDelete(req.params.id)
  .then (() => {
    res.redirect('/drones')
  })
});

module.exports = router;
