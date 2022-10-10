import postModel from './model';
import Post from './interface';

class PostService {
    public postModel = postModel;

    public async findAll(): Promise<Post[]> {
        return this.postModel.find().exec();
    }

    public async findOne(id: any): Promise<Post> {
        const post : any = await this.postModel.find({ _id: id }).exec();
        return post;
    }

    public async create(title: string, body: string): Promise<Post> {
        const post = await this.postModel.create({ title, body });
        await post.save();
        return post;
    }

    public async update(id: string, title:string, body:string): Promise<Post> {
        const updatedPost : any= await this.postModel.findByIdAndUpdate(id, {title,body}, {new: true});
        return updatedPost;
    }

    public  delete(id: string): void{
        this.postModel.findByIdAndDelete(id).exec();
    }
}

export default PostService;