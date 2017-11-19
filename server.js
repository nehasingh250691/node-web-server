const express = require('express');
const hbs = require('hbs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
// app.use((req,res,next) => {
//     res.render('maintainance.hbs');
// });
app.use(express.static(__dirname+'/public'))


app.get('/', (req,res) => {
    // res.send('Hello Express!');
    res.render('Home.hbs', {
        pageTitle:'Home Page',
        message: 'Welcome to this website',
        currentYear: new Date().getFullYear()
    })
});

app.get('/about', (req,res) =>{
    // res.send({
    //     about: 'About Page'
    // })
    res.render('about.hbs', {
        pageTitle:'About Page',
        currentYear: new Date().getFullYear()
    });
});

app.listen(port,() => {
    console.log(`Server is up on port ${port} !`);
});