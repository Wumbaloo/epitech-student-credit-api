const Roadblock = require('../models/roadblock');
const TekYear = require('../models/year');

exports.getRoadblocks = async (req, res) => {
    const result = await Roadblock.findAll({ include: [TekYear] });

    res.json({
        success: true,
        data: result
    });
};
