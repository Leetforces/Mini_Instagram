import  mongoose from 'mongoose';
const {Schema} =mongoose;
const {ObjectId} =mongoose.Schema.Types;
import bcrypt from 'bcryptjs';
import validator from 'validator';

const userSchema= new Schema({
    name:{
        type: String,
        trim: true,
        required: "Name is required",
        min:2,
        max:20,
    },
    email:{
        type:String,
        trim: true,
        required:"Email is required",
        unique: true,
        validate(value){
            if(!validator.isEmail(value))
            {
                throw new Error("Email is not Valid");
            }
        }
    },
    password:{
        type: String,
        required: true,
    },
    followers:[{
        type:ObjectId,
        ref:"User",
    }],
    following:[{
        type:ObjectId,
        ref:"User",
    }],
    picUrl:{
        type:String,
        default:"https://st3.depositphotos.com/3581215/18899/v/600/depositphotos_188994514-stock-illustration-vector-illustration-male-silhouette-profile.jpg",
    }
    
},{timestamps:true});

userSchema.pre("save",function(next){
    let user=this;
    if(user.isModified('password')){
        return bcrypt.hash(user.password,12,function(error,hash){
            if(error)
            {
                console.log(error);
                return next(error);
            }
            user.password =hash;
            return next();
            
        })
    }
    else{
        return next();

    }
});


 
userSchema.methods.comparePassword =function(password,next){
    bcrypt.compare(password,this.password,function(err,match){
        if(err){
            console.log("COMPARE PASSWORD ERR",err);
            return next(err,false);
        }
        return next(null,match); 

    });
};


// here user is a collection
export default mongoose.model("User",userSchema);