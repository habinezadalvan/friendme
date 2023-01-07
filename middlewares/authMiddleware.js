import jwt from 'jsonwebtoken';

export const userAuth = async (req, res, next) => {
    const token = req.cookies.jwt;
    if(!token) return res.status(401).json({message: `You're not authorized.`});
    try{
        const decodeToken = await jwt.verify(token, process.env.SECRET_KEY);
        if(!decodeToken) return res.status(401).json({message: `You're not authorized.`});

        req.userId = decodeToken.id
        return next();

    }catch(err){
        console.log(err);
        return res.status(500).json({message: 'Sorry, there is a server error.'})
    }
}
