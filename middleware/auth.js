//deals authentication
const JWTKEY=""+process.env.REACT_APP_JWTKEY
import jwt from 'jsonwebtoken';
async function auth(req, res, next) {
    const token = req.header('Authorization');
    if (!token)
        return res.status(401).send('Access denied. No token provided.');
    try {
        const decoded = jwt.verify(token, JWTKEY);
        req.user = decoded;  
        next();
    }
    catch (ex) {
        res.status(400).send('Invalid token.');
    }
}

export default auth;
