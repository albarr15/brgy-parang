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
        const ReporteeInfoFN = req.params.FN;
        const ReporteeInfoMI = req.params.MI;
        const ReporteeInfoLN = req.params.LN;

        console.log(ReporteeInfoFN)
        console.log(ReporteeInfoMI)
        console.log(ReporteeInfoLN)

        var typeCase = ""
        var specificCase = ""
        var statusT = ""
        var statusL = ""

        const specificCaseT = await TanodCaseModel.findOne({ 'ReporteeInfo.FirstName'       : ReporteeInfoFN, 
                                                             'ReporteeInfo.MiddleInitial'   : ReporteeInfoMI,
                                                             'ReporteeInfo.LastName'        : ReporteeInfoLN}).lean();

        const specificCaseL = await LuponCaseModel.findOne({ 'RespondentInfo.FirstName'     : ReporteeInfoFN, 
                                                             'RespondentInfo.MiddleInitial' : ReporteeInfoMI,
                                                             'RespondentInfo.LastName'      : ReporteeInfoLN}).lean();


        if(specificCaseT && specificCaseL) {
            typeCase = "both"
            specificCase = specificCaseT,
            statusT = specificCaseT.Status
            statusL = specificCaseL.Status
        } else if (specificCaseT) {
            typeCase = "tanod"
            specificCase = specificCaseT
            statusT = specificCaseT.Status
            statusL = null
        } else if (specificCaseL) {
            typeCase = "lupon"
            specificCase = specificCaseL
            statusL = specificCaseL.Status
            statusT = null
        }


        res.render('employee-onClick-print',{
            layout: 'layout',
            title: 'Barangay Parang - Admin - Tanod View Case Page',
            cssFile1: 'index',
            cssFile2: 'onClick',
            javascriptFile1: 'components',
            javascriptFile2: 'header',
            cases: specificCase,
            typeCase : typeCase,
            StatusT : statusT,
            StatusL : statusL
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

const printCertificateClearance = async (req, res) => {
    try {
        res.render('employee-input-page-clerance', {
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
    printCertificateClearance
}