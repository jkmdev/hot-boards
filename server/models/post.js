import mongoose from 'mongoose';

const { Schema } = mongoose;

const postSchema = new Schema({
  // _id: Schema.ObjectId,
  owner: {
    type: Schema.ObjectId,
    ref: 'User',
    default: new mongoose.Types.ObjectId('5c32b161aeedda761dacf8a8'),
  },
  boardTitle: {
    type: String,
    default: 'General',
  },
  title: {
    type: String,
    required: true,
  },
  contentType: {
    type: String,
    default: 'text',
  },
  content: {
    type: String,
    required: true,
  },
  comments: [{
    type: Schema.ObjectId,
    ref: 'Comment',
  }],
  clicks: {
    type: Number,
    default: 0,
  },
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

postSchema.set('toObject', { virtuals: true });
postSchema.set('toJSON', { virtuals: true });

postSchema
  .virtual('score')
  .get(() => {
    if (this) {
      const currentDays = Date.now() / (1000 * 60 * 60 * 24);
      const activeDays = new Date(this.dateCreated).getTime() / (1000 * 60 * 60 * 24);
      const ageInDays = currentDays - activeDays;
      const lastValidDay = currentDays - activeDays - 7;
      const sinceLastValidDay = ageInDays - lastValidDay;
      return Math.round((this.comments.length + 7) - sinceLastValidDay);
    }
    return 0;
  });

const Post = mongoose.model('Post', postSchema);
export default Post;
