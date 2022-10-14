import {Schema,model} from 'mongoose';
import bcrypt from 'bcrypt';
import User from './interface';

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, required: true, default: 'user'},
}, {timestamps: true});

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
})

userSchema.methods.isPasswordMatch = async function(password: string) {
   
    return await bcrypt.compare(password, this.password);
}

export default model<User>('User', userSchema);