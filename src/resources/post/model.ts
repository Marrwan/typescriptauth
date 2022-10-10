import mongoose, {Schema} from 'mongoose';
import Post from './interface';
 
const PostSchema = new Schema({
    title: {type: String, required: true},
    body: {type: String, required: true},
    
}, {timestamps: true});

export default mongoose.model<Post>('Post', PostSchema);

