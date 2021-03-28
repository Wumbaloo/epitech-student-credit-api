const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

const { getAuthor, processStudent } = require('./useful');

exports.uploadRedoublantFile = async (req, res) => {
    if (!req.files) {
        res.json({ error: true, message: "Please upload a valid file "});
        return;
    }
    try {
        for (const file in req.files) {
            let author = await getAuthor(req.files[file].data);
            author = author.replace(/\W/g, '');
            req.files[file].mv('./redoublants/' + author + '.pdf');
        }
        res.json({ success: true, message: "Student uploaded successfully" });
    } catch (e) {
        res.status(500).json({ error: true, message: "An error occurred." });
    }
};

exports.getAllRedoublants = (req, res) => {
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
};

exports.deleteRedoublant = (req, res) => {
    if (!req.params.name)
        return res.status(500).json({ error: true, message: "No name provided." });
    try {
        fs.unlinkSync(path.join(__dirname, 'redoublants/' + req.params.name));
        res.json({ success: true, message: "Successfully deleted." });
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
};

exports.getRedoublantsExcel = (req, res) => {
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
};
