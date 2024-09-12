const express = require('express');
const app = express();
const authenticateToken = require('./path-to-middleware/authenticateToken');


app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.locals.user });
});


app.listen(3000, () => {
    console.log('Server running on port 3000');
});