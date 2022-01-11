const express=require('express');
const path=require('path');
const { engine } = require('express-handlebars');
const app=express();
const PORT =process.env.PORT || 5000;

const members =require('./Members');

app.get('/',(req,res) => {

    //res.send("<h1>Hello World</h1>");
    console.log(__dirname);
    res.sendFile(path.join(__dirname,'public','index.html'));
    //console.log("Hello World");

});

//create static folder 
app.use(express.static(path.join(__dirname,'public')));

//exprt from the router (member API routes)
app.use('/api/members',require('./Routes/API/Members'));

app.use(express.json()); // body pass middleware for raw JSON
app.use(express.urlencoded({extended:false}));// for form data
//app.use(express.bodyParser());


//handlebars  middleware
app.engine('handlebars', engine({ extname: '.hbs', defaultLayout: "main"}));
app.set('view engine', 'handlebars');
//app.set("views", "./views");
app.get('/handlers/',(req,res) => res.render('index',{
    title:"Members App",
    members
}));

//creating a log of the requests made - middleware
const logger=(req,res,next) => {
console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
next();
};


app.use(logger); //init middleware


app.listen(PORT,() => console.log('Server Connection Established'));
