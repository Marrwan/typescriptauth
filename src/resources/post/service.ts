import postModel from './model';
import Post from './interface';

class PostService {
    public postModel = postModel;

    public async findAll(): Promise<Post[]> {
        return this.postModel.find().exec();
    }

    public async findOne(id: string): Promise<Post> {
        return this.postModel.findOne({ _id: id }).exec();
    }

    public async create(title: string, body: string): Promise<Post> {
        const post = await this.postModel.create({ title, body });
        await post.save();
        return post;
    }

    // public async update(id: string, post: Post): Promise<Post> {
    //     return this.postModel.findByIdAndUpdate(id, post).exec();
    // }

    // public async delete(id: string): Promise<Post> {
    //     return this.postModel.findByIdAndDelete(id).exec();
    // }
}

export default PostService;