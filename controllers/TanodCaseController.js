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

const editTanodCase = async (req, res) => {
    try {
        const caseId = req.params.id;
        const specificCase = await TanodCaseModel.findOne({ _id : caseId }).lean();

        res.render('A-tanod-edit-case',{
            layout: 'layout',
            title: 'Barangay Parang - Admin - Tanod Edit Case Page',
            cssFile1: 'index',
            cssFile2: 'form',
            javascriptFile1: 'header-hbs',
            javascriptFile2: 'case-form',
            cases: specificCase
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
}

const submitEditTanodCase = async (req, res) => {
    try {
        const {
            _id,
            EntryNo,
            Date,
            Status,
            reporteeLastName,
            reporteeMiddleInitial,
            reporteeFirstName,
            reporteeAddress,
            natureOfBlotter,
            respondentLastName,
            respondentMiddleInitial,
            respondentFirstName,
            deskOfficerLastName,
            deskOfficerMiddleInitial,
            deskOfficerFirstName,
            witnessLastName,
            witnessMiddleInitial,
            witnessFirstName,
            location
        } = req.body;

        await TanodCaseModel.findOneAndUpdate(
            { _id: _id },
            {
                $set: {
                    EntryNo: EntryNo,
                    Date: Date,
                    Status: Status,
                    ReporteeInfo: {
                        FirstName: reporteeFirstName,
                        MiddleInitial: reporteeMiddleInitial,
                        LastName: reporteeLastName,
                        Address: reporteeAddress
                    },
                    natureOfBlotter: natureOfBlotter,
                    RespondentInfo: {
                        FirstName: respondentFirstName,
                        MiddleInitial: respondentMiddleInitial,
                        LastName: respondentLastName
                    },
                    DeskOfficerInfo: {
                        FirstName: deskOfficerFirstName,
                        MiddleInitial: deskOfficerMiddleInitial,
                        LastName: deskOfficerLastName
                    },
                    WitnessInfo: {
                        FirstName: witnessFirstName,
                        MiddleInitial: witnessMiddleInitial,
                        LastName: witnessLastName
                    },
                    Location: location
                }
            },
            { new: true }
        );

        res.redirect("/admin-tanod-db-view");
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
}

const updateStatus = async (req, res) => {
    try {
        const caseId = req.params.id;
        const currentStatus = req.params.status; 

        const newStatus = currentStatus === 'Resolved' ? 'Ongoing' : 'Resolved';

        await TanodCaseModel.findOneAndUpdate(
            { _id : caseId},
            { Status : newStatus},
            { new: true }
        );

    } catch (error) {
        console.error('Error updating status:', error);
        return res.status(500).json({ error: 'Failed to update status' });
    }
}

module.exports = {
    viewTanodDB,
    viewTanodCase,
    markResolved,
    editTanodCase,
    submitEditTanodCase,
    updateStatus
}

