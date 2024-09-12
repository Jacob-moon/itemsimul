const jwt = require('jsonwebtoken');


const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        req.user = null; 
        return next();
    }

    try {
        const decoded = jwt.verify(token, 'your_jwt_secret_key');
        req.user = decoded; 
        next();
    } catch (error) {
        return res.status(403).json({ message: '유효하지 않은 토큰입니다.' });
    }
};

app.use(authenticateToken); 
