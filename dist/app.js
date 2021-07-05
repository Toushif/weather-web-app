"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const hbs_1 = __importDefault(require("hbs"));
const path = __importStar(require("path"));
const forcast_1 = __importDefault(require("./utils/forcast"));
const geocode_1 = __importDefault(require("./utils/geocode"));
// console.log(__dirname) //this prints the entire folder of your destination or outDir folder, i.e, dist or src which is configured in outDir in tsconfig.json, if tsconfig is not there then it is usually the src folder
// console.log(__filename) //this prints the entire filepath of your destination or outDir file, i.e, file inside dist or src which is configured in outDir in tsconfig.json
//normally we run nodemon dist/app.js which actually just checks for js file changes and re-compiles evrytime something is changed. Nut if we change other files like .hbs or some other extentions then nodemon wont pick it up. For that we need to run "nodemon dist/app.js e js,hbs" and like this we can provied all the extentions we need to check for changes
const app = express_1.default();
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsDirectory = path.join(__dirname, '../template/views'); //express will look into 'views' folder by default to render hbs(handlebars) templates. So if we use any other name other than views then it'll throw error. So for setting custom name we can set the path of the views folder (or whatever name we give - in our case it is templates) - we set the path for tat here.
const partialsPath = path.join(__dirname, '../template/partials');
//setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsDirectory); //here we set the custom folder name to 'template' renamed from 'views'
hbs_1.default.registerPartials(partialsPath); //here we set the partials path to hbs.registerPartial. Partials are liek components in angular or react, where we can dynamically insert chunks of views in templates 
app.use(express_1.default.static(publicDirectoryPath)); //Setup static directory/contents to serve
app.use(body_parser_1.json()); //here we always parse the data to json using json from body-parser
/* app.get('', (_, res: any) => { //this does not make any sense if you add 'app.use(express.static(publicDirectoryPath))' above, coz abnove that syntax serves the static file given in the path in the base url (thats what 'app.use(express.static(publicDirectoryPath))' does). So now here writing this app.get in baseurl wont make any sense.
    res.send('Helo express!!!!')
}) */
app.get('', (req, res) => {
    res.render('index', {
        title: 'Main',
        name: 'Toushif UL Haque'
    });
});
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Toushif UL Haque'
    });
});
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Toushif UL Haque',
        help: 'This is the help text'
    });
});
app.get('/weather', (req, res) => {
    //req,query is the is our req parameter which we send through the url follwed by question mark or through client end as rquenst params
    const query = req.query.address;
    if (!query) {
        //here you have to use return statement so that the execution stops, or else again Node will go to next res.send and again send data which is invaid and throw error
        return res.send({
            error: 'You must provide an address.'
        });
    }
    geocode_1.default(req.query.address, (error, data) => {
        if (error) {
            return res.send({
                error: error
            });
            return;
        }
        forcast_1.default(data === null || data === void 0 ? void 0 : data.lat, data === null || data === void 0 ? void 0 : data.lon, (error, forcast) => {
            if (error) {
                return res.send({
                    error: error
                });
                return;
            }
            res.send({
                forcast,
                location: (data === null || data === void 0 ? void 0 : data.loc) || query.charAt(0).toUpperCase() + query.slice(1),
                coordinates: data === null || data === void 0 ? void 0 : data.coordinates
            });
        });
    });
});
app.get('/help/*', (req, res) => {
    res.render('not-found', {
        title: '404',
        isSubPage: true,
        errMsg: 'help',
        name: 'Toushif UL Haque',
    });
});
app.get('*', (req, res) => {
    res.render('not-found', {
        title: '404',
        isSubPage: false,
        name: 'Toushif UL Haque',
    });
});
app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});
