const express = require('express');
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const ExcelJS = require('exceljs');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const path = require('path');
const pdf = require('pdf-parse');

const baseURL = 'intra.epitech.eu';

const app = express();

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};

app.use(fileUpload({
    createParentPath: true
}));
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const router = express.Router();

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
                    reject("Can't get the user token. Please check your autologin.");
            });
        }).on('error', (err) => {
                reject("Can't get the user token. Please check your autologin.");
        });
    });
    return (promise);
}

function formatDate(date)
{
    if (date.indexOf('-') != 2)
        return ("Bad date format. Please enter a date formatted like this: 02-11-2020");
    split = date.split('-')
    newDate = split[2] + "-" + split[1] + "-" + split[0]
    return (newDate)
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
        res.json(err);
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

router.route('/planning/:start/:end')
.get(async (req, res) => {
    if (!req.params.start) {
        res.json({message: "Please provide a valid start date", method: req.method, type: "error"});
        return;
    }
    if (!req.params.end) {
        res.json({message: "Please provide a valid end date", method: req.method, type: "error"});
        return;
    }
    let start = req.params.start;
    let end = req.params.end;
    let filename = "plannings/Planning - " + req.params.start + ".xlsx";
    let workbook = new ExcelJS.Workbook();
    workbook.creator = "Willy";
    let worksheet = workbook.addWorksheet("Planning");
    let data = [];

    await queryIntra(req.headers['autologin'] || 'https://intra.epitech.eu/auth-6b8ac5b518f5efc42fdc2a9a3f665ba209078a35', '/planning/load?format=json&start=' + start + '&end=' + end)
    .then((planning) => {
        if (planning.error) {
            res.json({error: true, message: planning.error});
            return;
        }
        planning.sort((a, b) => {
            return (new Date(a.start).getTime() - new Date(b.start).getTime())
        });
        planning.forEach((planning, index) => {
            if (planning['codemodule'][0] != "M" &&
                planning['codemodule'] != 'B-CON-000' &&
                planning['codemodule'][0] != 'W'
                ) {
                let spaceSplit = planning['start'].split(' ');
                let split = spaceSplit[0].split('-');
                let date = split[2] + "/" + split[1] + "/" + split[0];
                let hours = spaceSplit[1].slice(0, -3) + " - " + planning['end'].split(' ')[1].slice(0, -3);
                data.push([date, hours, planning['acti_title'], planning['codemodule']]);
            }
        });
    }).catch((err) => {
        res.json(err);
    });
    worksheet.addTable({
        name: "Planning du " + req.params.start.replace('-', '/') + " au " + req.params.end.replace('-', '/'),
        ref: 'A1',
        style: {
          theme: 'TableStyleLight1',
          showRowStripes: true,
        },
        columns: [
            { name: 'Date', filterButton: true },
            { name: 'Horaires', filterButton: true },
            { name: 'Title', filterButton: true },
            { name: 'Module', filterButton: true }
        ],
        rows: data
    });
    worksheet.columns.forEach(function (column, i) {
        var maxLength = 0;
        column["eachCell"]({ includeEmpty: true }, function (cell) {
            var columnLength = cell.value ? cell.value.toString().length : 15
            if (columnLength > maxLength ) {
                maxLength = columnLength;
            }
        });
        column.width = maxLength < 15 ? 15 : maxLength;
    });
    try {
        await workbook.xlsx.writeFile(filename);
        const file = `${__dirname}/${filename}`;
        res.download(file);
    } catch (error) {
        res.json({ error: true, message: "An error occured. Please contact William GAUDFRIN."});
    }
});

router.route('/redoublants')
.post((req, res) => {
    console.log(req.files);
    let studentsFile = req.files.students;

    if (!req.files) {
        res.json({ error: true, message: "Please upload a valid file "});
        return;
    }
    try {
        studentsFile.forEach(file => {
            file.mv('./redoublants/' + file.name);
        });
        res.json({ success: true, message: "Student uploaded successfully" });
    } catch (e) {
        res.status(500).json({ error: true, message: "An error occurred." });
    }
});

async function getAuthor(dataBuffer)
{
    let data = await pdf(dataBuffer);

    if (!data)
        return (null);
    let array = data.text.split('\n');
    let author = array[array.length - 1].split(' ');
    author = author[1] + ' ' + author[0].substr(0, author[0].length - 1);
    return (author);
}

router.route('/redoublants')
.get((req, res) => {
    fs.readdir(path.join(__dirname, 'redoublants'), async (err, files) => {
        let students = [];

        if (err)
            return res.status(500).json({ error: true, message: "Unable to scan directory: " + err});
        for (const file in files) {
            if (files[file].indexOf('.pdf') === -1)
                continue;
            let dataBuffer = fs.readFileSync(path.join(__dirname, 'redoublants/' + files[file]));
            let author = await getAuthor(dataBuffer);
            if (author)
                students.push({ name: author, filename: files[file] });
            // students.push(students);
        };
        res.json({ success: true, data: students });
    })
});

router.route('/redoublants/:name')
.delete((req, res) => {
    if (!req.params.name)
        return res.status(500).json({ error: true, message: "No name provided." });
    try {
        fs.unlinkSync(path.join(__dirname, 'redoublants/' + req.params.name));
        res.json({ success: true, message: "Successfully deleted." });
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
});

async function processStudent(result, dataBuffer)
{
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

router.route('/redoublants/retrieve')
.get((req, res) => {
    let students = [];

    fs.readdir(path.join(__dirname, 'redoublants'), async (err, files) => {
        for (const file in files) {
            if (files[file].indexOf('.pdf') === -1)
                continue;
            let dataBuffer = fs.readFileSync(path.join(__dirname, 'redoublants/' + files[file]));
            students = await processStudent(students, dataBuffer);
            if (!students) {
                res.status(500).json({ error: true, message: "An error occurred." });
                return;
            }
            // students.push(students);
        };
        let filename = "redoublants/Liste des remises à niveau.xlsx";
        let workbook = new ExcelJS.Workbook();
        workbook.creator = "Willy";
        let worksheet = workbook.addWorksheet("Étudiants");

        worksheet.addTable({
            name: "Liste des remises à niveau",
            ref: 'A1',
            style: {
              theme: 'TableStyleLight1',
              showRowStripes: true,
            },
            columns: [
                { name: 'Login', filterButton: true },
                { name: 'Module', filterButton: true },
                { name: 'Crédits', filterButton: true }
            ],
            rows: students
        });
        worksheet.columns.forEach(function (column, i) {
            var maxLength = 0;
            column["eachCell"]({ includeEmpty: true }, function (cell) {
                var columnLength = cell.value ? cell.value.toString().length : 20
                if (columnLength > maxLength ) {
                    maxLength = columnLength;
                }
            });
            column.width = maxLength < 20 ? 20 : maxLength;
        });
        try {
            await workbook.xlsx.writeFile(filename);
            const file = `${__dirname}/${filename}`;
            res.download(file);
        } catch (error) {
            res.json({ error: true, message: "An error occured. Please contact William GAUDFRIN."});
        }
    });
})

app.use(router);

app.listen(3000, "localhost", function(){
// app.listen(process.env.PORT, process.env.IP, function(){
    console.log("API is listening at http://"+ process.env.IP +":"+process.env.PORT);
});
