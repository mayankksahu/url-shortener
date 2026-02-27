const express = require('express');
const { connectToMongoDB } = require('./connect');
const URL = require('./models/url');
const urlRoute = require('./routes/url');
const path=require('path');
const staticRoute=require('./routes/staticRouter');

const app = express();
const PORT = 8001;

app.set('view engine','ejs');
app.set('views',path.resolve('./views'));


app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/url', urlRoute);

app.use('/',staticRoute);

// app.get('/test',async (req,res)=>{
//     const allUrls=await URL.find({});
//     return res.render('home',{
//         urls:allUrls,
//     });
// })

app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;

    const entry = await URL.findOne({ shortId: shortId });

    // ✅ Important check
    if (!entry) {
        return res.status(404).json({ error: "Short URL not found" });
    }

    // visit history update
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

connectToMongoDB('mongodb://localhost:27017/url_shortener')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB', err);
    });



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})