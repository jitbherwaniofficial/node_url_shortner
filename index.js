const express = require('express');
const URL = require('./model/url')
const app = express();
const path = require('path')
const staticRoute = require('./routes/static_router')
const urlRoute = require('./routes/url')
const userRoute = require('./routes/user');
const cookieParser = require('cookie-parser');

const {connectToMongoDB} = require('./connect');
const { restrictToLoggedinUserOnly, checkAuth, checkForAuthentication, restrictTo } = require('./middlewares/auth');

require('dotenv/config');

const port = process.env.PORT || 3000;
const api = process.env.API

connectToMongoDB(process.env.CONNECTION_STRING).then(() => {
    console.log('DATABASE CONNECTED');
}).catch((err) => {
    console.log('ERROR', err);
})

app.set('view engine', "ejs");
app.set('views', path.resolve('./views'))

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(checkForAuthentication)

app.use('/url',restrictTo(["NORMAL"]),urlRoute);
app.use('/user', userRoute)
app.use('/',staticRoute);


app.get('/:shortId',async(req,res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {$push: {
        visitHistory: {
            timestamp: Date.now()
        }
    }}
    );
    res.redirect(entry.redirectURL)
})


app.listen(port, () => {
    console.log(`App Running on Port: ${port}`);
})