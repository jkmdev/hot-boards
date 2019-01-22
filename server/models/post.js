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
        type: Schema.ObjectId,
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

postSchema.set('toObject', { virtuals: true });
postSchema.set('toJSON', { virtuals: true });

postSchema
    .virtual('score')
    .get(function() {  
        var currentDays = Date.now() / (1000 * 60 * 60 * 24);
        var activeDays = new Date(this.dateCreated).getTime() / (1000 * 60 * 60 * 24);
        var ageInDays = currentDays - activeDays;
        var lastValidDay = currentDays - activeDays - 7;
        var sinceLastValidDay = ageInDays - lastValidDay;
        return Math.round((this.comments.length + 7) - sinceLastValidDay);
    });

const Post = mongoose.model('Post', postSchema);
export default Post;