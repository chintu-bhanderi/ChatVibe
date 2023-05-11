const express = require('express')
const app = express();   // express appication..
const dotenv = require('dotenv')

const databaseConnect = require('./config/database')
const authRouter = require('./routes/authRoute');
const messengerRoute = require('./routes/messengerRoute');
const friendRoute = require('./routes/friendRoute');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

dotenv.config({
     path : 'backend1/config/config.env'
})

app.use(bodyParser.json());
app.use(cookieParser());    
app.use('/api/messenger',authRouter);
app.use('/api/messenger',messengerRoute);
app.use('/api/friend',friendRoute);

const PORT = process.env.PORT || 5000;

app.get('/',(req,res)=>{
    res.send('This is backend server1');
})

databaseConnect();

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
});








