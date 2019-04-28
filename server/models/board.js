
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const { Schema } = mongoose;

const boardSchema = new Schema({

  _id: mongoose.Schema.Types.ObjectId,
  creator: {
    type: Schema.ObjectId,
    ref: 'User',
    default: new mongoose.Types.ObjectId('5c32b161aeedda761dacf8a8'),
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    default: 'Add board description here.',
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  }],
  dateCreated: {
    type: Date,
    required: true,
    default: Date.now,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },

});

// Write some encryption for Password

boardSchema.plugin(uniqueValidator);
const Board = mongoose.model('Board', boardSchema);

export default Board;
