import { Schema, model } from "mongoose";


const postSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    description: {
        type: String,
        maxlength: [500, 'Post description should not exceed 500 characters.'],
    },
    img: {type: String,
        required: [true, 'Post image is required']},
    likes: {
        type: Array,
        default: []
    }
}, {
    timestamps: true,
});

export default model('Post', postSchema);