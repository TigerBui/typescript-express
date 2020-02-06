import express from 'express';
import path from "path";

const app = express();
const port = 4500;

app.set('views', path.join(__dirname, "../public"));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.static("public"));

app.get('/*', (req, res) => {
    res.render('index');
});

app.listen(port, err => {
    if (err) {
        return console.error(err);
    }
    return console.log(`server is listening on ${port}`);
});
