import User from '../models/user.model.js';

const cookieOptions = {
    maxAge: 7*24*60*60*1000,
    httpOnly: true,
    // secure: process.env.NODE_ENV === 'production' ? true : false,
    // sameSite:'None',
    // secure: true

}
const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, error: 'Email already exists' });
    }

    const user = new User({ email, password });
    await user.save();

   const token = await user.generateJWTtoken()
res.cookie('token' ,token ,cookieOptions)


res.status(200).json({
    success: true,
    message:'user registered successfully',
    user,
})

  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
 
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({success: false, error: 'Invalid credentials' });
    }
    user.password = undefined
  const token = await user.generateJWTtoken()
res.cookie('token' ,token ,cookieOptions)


res.status(200).json({
    success: true,
    message:'user login successfully',
    user,
})
  } catch (error) {
    next(error);
  }
};


const logout = (req,res) =>{

res.cookie('token' ,null ,{
    secure:true,
    maxAge:0,
    httpOnly:true
})

res.status(200).json({
    success:true,
    message:'User Logout Successfully'

})

}

export { register, login,logout };