import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: [4, 'Username must be 4 characters or more.'],
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: [8, 'Username must be 8 characters or more.'],
  },
  dateJoined: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

// Write some encryption for Password

const User = mongoose.model('User', userSchema);
export default User;
