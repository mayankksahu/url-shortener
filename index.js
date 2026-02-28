const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser')
const { connectToMongoDB } = require('./connect');
const { restrictToLoggedinUserOnly, checkAuth } = require('./middleware/auth')
const URL = require('./models/url');

const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRouter');
const userRoute = require('./routes/user');

const app = express();
const PORT = 8001;

connectToMongoDB('mongodb://localhost:27017/url_shortener').then(() =>
    console.log('Connected to MongoDB')
);

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



app.use('/url', restrictToLoggedinUserOnly, urlRoute);
app.use('/user', userRoute);
app.use('/', checkAuth,  staticRoute);

app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOne({ shortId: shortId });
    if (!entry) return res.status(404).json({ error: "Short URL not found" });

    await URL.updateOne(
        { shortId: shortId },
        {
            $push: {
                visitHistory: { timestamp: Date.now() },
            },
        }
    );

    return res.redirect(entry.redirectUrl); // small r
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})