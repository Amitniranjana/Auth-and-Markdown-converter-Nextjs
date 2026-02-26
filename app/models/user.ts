import mongoose from 'mongoose';

const { Schema } = mongoose;

// 1. Define the Schema (Standard naming is 'userSchema')
const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  phone:{
    type:Number
  },
  pincode:String,
  city:String,

});

// 2. Create the Model
// Check if the model already exists (to prevent "OverwriteModelError" in Next.js hot-reloading)
// If it doesn't exist, create a new one using mongoose.model()
const User = mongoose.models.User || mongoose.model('User', userSchema);

// 3. Export the Model
export default User;