const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const userRoutes = require('./routes/user.routes')
const cookieParser = require('cookie-parser');
const captainRoutes = require('./routes/caption.routes');

require('dotenv').config();



const PORT = process.env.PORT || 3000;



app.get('/',(req,res) => {
    res.send('hello world');

});
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/users',userRoutes);
app.use('/captions', captainRoutes);



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

require('./config/db').connectDB();
module.exports = app;