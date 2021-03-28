const ExcelJS = require('exceljs');

const { queryIntra } = require('./intranet');

exports.retrievePlanning = async (req, res) => {
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
};