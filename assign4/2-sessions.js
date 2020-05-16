// Enter your code here
const express = require('express');
const app = express();
const session = require('express-session');
const port = 5000;

app.use(express.urlencoded({extended: true}));
app.use(session({secret: "session", resave: false, saveUninitialized: true}));

app.get('/favicon.ico', (req, res)=> res.end());
app.get('/*', (req, res) =>{
    let message = '';
    let previousRoutes = '';
    if(!req.session.path){
        req.session.path = {}
        message = `<br>Welcome to http://localhost:${port}/`;
    }
    req.session.path[req.path] = true;
    const paths = Object.keys(req.session.path);
    if(paths.length > 1){
        previousRoutes = `<br>Previously visited:<br>${
            paths
                .filter(path => path !== req.path)
                .reduce((acc, curr)=>`${acc}&emsp;${curr}<br>`, '')
        }`;
    }
    res.send(`Currently on route: ${req.path}${message}${previousRoutes}`);
});

app.listen(port, () => console.log(`listening on port: ${port}`));
