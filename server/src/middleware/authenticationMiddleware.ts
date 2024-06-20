import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler'
import User from '../db/user';

export const authenticateUser = asyncHandler(async (req,res,next)=>{
    const token = req.cookies.userToken;
    console.log(token)
    if(token){
        try {
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            const userId = decoded.userId;
            req.user = await User.findById(userId).select('-password');
            next();
        } catch (error) {
            res.status(401);
            throw new Error('Unautherized user: Invalid token')
        }

    }else{
        res.status(401);
        throw new Error('Unautherized user: No token')
    }
})

