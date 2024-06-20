import jwt from 'jsonwebtoken';

export const generateToken = (res:any,userId:any)=>{
    const token =jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:'1hr'
    })

    res.cookie('userToken',token,{
        httpOnly:true,
        secure: false,
        sameSite:'strict',
        maxAge: 1 * 60 * 60 * 1000
    })
    return token;
}