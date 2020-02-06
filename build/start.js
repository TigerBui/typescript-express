"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = express_1.default();
const port = 4500;
app.set('views', path_1.default.join(__dirname, "../public"));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express_1.default.static("public"));
app.get('/*', (req, res) => {
    res.render('index');
});
app.listen(port, err => {
    if (err) {
        return console.error(err);
    }
    return console.log(`server is listening on ${port}`);
});
//# sourceMappingURL=start.js.map