const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const VehicleOwnerSchema = new Schema({
  number:{
    type: Number
  },
  vehicleNum:{
    type: String
  },
  customerNum:{
    type: String
  }
});

mongoose.model('vehicleowners', VehicleOwnerSchema);

