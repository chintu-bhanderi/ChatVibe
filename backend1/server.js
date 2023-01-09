const express = require('express')
const app = express();   // express appication..
const dotenv = require('dotenv')

const databaseConnect = require('./config/database')
const authRouter = require('./routes/authRoute');

dotenv.config({
     path : 'backend1/config/config.env'
})

app.use('/api/messenger',authRouter);

const PORT = process.env.PORT || 5000;

app.get('/',(req,res)=>{
    res.send('This is backend server1');
})

databaseConnect();

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
});








