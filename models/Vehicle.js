const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const VehicleSchema = new Schema({
  number:{
    type: Number
  },
  vehicleId:{
    type: String
  },
  regNum:{
    type: String
  }
});

mongoose.model('vehicles', VehicleSchema);

