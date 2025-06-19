import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true,select: false },
  createdAt: { type: Date, default: Date.now },
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods ={
    generateJWTtoken:  async function(){
        return await Jwt.sign(
            {
                id: this._id ,email: this.email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRY
            }
        )
    }
,
comparePassword: async function(plaintextPassword){

    return  await bcrypt.compare(plaintextPassword,this.password)
},

}


export default mongoose.model('User', userSchema);