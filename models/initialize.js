const TekYear = require('./year');
const HubActivity = require('./hubActivity');
const Roadblock = require('./roadblock');
const Module = require('./module');

const { roadblocks } = require('../basicRoadblocks');

const initializeHub = async () => {
    await HubActivity.findOrCreate({
        where: {
            possible_names: 'Experience'
        },
        defaults: {
            title: "Nombre d'experience",
            possible_names: 'Experience',
            present_xp: 3
        }
    });
    await HubActivity.findOrCreate({
        where: {
            possible_names: 'Talk,Meetup',
        },
        defaults: {
            title: 'Meetup / Talk',
            possible_names: 'Talk,Meetup',
            present_xp: 1,
            missing_xp: 1,
            organization_present_xp: 4,
            organization_missing_xp: 6
        }
    });
    await HubActivity.findOrCreate({
        where: {
            possible_names: 'Workshop',
        },
        defaults: {
            title: 'Workshop',
            possible_names: 'Workshop',
            present_xp: 2,
            missing_xp: 2,
            organization_present_xp: 7,
            organization_missing_xp: 10
        }
    });
    await HubActivity.findOrCreate({
        where: {
            title: 'Hackathon',
        },
        defaults: {
            title: 'Hackathon',
            possible_names: 'Hackathon',
            present_xp: 6,
            missing_xp: 6,
            organization_present_xp: 15,
            organization_missing_xp: 20
        }
    });
};
function getAllFuncs(toCheck) {
    var props = [];
    var obj = toCheck;
    do {
        props = props.concat(Object.getOwnPropertyNames(obj));
    } while (obj = Object.getPrototypeOf(obj));

    return props.sort().filter(function(e, i, arr) {
       if (e!=arr[i+1] && typeof toCheck[e] == 'function') return true;
    });
}
const initializeRoadblocksModules = async () => {
    for (let i = 0; i < roadblocks.length ; i++) {
        let roadblock = roadblocks[i];
        for (let j = 0; j < roadblock.score_needed?.length ; j++) {
            let yearClass = await TekYear.findOne({
                where: {
                    year: j + 1
                }
            });
            let roadblockClass = await Roadblock.findOrCreate({
                where: {
                    name: roadblock.name,
                    credits_needed: roadblock.score_needed[j],
                    tekYearId: yearClass.year
                },
                defaults: {
                    name: roadblock.name,
                    credits_needed: roadblock.score_needed[j]
                }
            });
            roadblockClass = await Roadblock.findOne({
                where: {
                    name: roadblock.name,
                    tekYearId: yearClass.year
                }
            })
            await roadblockClass.setTekYear(yearClass);
            continue;
        }
        for (let year = 0; year < roadblock.details?.length ; year++) {
            let yearClass = await TekYear.findOne({
                where: {
                    year: year + 1
                }
            });
            let roadblockClass = await Roadblock.findOrCreate({
                where: {
                    name: roadblock.name,
                    credits_needed: roadblock.details[year].needed,
                    tekYearId: yearClass.year
                },
                defaults: {
                    name: roadblock.name,
                    credits_needed: roadblock.details[year].needed
                }
            });
            roadblockClass = await Roadblock.findOne({
                where: {
                    name: roadblock.name,
                    tekYearId: yearClass.year
                }
            })
            await roadblockClass.setTekYear(yearClass);
            let modules = roadblock.details[year].modules;
            for (let m = 0; m < modules.length; m++) {
                let instance = modules[m].codeinstance;
                if (!instance) {
                    instance = modules[m].codemodule.substr(-3, 1) + "-" + 1;
                }
                let moduleClass = await Module.findOrCreate({
                    where: {
                        code: modules[m].codemodule,
                    },
                    defaults: {
                        code: modules[m].codemodule,
                        instance: instance,
                        projects: modules[m].projects?.join(',')
                    }
                });
                moduleClass = await Module.findOne({
                    where: {
                        code: modules[m].codemodule,
                    }
                })
                await moduleClass.setRoadblock(roadblockClass);
            }
        }
    }
}

exports.initialize = async () => {
    for (let year = 1; year < 4; year++) {
        await TekYear.findOrCreate({
            where: {
                year
            },
            defaults: {
                year
            }
        });
    }
    await initializeHub();
    await initializeRoadblocksModules();
};