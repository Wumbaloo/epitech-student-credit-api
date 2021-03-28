const https = require('https');
const pdf = require('pdf-parse');
const Admin = require('../models/admin');
const jwt = require("jsonwebtoken");

exports.getUserCookie = (autologin) => {
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
                    reject("Can't get the user token. Please check your autologin.");
            });
        }).on('error', (err) => {
                reject("Can't get the user token. Please check your autologin.");
        });
    });
    return (promise);
};

exports.getAuthor = async (dataBuffer) => {
    let data = await pdf(dataBuffer);

    if (!data)
        return (null);
    let array = data.text.split('\n');
    let author = array[array.length - 1].split(' ');
    author = author[1] + ' ' + author[0].substr(0, author[0].length - 1);
    return (author);
};

exports.formatDate = (date) => {
    if (date.indexOf('-') != 2)
        return ("Bad date format. Please enter a date formatted like this: 02-11-2020");
    split = date.split('-')
    newDate = split[2] + "-" + split[1] + "-" + split[0]
    return (newDate)
}

exports.processStudent = async (result, dataBuffer) => {
    const codeRegex = /[a-zA-Z]-[a-zA-Z]{3}-\d\d\d/gm;

    let data = await pdf(dataBuffer);
    if (!data)
        return (null);
    let array = data.text.split('\n');
    let newArray = [];
    array.forEach(element => {
        if (element.length >= 3 && !isNaN(Number(element.substr(0, 3)))) {
            let previousStr = newArray[newArray.length - 1];
            newArray[newArray.length - 1] = previousStr += element.trim();
        } else
            newArray.push(element.trim());
    });
    // let modules = [];
    let author = newArray[newArray.length - 1].split(' ');
    author = author[1] + ' ' + author[0].substr(0, author[0].length - 1);
    newArray.forEach(element => {
        if (element.split('-').length >= 4) {
            let split = element.split(' ');
            let codeModule = "";
            let credits = 0;
            split.forEach(string => {
                if (string.match(codeRegex)) {
                    codeModule = string;
                } else if (!isNaN(Number(string.trim())))
                    credits = Number(string);
            });
            result.push([ author, codeModule, credits ]);
        }
    });
    return (result);
}

exports.getUserByToken = async (token) => {
    if (!token)
        return {success: false, data: { statusCode: 401, message: "Access denied, Bearer token is missing!" } };
    else {
        const split = token.split(' ');
        if (split[0].toLowerCase() !== "bearer")
            token = split[0];
        else
            token = split[1];
        console.log(token);
        try {
            let { user } = jwt.verify(token, 'epi-planner_TOKEN_SECRET');
            user = await Admin.findByPk(user.id);
            if (user)
                return {success: true, data: user};
            else
                return {success: false, data: { statusCode: 404, message: "Cannot find user" }};
        } catch (e) {
            return {success: false, data: { statusCode: 401, message: "Please log in again. Token is invalid" } };
        }
    }
}
