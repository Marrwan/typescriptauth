import userModel from './model';
import token from '../../utils/token';
import passwordValidator from 'password-validator';


class UserService {
public  userModel = userModel;
public token = token;
public schema = new passwordValidator();
public emailRegex : any = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

public isEmailValid(email: string) : boolean {
    if (email.length > 254) return false;

    var valid = this.emailRegex.test(email);
    if (!valid) return false;

    // Further checking of some things regex can't handle
    var parts = email.split("@");
    if (parts[0].length > 64) return false;

    var domainParts = parts[1].split(".");
    if (
      domainParts.some(function (part) {
        return part.length > 63;
      })
    )
      return false;

    return true;
  }
public async register(email : string, password : string, name: string, role : string  ) : Promise<string>{
    try {
        if(!email || !password || !name || !role){
            throw new Error('Please fill all the fields');
        }
        if(!this.isEmailValid(email)){
            throw new Error('Please enter a valid email');
        }
        const user = await this.userModel.findOne({email});
      
        
     if(user){
            throw new Error('User already exists');
        }

    this.schema
    .is()
    .min(8) // Minimum length 8
    .has()
    .uppercase() // Must have uppercase letters
    .has()
    .lowercase() // Must have lowercase letters
    .has()
    .symbols() // Must have symbols
    .has()
    .digits() // Must have digits
    .has()
    .not()
    .spaces();

    if(!this.schema.validate(password)){
      
        throw new Error('Please enter a valid password, "Password must be at least 8 characters long, must contain lowercase, uppercase, digits and symbols",');
    }else{
            const newUser = new this.userModel({email, password, name, role});
            await newUser.save();
            const token = await this.token.generateToken(newUser);
            return token;
        
    }

    } catch (error : any) {
        throw new Error(error.message);
    }
}

public async login(email : string, password : string) : Promise<string>{
    try {
        if (!email || !password)
            throw new Error("Please enter all fields");

    email = email.toLowerCase();

    const user = await userModel.findOne({ email });

    if (!user)
        throw new Error("User does not exist");
      
    const isMatch = await user.isPasswordMatch(password);

    if (!isMatch)
        throw new Error("Incorrect Password");
     
    const token = await this.token.generateToken(user);
    // const data = {user,token};
    // return data;
    return token;

    } catch (error : any) {
        throw new Error(error.message);
    }
}

public async getUser(token : any) : Promise<any>{
    try {
        const ver = await this.token.verifyToken(token);
        const user = await this.userModel.findById(ver.id);
        return user;

    } catch (error : any) {
        throw new Error(error.message);
    }
}
}

export default UserService;