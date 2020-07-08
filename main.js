var express = require('express'); 
var cors = require('cors');
const https = require('https');

var hostname = 'localhost'; 
var port = 3000; 
var baseURL = 'intra.epitech.eu'; 

var app = express(); 

app.use(cors());
 
var router = express.Router(); 
 
function getUserCookie(autologin) {
    let promise = new Promise((resolve, reject) => {
        https.get(autologin, (resp) => {
            let data = '';

            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {
                if (resp.headers['set-cookie'] && resp.headers['set-cookie'].length > 1)
                    resolve(resp.headers['set-cookie'][1]);
                else
                    reject(Error("Can't get the user token. Please check your autologin."));
            });
        }).on('error', (err) => {
                reject(Error("Can't get the user token. Please check your autologin."));
        });
    });
    return (promise);
}

function queryIntra(autologin, apiPath) {
    let promise = new Promise((resolve, reject) => {
      getUserCookie(autologin).then((data) => {
        https.get({ hostname: baseURL, path: apiPath, headers : {
            Cookie: data
        }}, (resp) => {
            data = '';

            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {
                resolve(JSON.parse(data));
            })
        }).on('error', (err) => {
            reject(Error("Can't call the intra.epitech.eu API, please check the called path."));
        });
      }).catch((err) => {
        reject(err);
      })
    });
    return (promise);
}

router.route('/student/info')
.get((req, res) => {
    if (!req.headers['autologin']) {
        res.json({message: "Please provide an autologin", method: req.method, type: "error"});
        return;
    }
    queryIntra(req.headers['autologin'], '/user/?format=json')
    .then((data) => {
        queryIntra(req.headers['autologin'], '/user/' + data['login'] + '/print/?format=json')
        .then((data) => {
            res.json(data);
        }).catch((err) => {
            res.json({message: err, method: req.method, type: "error"});
        })
    }).catch((err) => {
        console.log("Err")
        res.json({message: err, method: req.method, type: "error"});
    });
});

router.route('/module/info/:code/:instance/:year')
.get((req, res) => {
    if (!req.params.code) {
        res.json({message: "Please provide a module code", method: req.method, type: "error"});
        return;
    }
    if (!req.params.instance) {
        res.json({message: "Please provide a module instance", method: req.method, type: "error"});
        return;
    }
    if (!req.params.year) {
        res.json({message: "Please provide a module year", method: req.method, type: "error"});
        return;
    }
    queryIntra(req.headers['autologin'], '/module/' + req.params.year + '/' + req.params.code + '/' + req.params.instance + '/?format=json')
    .then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});

app.use(router);
 
app.listen(port, hostname, function(){
	console.log("API is listening at http://"+ hostname +":"+port); 
});