import mongoose from 'mongoose';

const { Schema } = mongoose;

const postSchema = new Schema({
    //_id: Schema.ObjectId,
    owner: {
        type: Schema.ObjectId,
        ref: 'User',
        default: new mongoose.Types.ObjectId("5c32b161aeedda761dacf8a8")
    },
    boardTitle: {
        type: String,
        default: 'General'
    },
    title: {
        type: String,
        required: true
    },
    contentType: {
        type: String,
        default: 'text'
    },
    content: {
        type: String,
        required: true
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    clicks: {
        type: Number,
        default: 0
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

//Write some encryption for Password

postSchema
    .virtual('score', {
        ref: 'score',
        localField: 'score',
        foreignField: 'clicks'
    })
    .get(function() {  
        return this.clicks;
    });

postSchema.set('toObject', { virtuals: true });
postSchema.set('toJSON', { virtuals: true });

const Post = mongoose.model('Post', postSchema);
export default Post;