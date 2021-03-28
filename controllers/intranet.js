const https = require('https');

const { getUserCookie } = require('./useful');

const baseURL = 'intra.epitech.eu';

exports.queryIntra = (autologin, apiPath) => {
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
                let answer = JSON.parse(data);
                if (answer['studentyear'] > 3)
                    reject("Sorry, your scolar year is not managed by this platform. You're to skilled.");
                else {
                    resolve(answer);
                }
            })
        }).on('error', (err) => {
            reject("Can't call the intra.epitech.eu API, please check the called path.");
        });
      }).catch((err) => {
        reject({message: err, error: "error"});
      })
    });
    return (promise);
};
