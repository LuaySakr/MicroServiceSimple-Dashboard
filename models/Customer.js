const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Create Schema
const CustomerSchema = new Schema({
  number:{
    type: Number
  },
  name:{
    type: String
  },
  adrs:{
    type: String
  }
});
mongoose.model('customers', CustomerSchema);