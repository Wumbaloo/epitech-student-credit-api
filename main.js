const cors = require('cors');
const express = require('express');
const fileUpload = require('express-fileupload');
const https = require('https');

const router = require('./routes/index');
const sequelize = require('./database/sequelize');

require('./models/relationships');

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};

const app = express();
const ip = !process.env.DEVELOPMENT && process.env.IP ? process.env.IP : 'localhost'
const port = !process.env.DEVELOPMENT && process.env.PORT ? process.env.PORT : 3000

app.use(fileUpload({
    createParentPath: true
}));
router.route('/')
.get((req, res) => {
    res.json({ success: true, message: "Hey there! The API is working properly." });
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));
app.use(router);
app.set('json spaces', 2);

app.listen(port, ip, async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        // require('./models/initialize').initialize();
        console.log('Connection has been established successfully.');
        console.log('Server started on: ' + port);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
    console.log("API is listening at http://"+ ip +":"+port);
});