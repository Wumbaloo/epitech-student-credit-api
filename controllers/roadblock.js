const Roadblock = require('../models/roadblock');
const TekYear = require('../models/year');

exports.editRoadblock = async (req, res) => {
    const { id } = req.params;
    const { newName, newCreditsNeeded, year } = req.body;

    if (!newName || !newCreditsNeeded || !year)
        return res.status(400).json({ body: "Bad request parameter." });
    const tekYear = await TekYear.findOne({
        where: {
            year
        }
    });
    if (!tekYear)
        return res.status(404).json({ body: "Invalid Tek Year." });
    const result = await Roadblock.findOne({
        where: {
            id
        },
    });
    if (!result)
        return res.status(404).json({ body: "No roadblock exists." });
    result.name = newName;
    result.credits_needed = newCreditsNeeded;
    result.tekYearId = tekYear.id;
    await result.save();
    res.json({ success: true, body: "Successfully edited. "});
};

exports.deleteRoadblock = async (req, res) => {
    const { id } = req.params;

    if (!id)
        return res.status(400).json({ body: "Bad request parameter." });
    const result = await Roadblock.findOne({
        where: {
            id
        },
    });
    if (!result)
        return res.status(404).json({ body: "No roadblock exists." });
    await result.destroy();
    res.json({ success: true, body: "Successfully deleted. "});
};

exports.createRoadblock = async (req, res) => {
    const { name, credits_needed, year } = req.body;

    if (!name || !credits_needed || !year)
        return res.status(400).json({ body: "Missing name or credits_needed or year." });
    const tekYear = await TekYear.findOne({
        where: {
            year
        }
    });
    if (!tekYear)
        return res.status(404).json({ body: "Invalid Tek Year." });
    const result = await Roadblock.findOne({
        where: {
            name,
            credits_needed
        }
    });
    if (result)
        return res.status(409).json({ body: "Roadblock already exists." });
    const roadblock = await Roadblock.create({
        name,
        credits_needed,
        tekYearId: tekYear.id
    });
    if (!roadblock)
        return res.status(422).json({ body: "Success but can't create the roadblock. Try again later." });
    res.json({ success: true, body: roadblock.toJSON() });
};

exports.getRoadblocks = async (req, res) => {
    const result = await Roadblock.findAll({ include: [TekYear] });

    res.json({
        success: true,
        data: result
    });
};
