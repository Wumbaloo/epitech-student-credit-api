const { queryIntra } = require('./intranet');

exports.getModuleInfo = (req, res) => {
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
    return queryIntra(req.headers['autologin'], '/module/' + req.params.year + '/' + req.params.code + '/' + req.params.instance + '/?format=json')
    .then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
};