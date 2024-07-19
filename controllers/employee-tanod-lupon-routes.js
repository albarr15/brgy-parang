const { CertificateModel, UserModel, LuponCaseModel, TanodCaseModel } = require('../models/database/mongoose');
const session = require('express-session');


function add(app){
    const mongoose = require('mongoose');

    // //Start
    // app.get('/', function(req, resp){
    //     resp.render('index', {
    //         layout: 'index-main',
    //         title: 'Welcome to Barangay Parang Website'
    //     });
    // });


    /************************************************************EMPLOYEE************************************************/
    //Employee-Login
    app.get('/employee-login', function(req, resp){
        resp.render('employee-login-page', {
            layout: 'index-login',
            title: 'Employee Login'
        });
    });

    //Check the Login
    app.post('/check-login', async function(req, resp){
        const { email, password } = req.body; // Retrieve email and password from request body

        //try to find user
        try{
            const curUser = await UserModel.findOne({email: email}); //finds if there is a match in users
            var errorMsg = "";
            // console.log(curUser.role);
            // console.log(curUser.password);
            // console.log(curUser.email);

            
            if (!email || !password) {
                errorMsg = "Email and Password fields cannot be empty."
            }
            else if (!email.includes("@")) {
                errorMsg = "Invalid email.";
            }
            else if (!curUser) {
                errorMsg = "User Not Found."
            }
            else if (curUser.password != password) {
                errorMsg = "Incorrect password."
            }
            else if (curUser.role != "employee") {
                errorMsg = "Unathorized Access."
            }
            else {
                console.log("here no error")
                return resp.redirect("/employee-home");
        
            }
            console.log("here")
            resp.render('employee-login-page', {
                layout: 'index-login',
                title: 'Employee Login Retry',
                error: errorMsg
            });
            
        } catch(error){
            console.error('Error during login:', error);
            resp.render('employee-login-page', {
                layout: 'index-login',
                title: 'Employee Login Retry',
                error: 'Error Try Again'
            });
        }
    });

    //Employee-Homepage
    app.get('/employee-home', function(req, resp){
        resp.render('employee-home', {
            layout: 'index-employee',
            title: 'Employee Homepage'
        });
    });

    //Employee-Check-Clearance
    // app.get('/employee-check-clearance', function(req, resp){
    //     resp.render('employee-check-clear', {
    //         layout: 'index-clearance',
    //         title: 'Check Clearance'
    //     });
    // });

    app.get('/logout', function(req,resp){
        resp.redirect('/');
    });

    /************************************************************TANOD************************************************/


    //Tanod-Login
    app.get('/tanod-login', function(req, resp){
        resp.render('tanod-login-page', {
            layout: 'index-login',
            title: 'Tanod Login'
        });
    });

    //Check Login for tanod
    app.post('/check-login-tanod', async function(req, resp){
        const { email, password } = req.body; // Retrieve email and password from request body

        //try to find user
        try{
            const curUser = await UserModel.findOne({email: email}); //finds if there is a match in users
            var errorMsg = "";

            
            if (!email || !password) {
                errorMsg = "Email and Password fields cannot be empty."
            }
            else if (!email.includes("@")) {
                errorMsg = "Invalid email.";
            }
            else if (!curUser) {
                errorMsg = "User Not Found."
            }
            else if (curUser.password != password) {
                errorMsg = "Incorrect password."
            }
            else if (curUser.role != "tanod") {
                errorMsg = "Unathorized Access."
            }
            else {
                console.log("here no error")
                return resp.redirect('/tanod-home');
        
            }
            console.log("here")
            resp.render('tanod-login-page', {
                layout: 'index-login',
                title: 'Tanod Login Retry',
                error: errorMsg
            });
            
        } catch(error){
            console.error('Error during login:', error);
            resp.render('tanod-login-page', {
                layout: 'index-login',
                title: 'Tanod Login Retry',
                error: 'Error Try Again'
            });
        }
    });

    //Tanod Homepage
    app.get('/tanod-home', async function(req, resp){
        try{
            //get all cases
            TanodCaseModel.find({}).then(function(cases){
                let allCases =[];

                for(const item of cases){
                    let stat_lc = 'resolved';

                    if(item.Status== 'Ongoing'){
                        stat_lc = 'ongoing';
                    }

                    allCases.push({
                        entryNo: item.EntryNo,
                        date: item.Date,
                        reporteeFirstName: item.ReporteeInfo.FirstName,
                        reporteeLastName: item.ReporteeInfo.LastName,
                        respondentFirstName: item.RespondentInfo.FirstName,
                        respondentLastName: item.RespondentInfo.LastName,
                        status: item.Status,
                        stat_lc: stat_lc
                    });
                }

                //render it to home   
                resp.render('tanod-home', {
                layout: 'index-tanod-lupon',
                title: 'Tanod Homepage',
                cases: allCases
                });
            });
        } catch(error){
            console.error('Error fetching all cases:', error);
            resp.status(500).send('Internal Server Error');
        }   
    });

    //Tanod-Create-Case
    app.get('/tanod-create', function(req, resp){
        resp.render('tanod-create-case', {
            layout: 'index-create',
            title: 'Tanod Create Case'
        });
    });

    //Save case tp DB
    app.post('/tanod-submit-case', async function(req, resp){

        const entryNumber = Number(req.body.entryNumber);

        const caseData = {
            _id: new mongoose.Types.ObjectId().toString(),
            EntryNo: entryNumber,
            Date: req.body.date,
            Status: req.body.status,
            ReporteeInfo:{
                FirstName: req.body.reporteeFirstName,
                MiddleInitial: req.body.reporteeMiddleInitial,
                LastName: req.body.reporteeLastName,
                Address: req.body.reporteeAddress
            },
            natureOfBlotter: req.body.natureOfBlotter,
            RespondentInfo: {
                FirstName: req.body.respondentFirstName,
                MiddleInitial: req.body.respondentMiddleInitial,
                LastName: req.body.respondentLastName,
            },
            DeskOfficerInfo: {
                FirstName: req.body.deskOfficerFirstName,
                MiddleInitial: req.body.deskOfficerMiddleInitial,
                LastName: req.body.deskOfficerLastName,
            },
            WitnessInfo: {
                FirstName: req.body.witnessFirstName,
                MiddleInitial: req.body.witnessMiddleInitial,
                LastName: req.body.witnessLastName,
            },
            Location: req.body.location
        }

        //put all details in the db
        try{
            const newCase = new TanodCaseModel(caseData);
            await newCase.save();
            console.log('Case Succesfully saved');
            console.log(entryNumber);
            resp.redirect(`/page-view-case/${entryNumber}`);

        } catch (error){
            console.error('Error saving the case:', error);
            resp.redirect('/tanod-create');
        }
    });

    //View tanod case
    app.get('/page-view-case/:entryNumber', async function(req, resp){
        const entryNumber = Number(req.params.entryNumber);
        console.log(entryNumber);
        let resolveStat = 'selected';
        let ongoingStat = 'disabled';

        try {
            const caseDetails = await TanodCaseModel.findOne({ EntryNo: entryNumber }).lean();
            if (caseDetails) {
                console.log('found case');
                const reporteeInfo = caseDetails.ReporteeInfo;
                const respondentInfo = caseDetails.RespondentInfo;
                const deskInfo = caseDetails.DeskOfficerInfo;
                const witnessInfo = caseDetails.WitnessInfo;


                if(caseDetails.Status == 'Ongoing'){
                    resolveStat = 'disabled';
                    ongoingStat = 'selected';
                }

                resp.render('tanod-view-case', {
                    layout: 'index-view-tl', 
                    title: 'View Tanod Case',
                    case: caseDetails,
                    resolveStat: resolveStat,
                    ongoingStat: ongoingStat,
                    reporteeInfo: reporteeInfo,
                    respondentInfo: respondentInfo,
                    deskInfo: deskInfo,
                    witnessInfo: witnessInfo
                });
            } else {
                resp.status(404).send('Case not found');
            }
        } catch (error) {
            console.error('Error fetching case details:', error);
            resp.status(500).send('Internal Server Error');
        }
    });

    //Tanod Edit Case
    app.get('/tanod-edit-case/:entryNumber', async function(req, resp){
        const entryNumber = Number(req.params.entryNumber);
        console.log(entryNumber);
        try {
            const caseDetails = await TanodCaseModel.findOne({ EntryNo: entryNumber }).lean();
            if (caseDetails) {
                console.log('found case');
                const reporteeInfo = caseDetails.ReporteeInfo;
                const respondentInfo = caseDetails.RespondentInfo;
                const deskInfo = caseDetails.DeskOfficerInfo;
                const witnessInfo = caseDetails.WitnessInfo;


                resp.render('tanod-edit-case', {
                    layout: 'index-edit', 
                    title: 'View Tanod Case',
                    case: caseDetails,
                    reporteeInfo: reporteeInfo,
                    respondentInfo: respondentInfo,
                    deskInfo: deskInfo,
                    witnessInfo: witnessInfo
                });
            } else {
                resp.status(404).send('Case not found');
            }
        } catch (error) {
            console.error('Error fetching case details:', error);
            resp.status(500).send('Internal Server Error');
        }
    });

    //Save Edit details
    app.post('/update-tanod-case', async function(req, resp){
        const entryNumber = Number(req.body.entryNumber);
        //code to edit the case here
        try {
            // Find the case by EntryNo and update it with new values
            const updatedCase = await TanodCaseModel.findOneAndUpdate(
                { EntryNo: entryNumber },
                {
                    Date: req.body.date,
                    Status: req.body.status,
                    ReporteeInfo: {
                        LastName: req.body.reporteeLastName,
                        MiddleInitial: req.body.reporteeMiddleInitial,
                        FirstName: req.body.reporteeFirstName,
                        Address: req.body.reporteeAddress
                    },
                    natureOfBlotter: req.body.natureOfBlotter,
                    RespondentInfo: {
                        LastName: req.body.respondentLastName,
                        MiddleInitial: req.body.respondentMiddleInitial,
                        FirstName: req.body.respondentFirstName
                    },
                    DeskOfficerInfo: {
                        LastName: req.body.deskOfficerLastName,
                        MiddleInitial: req.body.deskOfficerMiddleInitial,
                        FirstName: req.body.deskOfficerFirstName
                    },
                    WitnessInfo: {
                        LastName: req.body.witnessLastName,
                        MiddleInitial: req.body.witnessMiddleInitial,
                        FirstName: req.body.witnessFirstName
                    },
                    Location: req.body.location
                },
                { new: true } // Return the updated document
            );

            if (updatedCase) {
                resp.redirect(`/page-view-case/${entryNumber}`); // Redirect to the homepage after successful update
            } else {
                resp.status(404).send('Case not found');
            }
        } catch (error) {
            console.error('Error updating case details:', error);
            resp.status(500).send('Internal Server Error');
        }
    });


    //Tanod delete
    app.get('/tanod-delete-case/:entryNumber', async function(req, resp){
        const entryNumber = Number(req.params.entryNumber);
        try{
            //delete code
            const deletedCase = await TanodCaseModel.findOneAndDelete({EntryNo: entryNumber});

            if(deletedCase){
                resp.redirect('/tanod-home');
            }else{
                resp.status(404).send('Case not found');
            }
        }catch(error){
            console.error('Error deleting the case:', error);
            // Respond with a 500 status in case of an error
            resp.status(500).send('An error occurred while deleting the case');
        }
    });

    app.post('/tanod-delete-cases', async function(req, resp) {
        const { caseIds } = req.body;
        try {
            await TanodCaseModel.deleteMany({ EntryNo: { $in: caseIds } });
            resp.json({ success: true });
        } catch (error) {
            console.error('Error deleting Tanod cases:', error);
            resp.json({ success: false });
        }
    });

    app.post('/tanod-resolve-cases', async function(req, resp) {
        const { caseIds } = req.body;
        try {
            await TanodCaseModel.updateMany({ EntryNo: { $in: caseIds } }, { $set: { Status: 'Resolved' }});
            resp.json({ success: true });
        } catch (error) {
            console.error('Error resolving Tanod cases:', error);
            resp.json({ success: false });
        }
    });

    /************************************************************LUPON************************************************/


    //Lupon-Login
    app.get('/lupon-login', function(req, resp){
        resp.render('lupon-login-page', {
            layout: 'index-login',
            title: 'Lupon Login'
        });
    });

    //Check Login for Lupon
    app.post('/check-login-lupon', async function(req, resp){
        const { email, password } = req.body; // Retrieve email and password from request body

        try{
            const curUser = await UserModel.findOne({email: email}); //finds if there is a match in users
            var errorMsg = "";

            if (!email || !password) {
                errorMsg = "Email and Password fields cannot be empty."
            }
            else if (!email.includes("@")) {
                errorMsg = "Invalid email.";
            }
            else if (!curUser) {
                errorMsg = "User Not Found."
            }
            else if (curUser.password != password) {
                errorMsg = "Incorrect password."
            }
            else if (curUser.role != "lupon") {
                errorMsg = "Unathorized Access."
            }
            else {
                console.log("here no error")
                return resp.redirect('/lupon-home');
        
            }
            console.log("here")
            resp.render('lupon-login-page', {
                layout: 'index-login',
                title: 'Lupon Login Retry',
                error: errorMsg
            });
            
        } catch(error){
            console.error('Error during login:', error);
            resp.render('lupon-login-page', {
                layout: 'index-login',
                title: 'Lupon Login Retry',
                error: 'Error Try Again'
            });
        }
    });



    //Lupon Homepage
    app.get('/lupon-home', function(req, resp){
        try{
            //get all cases
            LuponCaseModel.find({}).then(function(cases){
            let allCases =[];

                for(const item of cases){
                    let stat_lc = 'resolved';

                    if(item.Status== 'Ongoing'){
                        stat_lc = 'ongoing';
                    }

                    allCases.push({
                        caseID: item._id,
                        caseTitle: item.CaseTitle,
                        caseType: item.CaseType,
                        complainerFirstName: item.ComplainerInfo.FirstName,
                        complainerLastName: item.ComplainerInfo.LastName,
                        respondentFirstName: item.RespondentInfo.FirstName,
                        respondentLastName: item.RespondentInfo.LastName,
                        status: item.Status,
                        stat_lc: stat_lc
                    });
                }

                //render it to home   
                resp.render('lupon-home', {
                layout: 'index-tanod-lupon',
                title: 'Lupon Homepage',
                cases: allCases
                });
            });
        } catch(error){
            console.error('Error fetching all cases:', error);
            resp.status(500).send('Internal Server Error');
        }   
    });

    //Lupon create case
    app.get('/lupon-create', function(req, resp){
        resp.render('lupon-create-case',{
            layout: 'index-create',
            title: 'Lupon Create Case'
        });
    });

    //Lupon Submit case
    app.post('/lupon-submit-case', async function(req, resp){
        const caseData= {
            _id: new mongoose.Types.ObjectId().toString(),
            CaseTitle: req.body.caseTitle,
            CaseType: req.body.caseType,
            Status: req.body.status,
            RespondentInfo: {
                FirstName: req.body.respondentFirstName,
                MiddleInitial: req.body.respondentMiddleInitial,
                LastName: req.body.respondentLastName 
            },
            ComplainerInfo: {
                FirstName: req.body.complainerFirstName,
                MiddleInitial: req.body.complainerMiddleInitial,
                LastName: req.body.complainerLastName
            },
            MediationInfo: {
                FirstName: req.body.mediationFirstName,
                MiddleInitial: req.body.mediationMiddleInitial,
                LastName: req.body.mediationLastName
            },
            ConciliationInfo: {
                FirstName: req.body.conciliationFirstName,
                MiddleInitial: req.body.conciliationMiddleInitial,
                LastName: req.body.conciliationLastName
            },
            Case: req.body.caseDetails
        };

        try{
            const newCase = new LuponCaseModel(caseData);
            await newCase.save();
            console.log('successfully saved');
            console.log(newCase._id)
            resp.redirect(`/lupon-view-case/${newCase._id}`);
        } catch(error){
            console.error('Error saving the case:', error);
            resp.redirect('/lupon-create');
        }
    });

    //Lupon Case View
    app.get('/lupon-view-case/:_id', async function(req, resp){
        const caseID = req.params._id;
        console.log(caseID);

        let resolveStat = 'selected';
        let ongoingStat = 'disabled';

        try {
            const caseDetails = await LuponCaseModel.findOne({ _id: caseID }).lean();
            if (caseDetails) {
                console.log('found case');
                const respondentInfo = caseDetails.RespondentInfo;
                const complainerInfo = caseDetails.ComplainerInfo;
                const mediationInfo = caseDetails.MediationInfo;
                const conciliationInfo = caseDetails.ConciliationInfo;



                if(caseDetails.Status == 'Ongoing'){
                    resolveStat = 'disabled';
                    ongoingStat = 'selected';
                }

                resp.render('lupon-view-case', {
                    layout: 'index-view-tl', 
                    title: 'View Lupon Case',
                    case: caseDetails,
                    resolveStat: resolveStat,
                    ongoingStat: ongoingStat,
                    respondentInfo: respondentInfo,
                    complainerInfo: complainerInfo,
                    mediationInfo:  mediationInfo,
                    conciliationInfo: conciliationInfo
                });
            } else {
                resp.status(404).send('Case not found');
            }
        } catch (error) {
            console.error('Error fetching case details:', error);
            resp.status(500).send('Internal Server Error');
        }

    });

    //Lupon Edit case
    app.get('/lupon-edit-case/:_id', async function(req, resp){
        const caseID = req.params._id;
        console.log(caseID);

        try {
            const caseDetails = await LuponCaseModel.findOne({ _id: caseID }).lean();
            if (caseDetails) {
                console.log('found case');
                const respondentInfo = caseDetails.RespondentInfo;
                const complainerInfo = caseDetails.ComplainerInfo;
                const mediationInfo = caseDetails.MediationInfo;
                const conciliationInfo = caseDetails.ConciliationInfo;

                resp.render('lupon-edit-case', {
                    layout: 'index-edit', 
                    title: 'Edit Lupon Case',
                    case: caseDetails,
                    respondentInfo: respondentInfo,
                    complainerInfo: complainerInfo,
                    mediationInfo:  mediationInfo,
                    conciliationInfo: conciliationInfo
                });
            } else {
                resp.status(404).send('Case not found');
            }
        } catch (error) {
            console.error('Error fetching case details:', error);
            resp.status(500).send('Internal Server Error');
        }
    });

    //Lupon update
    app.post('/update-lupon-case/:_id', async function(req, resp){
        const caseID = req.params._id;

        //code to edit the case here
        try {
            // Find the case by EntryNo and update it with new values
            const updatedCase = await LuponCaseModel.findOneAndUpdate(
                { _id: caseID },
                {
                    CaseTitle: req.body.caseTitle,
                    CaseType: req.body.caseType,
                    Status: req.body.status,
                    RespondentInfo: {
                        FirstName: req.body.respondentFirstName,
                        MiddleInitial: req.body.respondentMiddleInitial,
                        LastName: req.body.respondentLastName 
                    },
                    ComplainerInfo: {
                        FirstName: req.body.complainerFirstName,
                        MiddleInitial: req.body.complainerMiddleInitial,
                        LastName: req.body.complainerLastName
                    },
                    MediationInfo: {
                        FirstName: req.body.mediationFirstName,
                        MiddleInitial: req.body.mediationMiddleInitial,
                        LastName: req.body.mediationLastName
                    },
                    ConciliationInfo: {
                        FirstName: req.body.conciliationFirstName,
                        MiddleInitial: req.body.conciliationMiddleInitial,
                        LastName: req.body.conciliationLastName
                    },
                    Case: req.body.caseDetails
                },
                { new: true } // Return the updated document
            );

            if (updatedCase) {
                resp.redirect(`/lupon-view-case/${updatedCase._id}`); // Redirect to the homepage after successful update
            } else {
                resp.status(404).send('Case not found');
            }
        } catch (error) {
            console.error('Error updating case details:', error);
            resp.status(500).send('Internal Server Error');
        }
    });

    //Lupon delete
    app.get('/lupon-delete-case/:_id', async function(req, resp){
        const caseID = req.params._id;
        try{
            //delete code
            const deletedCase = await LuponCaseModel.findOneAndDelete({_id: caseID});

            if(deletedCase){
                resp.redirect('/lupon-home');
            }else{
                resp.status(404).send('Case not found');
            }
        }catch(error){
            console.error('Error deleting the case:', error);
            // Respond with a 500 status in case of an error
            resp.status(500).send('An error occurred while deleting the case');
        }
    });

    app.post('/lupon-delete-cases', async function(req, resp) {
        const { caseIds } = req.body;
        try {
            await LuponCaseModel.deleteMany({ _id: { $in: caseIds } });
            resp.json({ success: true });
        } catch (error) {
            console.error('Error deleting cases:', error);
            resp.json({ success: false });
        }
    });

    app.post('/lupon-resolve-cases', async function(req, resp) {
        const { caseIds } = req.body;
        try {
            await LuponCaseModel.updateMany({ _id: { $in: caseIds } }, { $set: { Status: 'Resolved' } });
            resp.json({ success: true });
        } catch (error) {
            console.error('Error marking cases as resolved:', error);
            resp.json({ success: false });
        }
    });

    function finalClose(){
    
        console.log('Close connection at the end!');
        mongoose.connection.close();
        process.exit();
    }
    
    process.on('SIGTERM',finalClose);  //general termination signal
    process.on('SIGINT',finalClose);   //catches when ctrl + c is used
    process.on('SIGQUIT', finalClose); //catches other termination commands
}

module.exports.add = add;