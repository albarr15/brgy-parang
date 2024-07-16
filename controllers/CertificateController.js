const TanodCaseModel = require("../models/database/mongoose").TanodCaseModel;
const LuponCaseModel = require("../models/database/mongoose").LuponCaseModel;

//employee
const viewCertClearance = async (req, res) => {
    res.render('employee-check-clearance',{
        layout: 'layout',
        title: 'Barangay Parang - Employee Homepage - test',
        cssFile1: 'index',
        cssFile2: 'checkClearance',
        javascriptFile1: 'header',
        javascriptFile2: 'check-clearance',
    });
};

const isClearedEmployee = async (req, res) => {
    const searchName = req.params.search_name;
    const searchWords = searchName.split(' ').filter(word => word.trim() !== '');

    try {
        const orConditions = searchWords.map(word => ({
            $or: [
                { 'ReporteeInfo.FirstName': { $regex: new RegExp(word, 'i') } },
                { 'ReporteeInfo.LastName': { $regex: new RegExp(word, 'i') } }
            ]
        }));

        // Find documents matching any of the $or conditions
        const searchResults = await TanodCaseModel.find({ $or: orConditions }).lean().exec();

        res.json({ success: true, results: searchResults });
    } catch (error) {
        console.error('Error searching cases:', error);
        res.status(500).json({ success: false, message: 'Error searching cases', error });
    }
};

const isClearedEmployeeLupon = async (req, res) => {
    const searchName = req.params.search_name;
    const searchWords = searchName.split(' ').filter(word => word.trim() !== '');

    try {
        const orConditions = searchWords.map(word => ({
            $or: [
                { 'RespondentInfo.FirstName': { $regex: new RegExp(word, 'i') } },
                { 'RespondentInfo.LastName': { $regex: new RegExp(word, 'i') } }
            ]
        }));

        // Find documents matching any of the $or conditions
        const searchResults = await LuponCaseModel.find({ $or: orConditions }).lean().exec();

        res.json({ success: true, results: searchResults });
    } catch (error) {
        console.error('Error searching cases:', error);
        res.status(500).json({ success: false, message: 'Error searching cases', error });
    }
};

const onClickView = async (req, res) => {
    try {
        const caseId = req.params.id;
        const specificCase = await TanodCaseModel.findOne({ _id : caseId }).lean();
        // console.log(cases);
        res.render('employee-onClick-print',{
            layout: 'layout',
            title: 'Barangay Parang - Admin - Tanod View Case Page',
            cssFile1: 'index',
            cssFile2: 'onClick',
            javascriptFile1: 'components',
            javascriptFile2: 'header',
            cases: specificCase
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};

const onClickViewLupon = async (req, res) => {
    try {
        const caseId = req.params.id;
        const specificCase = await LuponCaseModel.findOne({ _id : caseId }).lean();
        // console.log(cases);
        res.render('employee-onClick-printLupon',{
            layout: 'layout',
            title: 'Barangay Parang - Admin - Lupon View Case Page',
            cssFile1: 'index',
            cssFile2: 'onClick',
            javascriptFile1: 'components',
            javascriptFile2: 'header',
            cases: specificCase
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};

const printCertificate = async (req, res) => {
    try {
        res.render('employee-input-page', {
            layout: 'layout',
            title: 'Barangay Parang - Employee View - Input Cert. Details',
            cssFile1: null,
            cssFile2: null,
            javascriptFile1: null,
            javascriptFile2: null,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
}; 

module.exports = {
    isClearedEmployee,
    onClickView,
    printCertificate,
    viewCertClearance,

    isClearedEmployeeLupon,
    onClickViewLupon
}