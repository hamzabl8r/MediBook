const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
  name: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true 
  },
  dateofBirth: {
    type: Date,
    }, 
    isDoctor :{
      type : Boolean,
      default : false
    },
    specialty: {
    type: String
  },
  address: {
    type: String
  },
    
}); 
 
module.exports = mongoose.model("User", userSchema);
 