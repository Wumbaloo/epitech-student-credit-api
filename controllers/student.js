const fs = require('fs');
const path = require('path');
const Enumerable = require('linq');

// const { redoublants } = require('../redoublants/liste');
const { queryIntra } = require('./intranet');
// const { processStudent } = require('./useful');
const HubActivity = require('../models/hubActivity');
const Redoublant = require('../models/redoublant');
const TekYear = require('../models/year');
const Module = require('../models/module');

const { getModuleInfo } = require('./module');

exports.getScore = (hubActivities, type_title, status, organize) => {
    for (let i = 0; i < hubActivities.length; i++) {
        let possiblesNames = hubActivities[i].possible_names.toLowerCase();
        if (!possiblesNames.includes(type_title.toLowerCase()))
            continue;
        else if (status === 'N/A')
            continue;
        if (!status || status === 'eat') {
            hubActivities[i].waiting++;
            return 'waiting';
        }
        if (status === 'present' || status === 'accept') {
            if (organize) {
                hubActivities[i].organizations_present;
                return hubActivities[i].organization_present_xp;
            }
            hubActivities[i].present++;
            return hubActivities[i].present_xp;
        } else {
            if (organize) {
                hubActivities[i].organizations_missing++;
                return -hubActivities[i].organization_missing_xp;
            }
            hubActivities[i].missing++;
            return -hubActivities[i].missing_xp;
        }
    }
};

exports.computeHubXP = async (hubActivities, autologin, login, scolaryear, instance) => {
    let result = {
        resps: [],
        activities: []
    };

    return queryIntra(autologin, '/module/' + scolaryear + '/B-INN-000/' + instance + '/?format=json')
    .then((data) => {
        let acti = data['activites'];

        result.resps = data['resp'];
        for (let i = 0; i < acti.length; i++) {
            for (let j = 0; j < acti[i]['events'].length; j++) {
                let organize = false;
                let score = 0;

                for (let k = 0; k < acti[i]['events'][j]['assistants'].length; k++) {
                    if (acti[i]['events'][j]['assistants'][k]['login'] === login) {
                        score = this.getScore(hubActivities, acti[i]['type_title'], acti[i]['events'][j]['assistants'][k]['manager_status'], true);
                        organize = true;
                        break;
                    }
                }
                if (!organize) {
                    if (acti[i]['events'][j]['already_register'])
                        score = this.getScore(hubActivities, acti[i]['type_title'], acti[i]['events'][j]['user_status'], false);
                }
                if (score !== 0)
                    result.activities.push({ title: acti[i]['title'], type: acti[i]['type_title'], waiting: score === 'waiting', organize, xp: (score !== 'waiting' ? score : 0) });
            }
        }
        return (result);
    }).catch((err) => {
        console.error(err);
        return (result);
    });
};

exports.getRoadblockModules = async (autologin, data, location, roadblock) => {
    let modules = [];
    let credits_obtains = 0;
    let credits_remains = 0;

    // for (let i = 0; i < data['modules'].length; i++) {
    //     let dataModule = data['modules'][i];
    //     let modules = roadblock.modules.filter(module =>
    //                 (dataModule.codemodule.includes(module.dataValues.code) || dataModule.codemodule.includes(module.dataValues.possible_codes))
    //                 && dataModule.codeinstance === (module.dataValues.instance.length === 3 ? location + module.dataValues.instance : module.dataValues.instance)
    //                 && dataModule.scolaryear === parseInt(data['scolaryear'])
    //     );
    //     if (modules.length === 0) {
    //         modules = await queryIntra(autologin, '/module/' + data['scolaryear'] + '/' + req.params.code + '/' + req.params.instance + '/?format=json');
    //     }
    //     roadblockModules.push(modules);
    // }
    // console.log(roadblockModules);
    // let modules = data['modules'].filter(dataModule =>
    //     roadblock.modules.filter(module =>
    //         (dataModule.codemodule.includes(module.dataValues.code) || dataModule.codemodule.includes(module.dataValues.possible_codes))
    //         && dataModule.codeinstance === (module.dataValues.instance.length === 3 ? location + module.dataValues.instance : module.dataValues.instance)
    //         && dataModule.scolaryear === parseInt(data['scolaryear'])
    //         ).length !== 0
    // );


    // if (modules.length === 0) {
    if (roadblock.name.indexOf('English') !== -1 || roadblock.name.indexOf('Anglais') !== -1) {
        let highestScore = 0;
        data['notes'].forEach(note => {
            if (note.title.toLowerCase() === 'tepitech' && note['final_note'] > highestScore)
                highestScore = note['final_note'];
        });
        credits_obtains = highestScore;
    } else {
        for (let i = 0; i < roadblock.dataValues.modules.length; i++) {
            let roadmodule = roadblock.dataValues.modules[i].dataValues;
            let instance = (roadmodule.instance.length === 3 ? location + roadmodule.instance : roadmodule.instance);
            let intraModule = await queryIntra(autologin, '/module/' + data['scolaryear'] + '/' + roadmodule.code + '/' + instance + '/?format=json');
            if (!intraModule.error) {
                intraModule.pcp = intraModule['codemodule'].indexOf('PCP') !== -1;
                intraModule.hub = intraModule['codemodule'].indexOf('INN') !== -1;
                intraModule.projects = roadmodule.projects;
                credits_obtains += intraModule['user_credits'] !== '-' ? (parseInt(intraModule['user_credits'], 10) || intraModule['student_credits']) : 0;
                credits_remains += intraModule['credits'] === '-' ? parseInt(intraModule['credits'], 10) : 0;
                modules.push(intraModule);
            } else
                console.log("Module doesn't exists " + '/module/' + data['scolaryear'] + '/' + roadmodule.code + '/' + instance + '/?format=json');
            }
        }
    // }
    return {credits_obtains, credits_remains, modules};
};

exports.getStudentInfo = (req, res) => {
    let autologin = req.headers['autologin'];

    if (!autologin) {
        res.json({message: "Please provide an autologin", method: req.method, type: "error"});
        return;
    }
    queryIntra(autologin, '/user/?format=json')
    .then((data) => {
        queryIntra(autologin, '/user/' + data['login'] + '/print/?format=json')
        .then(async (data) => {
            let student = await Redoublant.findOne({
                where: {
                    login: data['login']
                }
            });

            let location = data['location'].split('/')[1] + '-';

            // Process Roadblocks
            let tekyear = await TekYear.findOne({
                where: {
                    year: data['studentyear']
                }
            });

            let roadblocks = await tekyear.getRoadblocks({
                include: [
                    {model: Module}
                ]
            });

            // roadblocks = roadblocks.toJSON();

            for (let i = 0; i < roadblocks.length; i++) {
                let infos = await this.getRoadblockModules(autologin, data, location, roadblocks[i]);
                roadblocks[i].dataValues.credits_obtains = infos.credits_obtains;
                roadblocks[i].dataValues.credits_remains = infos.credits_remains;
                roadblocks[i].dataValues.roadblockModules = infos.modules;
                // let test = [];
                // for (let j = 0; j < roadblocks[i].modules.length; j++) {
                //     let module = roadblocks[i].modules[j];
                //     let result = await queryIntra(autologin, '/module/' + data['scolaryear'] + '/' + module.code + '/' + (module.instance.length === 3 ? location : '') + module.instance + '/?format=json');
                //     if (result.error) {
                //         if (result.error === "No unit corresponding to your request")
                //             continue;
                //         return res.json(result);
                //     }
                //     test.push({
                //         registered: result['student_registered'],
                //         code: result['codemodule'],
                //         instance: result['codeinstance'],
                //         grade: result['student_grade'],
                //         credits: result['user_credits'],
                //         projects: result['projects']
                //     });
                // }
                // roadblocks[i].dataValues.test = test;
            }
            // console.log(roadblocks[0]);
            // console.log(roadblocks[i].modules.every((item));
            data.roadblocks = roadblocks;
            return res.json(data);

            // Check if the student is a 'redoublant'
            // if (student) {
            //     data.redoublant = true;
            //     data.redoublantModules = [];
            //     let redoublantModules = await student.getModules();
            //     for (let j = 0; j < roadblocks.length; j++) {
            //         for (let i = 0; i < redoublantModules.length; i++) {
            //             if (await redoublantModules[i].getRoadblock() == roadblocks[i]) {
            //                 data.
            //                 data.redoublantModules.push({ possible_codes: redoublantModules[i].code + ',' + redoublantModules[i].possible_codes });
            //             }
            //         }
            //     }
            // }

            // Process HUB
            let hubActivities = await HubActivity.findAll();
            hubActivities = JSON.parse(JSON.stringify(hubActivities));
            hubActivities.forEach((element) => {
                element.organizations_present = 0;
                element.organizations_missing = 0;
                element.present = 0;
                element.missing = 0;
                element.waiting = 0;
            })
            let totalXp = 0;
            let localeHubDetails = await this.computeHubXP(hubActivities, autologin, data['login'], data['scolaryear'], location + '0-1');
            let franceHubDetails = await this.computeHubXP(hubActivities, autologin, data['login'], data['scolaryear'], 'FR-0-1');

            let hubDetails = [...localeHubDetails.activities, ...franceHubDetails.activities];
            for (let i = 0; i < hubDetails.length; i++)
                totalXp += hubDetails[i].xp;
            data.hub = {
                // totalXp: totalXp,
                // resps: localeHubDetails.resps,
                // columns: hubActivities,
                // details: hubDetails
            }
            // let name = data['title'].replace(/\W/g, '');
            // if (fs.existsSync(path.join(__dirname, 'redoublants/' + name))) {
            //     let students = [];
            //     let dataBuffer = fs.readFileSync(path.join(__dirname, 'redoublants/' + name));
            //     students = await processStudent(students, dataBuffer);
            //     if (!students) {
            //         res.status(500).json({ error: true, message: "An error occurred." });
            //         return;
            //     }
            //     data.redoublant = true;
            //     data.redoublantModules = students[2];
            // } else {
            //     for (let i = 0; i < redoublants.length; i++) {
            //         if (redoublants[i].login === data['login']) {
            //             data.redoublant = true;
            //             data.redoublantModules = redoublants[i].modules[0];
            //             // console.log(data.redoublantModules[0]);
            //             // console.log(data.redoublantModules.includes('B-ANG-058'));
            //             break;
            //         }
            //     }
            // }
            res.json(data);
        }).catch((err) => {
            console.log(err);
            res.json({message: err, method: req.method, type: "error"});
        })
    }).catch((err) => {
        res.json(err);
    });
};