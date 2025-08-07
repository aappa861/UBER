const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();


app.get('/',(req,res) => {
    res.send('hello world');

});

app.listen(3000, () => {
    console.log('Server is running on port 3000');});
module.exports = app;