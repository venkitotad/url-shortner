import { validateUserToken } from "../utils/token.js";

export function authMiddleware(req, res, next){
    const authHeader = req.headers['authorization'];
    
    if(!authHeader){
        return next();
    }
    
    if(!authHeader.startsWith('Bearer')){
        return res.status(401).json({error:`auth header error`});
    }

    const [_, token] = authHeader.split(' ')
    
    const payload = validateUserToken(token);
    
    req.user = payload;
    
    next();
    
}