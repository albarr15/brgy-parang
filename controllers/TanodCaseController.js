const TanodCaseModel = require("../models/database/mongoose").TanodCaseModel;

const viewTanodDB = async (req, res) => {
    try {
        const cases = await TanodCaseModel.find({}).lean();
        // console.log(cases);
        res.render('admin-tanod-db-view',{
            layout: 'layout',
            title: 'Admin: Tanod DB viewing',
            cssFile1: 'homepage',
            cssFile2: 'db-view',
            javascriptFile1: 'components',
            javascriptFile2: null,
            cases: cases
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
}

const markResolved = async (req, res) => {
    try {
        const caseId = req.params.id;
        const specificCase = await TanodCaseModel.findOne({ _id : caseId }).lean();
        // console.log(cases);
        
        //update status to "Resolved"
        specificCase.Status = "Resolved";

        await TanodCaseModel.findOneAndUpdate(
            { _id : caseId },
            {
                $set: {
                    Status: "Resolved"
                }
            },
            { new: true }
        );

        // Render the updated view
        const cases = await TanodCaseModel.find({}).lean();
        res.render('admin-tanod-db-view', {
            layout: 'layout',
            title: 'Admin: Tanod DB viewing',
            cssFile1: 'homepage',
            cssFile2: 'db-view',
            javascriptFile1: 'components',
            javascriptFile2: null,
            cases: cases
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
}

const viewTanodCase = async (req, res) => {
    try {
        const caseId = req.params.id;
        const specificCase = await TanodCaseModel.findOne({ _id : caseId }).lean();
        // console.log(cases);
        res.render('A-tanod-view-case',{
            layout: 'layout',
            title: 'Barangay Parang - Admin - Tanod View Case Page',
            cssFile1: 'index',
            cssFile2: 'form',
            javascriptFile1: 'header-hbs',
            javascriptFile2: null,
            cases: specificCase
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
}

module.exports = {
    viewTanodDB,
    viewTanodCase,
    markResolved
}

