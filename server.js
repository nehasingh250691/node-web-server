const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () =>{
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (message) =>{
    return message.toUpperCase();
})
app.set('view engine', 'hbs');
// app.use((req,res,next) => {
//     res.render('maintainance.hbs');
// });
app.use((req,res,next) => {
    var log = `${new Date().toString()}: ${req.method} ${req.path} `;
    console.log(log);
    fs.appendFile('server.log',log,(err) => {
        if(err)
            console.log(err);
    })
    next();
});
app.use(express.static(__dirname+'/public'))

app.get('/', (req,res) => {
    // res.send('Hello Express!');
    res.render('home.hbs', {
        pageTitle:'Home Page',
        message: 'Welcome to this website'
    })
});
app.get('/projects', (req,res) => {
    res.render('projects.hbs',{
        pageTitle: 'Project Page'
    })
});
app.get('/about', (req,res) =>{
    // res.send({
    //     about: 'About Page'
    // })
    res.render('about.hbs', {
        pageTitle:'About Page'
    });
});

app.listen(port,() => {
    console.log(`Server is up on port ${port} !`);
});