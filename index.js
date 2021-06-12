const express = require('express');
const app = express();
const data = require('./data.json');
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')))
//we no need to require the ejs because express will require it for us behind the scene
app.set('view engine', 'ejs');

// renders a view and sends the rendered HTML string to the client
// the default is: whenever we call res.render --> it will look for the views directory
app.get('/', (req, res) => {
    res.render('home.ejs');
})

app.get('/r/:subreddit', (req, res) => {
    const {subreddit}= req.params;
    const returnData = data[subreddit];
    if (returnData) {
        res.render('subreddit.ejs', {...returnData});
    } else {
        res.render('notfound.ejs');
    }

})

app.get('/random', (req, res) => {
    const num = Math.floor(Math.random() * 10);
    res.render('random.ejs', {num})
})

app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000")
})