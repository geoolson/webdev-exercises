// Enter your code here
const express = require('express');
const app = express();
const fs = require('fs');
const port = 8080;
const indexPage = fs.readFileSync('index.html', 'utf8');

app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) =>{
    res.send(indexPage);
})

app.post('/submit', (req, res) => {
    const { name, email, comments } = req.body;
    res.send(`
    <html lang="en">
        <head>
            <title>Form Response</title>
        </head>
        <body>
            name: ${name} <br>
            email: ${email} <br>
            comments: ${comments}
        </body>
    </html>`);
});

app.listen(port, () => console.log(`listening on port: ${port}`));
