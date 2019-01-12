import mongoose from 'mongoose';

const { Schema } = mongoose;

const commentSchema = new Schema({
    owner: {
        type: String,
        required: true,
        default: 'anon'
    },
    text: {
        type: String,
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    },
    children: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    dateJoined: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateCreated: {
        type: Date,
        required: true,
        default: Date.now
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;